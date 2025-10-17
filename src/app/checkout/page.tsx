"use client";

declare global {
  interface Window {
    PaystackPop: any;
  }
}

import { useState, useContext, useEffect } from "react";
import { CartContext } from "@/components/CartContext";
import Link from "next/link";
import Image from "next/image";

export default function CheckoutPage() {
  const ctx = useContext(CartContext);
  const quantity = ctx?.quantity ?? 1;
  const clearCart = ctx?.clearCart ?? (() => {});
  const pricePerSet = 2000;
  const total = pricePerSet * quantity;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [scriptReady, setScriptReady] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // ✅ Load Paystack script once
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.PaystackPop) {
      setScriptReady(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.onload = () => setScriptReady(true);
    script.onerror = () => alert("⚠️ Failed to load Paystack script.");
    document.body.appendChild(script);
  }, []);

  // ✅ Load referral code from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const code = localStorage.getItem("referralCode");
      if (code) setReferralCode(code);
    }
  }, []);

  // ✅ Handle Paystack payment
  const handlePaystackPayment = (e: any) => {
    e.preventDefault();

    if (!scriptReady) return alert("⚠️ Paystack not ready yet. Please wait.");
    if (!email || !fullName || !phone || !address)
      return alert("Please fill in all required fields.");

    const key = process.env.NEXT_PUBLIC_PAYSTACK_KEY;
    if (!key) return alert("Paystack public key missing in environment file.");

    // Debug: check data before Paystack init
    console.log("🔍 Paystack init data", { key, email, total, amount: total * 100 });

    if (!window.PaystackPop) {
      alert("⚠️ Paystack script not available yet.");
      return;
    }

    const handler = window.PaystackPop.setup({
      key,
      email,
      amount: total * 100,
      currency: "NGN",
      ref: "SCHIIPHA-" + Date.now(),
      metadata: {
        custom_fields: [
          { display_name: "Full Name", variable_name: "full_name", value: fullName },
          { display_name: "Phone", variable_name: "phone", value: phone },
          { display_name: "Address", variable_name: "address", value: address },
          { display_name: "Referral Code", variable_name: "referral_code", value: referralCode || "none" },
        ],
      },

      // ✅ Wrapped callback to avoid async issues
      callback: (response: any) => {
        (async () => {
          alert("✅ Payment successful! Reference: " + response.reference);
          setPaymentSuccess(true);
          clearCart();

          try {
            await fetch("/api/payments", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                fullName,
                email,
                phone,
                address,
                amount: total,
                reference: response.reference,
                status: "success",
                referralCode,
              }),
            });
          } catch (error) {
            console.error("❌ Failed to save payment:", error);
          }
        })();
      },

      onClose: () => {
        alert("⚠️ Payment window closed or cancelled.");
      },
    });

    handler.openIframe();
  };

  return (
    <main className="min-h-screen bg-[#FEFAF1] text-[#29291F] px-6 py-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* ORDER SUMMARY */}
        <div className="bg-[#403F2B] text-[#FEFAF1] p-6 rounded-xl shadow-md flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="mb-4 w-48 h-48 relative">
            <Image
              src="/product.png"
              alt="Bum's Hero"
              fill
              className="object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="flex justify-between w-full mb-2">
            <p>Bum's Hero × {quantity}</p>
            <p>₦{total.toLocaleString()}</p>
          </div>
          <hr className="my-3 border-[#F3F1C4]/40 w-full" />
          <div className="flex justify-between font-semibold text-lg w-full">
            <p>Total:</p>
            <p>₦{total.toLocaleString()}</p>
          </div>
          {paymentSuccess && (
            <div className="mt-4 p-3 bg-green-100 text-green-800 rounded w-full text-center">
              ✅ Payment recorded successfully.
            </div>
          )}
        </div>

        {/* CHECKOUT FORM */}
        <form
          className="bg-white p-6 rounded-xl shadow-md"
          onSubmit={handlePaystackPayment}
        >
          <h2 className="text-2xl font-bold mb-6 text-[#403F2B]">
            Shipping Details
          </h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Full Name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="border border-[#403F2B]/30 rounded-md px-4 py-2 focus:border-[#403F2B]"
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-[#403F2B]/30 rounded-md px-4 py-2 focus:border-[#403F2B]"
            />
            {referralCode && (
              <input
                type="text"
                placeholder="Referral Code"
                value={referralCode}
                readOnly
                className="border border-[#403F2B]/30 rounded-md px-4 py-2 bg-gray-100 text-gray-700 cursor-not-allowed"
              />
            )}
            <input
              type="tel"
              placeholder="Phone Number"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border border-[#403F2B]/30 rounded-md px-4 py-2 focus:border-[#403F2B]"
            />
            <textarea
              placeholder="Delivery Address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border border-[#403F2B]/30 rounded-md px-4 py-2 focus:border-[#403F2B]"
              rows={3}
            />
          </div>

          <button
            type="submit"
            disabled={!scriptReady}
            className={`w-full mt-6 py-3 rounded-md font-semibold transition ${
              scriptReady
                ? "bg-[#403F2B] text-[#FEFAF1] hover:bg-[#29291F]"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
          >
            {scriptReady ? "Pay Now" : "Loading Paystack..."}
          </button>

          <p className="mt-4 text-sm text-center">
            <Link href="/shop" className="text-[#403F2B] underline">
              ← Continue Shopping
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
