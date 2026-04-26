import type { NextRequest } from "next/server";
import { env } from "@/lib/env";

interface Bucket {
  count: number;
  resetAt: number;
}
const memory = new Map<string, Bucket>();

export function clientIp(request: NextRequest): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  const real = request.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  resetAt: number;
}

async function upstashIncr(key: string, windowSec: number): Promise<{ count: number; ttlMs: number } | null> {
  const url = env.UPSTASH_REDIS_REST_URL;
  const token = env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  try {
    const pipeRes = await fetch(`${url}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", key],
        ["EXPIRE", key, String(windowSec), "NX"],
        ["PTTL", key],
      ]),
      cache: "no-store",
    });
    if (!pipeRes.ok) return null;
    const data = (await pipeRes.json()) as Array<{ result: number }>;
    const count = Number(data[0]?.result ?? 0);
    const ttlMs = Number(data[2]?.result ?? windowSec * 1000);
    return { count, ttlMs };
  } catch {
    return null;
  }
}

export async function rateLimit(
  request: NextRequest,
  opts: { name: string; max: number; windowSec: number; key?: string }
): Promise<RateLimitResult> {
  const id = opts.key || clientIp(request);
  const fullKey = `rl:${opts.name}:${id}`;

  const upstash = await upstashIncr(fullKey, opts.windowSec);
  if (upstash) {
    return {
      ok: upstash.count <= opts.max,
      remaining: Math.max(0, opts.max - upstash.count),
      resetAt: Date.now() + upstash.ttlMs,
    };
  }

  // Fallback: in-memory (good enough for single-instance dev / Vercel cold starts).
  const now = Date.now();
  const bucket = memory.get(fullKey);
  if (!bucket || bucket.resetAt < now) {
    const fresh = { count: 1, resetAt: now + opts.windowSec * 1000 };
    memory.set(fullKey, fresh);
    return { ok: true, remaining: opts.max - 1, resetAt: fresh.resetAt };
  }
  bucket.count++;
  return {
    ok: bucket.count <= opts.max,
    remaining: Math.max(0, opts.max - bucket.count),
    resetAt: bucket.resetAt,
  };
}
