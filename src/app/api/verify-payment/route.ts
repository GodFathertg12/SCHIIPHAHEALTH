import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body: any = await req.json();
    const { email, amount, reference, status } = body;

    const { error } = await supabase.from("payments").insert([
      {
        email,
        amount,
        reference,
        status,
      },
    ]);

    if (error) {
      console.error("❌ Supabase insert error:", error);
      return NextResponse.json({ success: false, error }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("❌ API error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
