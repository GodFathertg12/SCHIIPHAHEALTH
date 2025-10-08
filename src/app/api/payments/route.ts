import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, amount, reference, status, referralCode } = body;

    // Insert into Supabase
    const { error } = await supabase
      .from("payments")
      .insert([
        {
          email,
          amount,
          reference,
          status,
          referral_code: referralCode || "none",
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) {
      console.error("❌ Supabase insert failed:", error.message);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    console.log("✅ Payment saved to Supabase");
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("❌ Payment route error:", err.message);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
