import { env } from "@/lib/env";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ChatJsonOptions {
  apiKey?: string;
  messages: ChatMessage[];
  model?: string;
  temperature?: number;
  maxTokens?: number;
  timeoutMs?: number;
}

export interface ChatJsonResult<T> {
  ok: true;
  data: T;
}
export interface ChatJsonError {
  ok: false;
  status: number;
  message: string;
}

interface ProviderConfig {
  endpoint: string;
  key: string;
  defaultModel: string;
  label: string;
}

function pickProvider(explicitKey?: string): ProviderConfig | null {
  if (env.AI_PROVIDER === "deepseek" && env.DEEPSEEK_API_KEY) {
    return {
      endpoint: "https://api.deepseek.com/v1/chat/completions",
      key: env.DEEPSEEK_API_KEY,
      defaultModel: env.DEEPSEEK_MODEL,
      label: "DeepSeek",
    };
  }
  const openaiKey = explicitKey || env.OPENAI_API_KEY;
  if (openaiKey) {
    return {
      endpoint: "https://api.openai.com/v1/chat/completions",
      key: openaiKey,
      defaultModel: env.OPENAI_MODEL,
      label: "OpenAI",
    };
  }
  return null;
}

export function isAiConfigured(): boolean {
  return pickProvider() !== null;
}

export function activeAiProvider(): "openai" | "deepseek" | "none" {
  const p = pickProvider();
  if (!p) return "none";
  return p.label === "DeepSeek" ? "deepseek" : "openai";
}

export async function chatJSON<T = Record<string, unknown>>(
  opts: ChatJsonOptions
): Promise<ChatJsonResult<T> | ChatJsonError> {
  const provider = pickProvider(opts.apiKey);
  if (!provider) {
    return {
      ok: false,
      status: 503,
      message: "AI chưa được cấu hình.",
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    opts.timeoutMs ?? 25000
  );

  try {
    const res = await fetch(provider.endpoint, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${provider.key}`,
      },
      body: JSON.stringify({
        model: opts.model || provider.defaultModel,
        messages: opts.messages,
        temperature: opts.temperature ?? 0.7,
        max_tokens: opts.maxTokens ?? 1500,
        response_format: { type: "json_object" },
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error(`${provider.label} API error:`, errorData);
      return {
        ok: false,
        status: 502,
        message: "Không thể xử lý yêu cầu AI. Vui lòng thử lại sau.",
      };
    }

    const json = await res.json();
    const content = json.choices?.[0]?.message?.content;
    if (!content) {
      return {
        ok: false,
        status: 502,
        message: "Không nhận được phản hồi từ AI.",
      };
    }

    let parsed: T;
    try {
      parsed = JSON.parse(content) as T;
    } catch (err) {
      console.error(`${provider.label} JSON parse error:`, err);
      return {
        ok: false,
        status: 502,
        message: "Phản hồi AI không hợp lệ.",
      };
    }
    return { ok: true, data: parsed };
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      return { ok: false, status: 504, message: "AI phản hồi quá chậm." };
    }
    console.error(`${provider.label} request error:`, err);
    return {
      ok: false,
      status: 500,
      message: "Đã xảy ra lỗi khi gọi AI.",
    };
  } finally {
    clearTimeout(timeout);
  }
}
