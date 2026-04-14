import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const cvId = searchParams.get("id");

  if (!cvId) {
    return NextResponse.json({ error: "Missing CV ID" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: cv, error } = await supabase
    .from("cvs")
    .select("*")
    .eq("id", cvId)
    .eq("user_id", user.id)
    .single();

  if (error || !cv) {
    return NextResponse.json({ error: "CV not found" }, { status: 404 });
  }

  // For now, return JSON data - PDF generation with @react-pdf/renderer
  // will be implemented as a separate enhancement
  // This endpoint currently serves as a data endpoint for client-side PDF generation
  return NextResponse.json({
    cv,
    message: "PDF generation endpoint - use client-side rendering for now",
  });
}
