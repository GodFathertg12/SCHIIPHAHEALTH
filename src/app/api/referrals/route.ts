import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";

export async function POST(req: Request) {
  try {
    const { referralCode } = await req.json();

    if (!referralCode) {
      return NextResponse.json({ success: false, error: "Referral code missing" }, { status: 400 });
    }

    // ✅ Save referral event in Supabase
    const { error } = await supabase.from("referrals").insert([
      {
        referral_code: referralCode,
        used_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("❌ Failed to record referral:", error.message);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    console.log(`✅ Referral recorded for: ${referralCode}`);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("❌ Referral route error:", err.message);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
