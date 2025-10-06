import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { email, amount, reference, status, referral_code }: any = await request.json();

    const { data, error } = await supabase
      .from("payments")
      .insert([
        {
          email,
          amount,
          reference,
          status,
          referral_code: referral_code || null,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (referral_code && referral_code !== "none") {
      const { data: refData }: any = await supabase
        .from("users")
        .select("email")
        .eq("referral_code", referral_code)
        .single();

      if (refData?.email) {
        await supabase.from("referrals").insert([
          {
            referrer_email: refData.email,
            referee_email: email,
            payment_reference: reference,
          },
        ]);
      }
    }

    return NextResponse.json({ message: "Payment saved successfully", data });
  } catch (err: any) {
    console.error("Server error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
