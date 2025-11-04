import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      fullName,
      email,
      phone,
      address,
      amount,
      reference,
      status,
      referralCode,
    } = body;

    if (!reference) {
      return NextResponse.json(
        { success: false, error: "Missing payment reference" },
        { status: 400 }
      );
    }

    // ✅ 1️⃣ Check for duplicate record
    const { data: existing, error: checkError } = await supabase
      .from("payments")
      .select("id")
      .eq("reference", reference)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      console.error("Error checking existing payment:", checkError.message);
      return NextResponse.json(
        { success: false, error: "Database check failed" },
        { status: 500 }
      );
    }

    if (existing) {
      console.log(`⚠️ Duplicate payment reference ignored: ${reference}`);
      return NextResponse.json(
        { success: true, message: "Duplicate reference ignored" },
        { status: 200 }
      );
    }

    // ✅ 2️⃣ Insert new payment
    const { error: insertError } = await supabase.from("payments").insert([
      {
        full_name: fullName,
        email,
        phone,
        address,
        amount,
        reference,
        status,
        referral_code: referralCode || "none",
        created_at: new Date().toISOString(),
      },
    ]);

    if (insertError) {
      console.error("❌ Supabase insert failed:", insertError.message);
      return NextResponse.json(
        { success: false, error: insertError.message },
        { status: 500 }
      );
    }

    console.log(`✅ Payment saved successfully [${reference}]`);
    return NextResponse.json({ success: true, reference }, { status: 200 });
  } catch (err: any) {
    console.error("💥 Payment route error:", err.message);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
