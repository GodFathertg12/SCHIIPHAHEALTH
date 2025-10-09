"use client";

import { useState, useContext, useEffect } from "react";
import { CartContext } from "@/components/CartContext";
import Link from "next/link";
import Image from "next/image";

interface PaystackResponse {
  reference: string;
}

export default function CheckoutPage() {
  const ctx = useContext(CartContext);
  const quantity = ctx?.quantity ?? 1;
  const [referralCode, setReferralCode] = useState("");
  
  useEffect(()=> {
    if(typeof window !== "undefined"){
      const storedCode = localStorage.getItem("referralCode");
      if (storedCode)setReferralCode(storedCode);
    }
  }, []);
 
  const clearCart = ctx?.clearCart ?? (() => {});

  const pricePerSet = 3000;
  const subtotal = pricePerSet * quantity;
  const total = subtotal; // no discounts now

  const [email, setEmail] = useState("");
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // ✅ Load Paystack script
  useEffect(() => {
    if (typeof window === "undefined") return;

    const existing = document.querySelector(
      'script[src="https://js.paystack.co/v1/inline.js"]'
    );
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      script.async = true;
      script.onload = () => setScriptLoaded(true);
      script.onerror = () => alert("❌ Failed to load Paystack script.");
      document.body.appendChild(script);
    } else {
      setScriptLoaded(true);
    }
  }, []);

  const handlePaystackPayment = () => {
    if (!scriptLoaded) return alert("⚠️ Paystack not ready yet. Please wait.");
    if (!email) return alert("Please enter your email.");

    const PaystackPop = (window as any).PaystackPop;
    if (!PaystackPop) return alert("⚠️ Paystack failed to initialize.");

    const handler = PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_KEY,
      email,
      amount: total * 100,
      currency: "NGN",
      ref: `SCHIIPHA-${Date.now()}`,
      metadata: {
        custom_fields: [
          {
            display_name: "Referral Code",
            variable_name: "referral_code",
            value: referralCode || "none",
          },
        ],
      },
      callback: (response: PaystackResponse) => {
        console.log("✅ Payment successful:", response);
        alert(`✅ Payment successful! Reference: ${response.reference}`);
        setPaymentSuccess(true);
        clearCart();

        fetch("/api/payments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            amount: total,
            reference: response.reference,
            status: "success",
            referralCode,
          }),
        }).catch((err) => {
          if (err instanceof Error)
            console.error("❌ Failed to save payment:", err.message);
        });
      },
      onClose: () => {
        alert("❌ Payment window closed or cancelled.");
      },
    });

    handler.openIframe();
  };

  return (
    <main className="min-h-screen bg-[#FEFAF1] text-[#29291F] px-6 py-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Summary */}
        <div className="bg-[#403F2B] text-[#FEFAF1] p-6 rounded-xl shadow-md flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

          {/* Product Image */}
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
            <p>₦{subtotal.toLocaleString()}</p>
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

        {/* Checkout Form */}
        <form
          className="bg-white p-6 rounded-xl shadow-md"
          onSubmit={(e) => e.preventDefault()}
        >
          <h2 className="text-2xl font-bold mb-6 text-[#403F2B]">
            Shipping Details
          </h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Full Name"
              required
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

            {/* Read-only Referral Code */}
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
              className="border border-[#403F2B]/30 rounded-md px-4 py-2 focus:border-[#403F2B]"
            />
            <textarea
              placeholder="Delivery Address"
              required
              className="border border-[#403F2B]/30 rounded-md px-4 py-2 focus:border-[#403F2B]"
              rows={3}
            />
          </div>

          <button
            type="button"
            disabled={!scriptLoaded}
            onClick={handlePaystackPayment}
            className={`w-full mt-6 py-3 rounded-md font-semibold transition ${
              scriptLoaded
                ? "bg-[#403F2B] text-[#FEFAF1] hover:bg-[#29291F]"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
          >
            {scriptLoaded ? "Pay Now" : "Loading Paystack..."}
          </button>

          <p className="mt-4 text-sm text-center">
            <Link href="/student" className="text-[#403F2B] underline">
              ← Continue Shopping
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
