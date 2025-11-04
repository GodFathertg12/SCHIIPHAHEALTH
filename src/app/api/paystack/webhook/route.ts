import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";
import crypto from "crypto";

/**
 * ✅ Paystack webhook route
 * Receives automatic payment notifications from Paystack servers.
 */
export async function POST(req: Request) {
  try {
    // Read raw body and headers
    const rawBody = await req.text();
    const signature = req.headers.get("x-paystack-signature");

    if (!signature) {
      console.warn("⚠️ Missing Paystack signature header");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Verify the webhook signature using your secret key
    const secret = process.env.PAYSTACK_SECRET_KEY;
    const hash = crypto
      .createHmac("sha512", secret || "")
      .update(rawBody)
      .digest("hex");

    if (hash !== signature) {
      console.error("❌ Invalid Paystack signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
    }

    // ✅ Parse JSON payload safely
    const event = JSON.parse(rawBody);
    const { event: eventType, data } = event;

    if (eventType !== "charge.success") {
      console.log(`ℹ️ Ignoring non-success event: ${eventType}`);
      return NextResponse.json({ received: true });
    }

    const payment = {
      full_name: data.metadata?.custom_fields?.find((f: any) => f.variable_name === "full_name")?.value || "Unknown",
      email: data.customer?.email,
      phone: data.metadata?.custom_fields?.find((f: any) => f.variable_name === "phone")?.value || "",
      address: data.metadata?.custom_fields?.find((f: any) => f.variable_name === "address")?.value || "",
      amount: data.amount / 100, // convert kobo to Naira
      reference: data.reference,
      status: data.status,
      referral_code: data.metadata?.custom_fields?.find((f: any) => f.variable_name === "referral_code")?.value || "none",
      created_at: new Date().toISOString(),
    };

    // ✅ Save to Supabase (avoid duplicates by reference)
    const { data: existing } = await supabase
      .from("payments")
      .select("reference")
      .eq("reference", payment.reference)
      .maybeSingle();

    if (!existing) {
      const { error } = await supabase.from("payments").insert([payment]);
      if (error) throw new Error(error.message);
      console.log(`✅ Webhook saved payment: ${payment.reference}`);
    } else {
      console.log(`⚠️ Payment already exists: ${payment.reference}`);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("❌ Webhook error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
export async function GET(req: Request) {
  return new Response(
    JSON.stringify({ message: "Webhook route live!" }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
