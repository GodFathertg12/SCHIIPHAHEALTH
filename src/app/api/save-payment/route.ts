import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, amount, reference } = body;

    const { data, error } = await supabase
      .from("payments")
      .insert([{ email, amount, reference }])
      .select();

    if (error) {
      console.error("❌ Supabase insert error:", error.message);
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("❌ Server error:", err.message);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
