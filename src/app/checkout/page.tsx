"use client";

import { useState, useContext, useEffect } from "react";
import { CartContext } from "@/components/CartContext";
import Link from "next/link";

export default function CheckoutPage() {
  const ctx = useContext(CartContext);
  const quantity = ctx?.quantity ?? 1;
  const referralCode =
    ctx?.referralCode ?? (typeof window !== "undefined" ? localStorage.getItem("referralCode") ?? "" : "");
  const referralDiscount = ctx?.referralDiscount ?? 0;
  const discountedTotal = ctx?.discountedTotal ?? 0;
  const clearCart = ctx?.clearCart ?? (() => {});

  const pricePerSet = 3000;
  const subtotal = pricePerSet * quantity;
  const total = referralDiscount > 0 && discountedTotal > 0 ? discountedTotal : subtotal;

  const [email, setEmail] = useState("");
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // ✅ Load Paystack script
  useEffect(() => {
    if (typeof window === "undefined") return;

    const existing = document.querySelector('script[src="https://js.paystack.co/v1/inline.js"]');
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      script.async = true;
      script.onload = () => {
        console.log("✅ Paystack loaded");
        setScriptLoaded(true);
      };
      script.onerror = () => alert("❌ Failed to load Paystack script.");
      document.body.appendChild(script);
    } else {
      setScriptLoaded(true);
    }
  }, []);

  // ✅ Paystack payment handler
  const handlePaystackPayment = () => {
    if (!scriptLoaded) return alert("⚠️ Paystack not ready yet. Please wait.");
    if (!email) return alert("Please enter your email.");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const PaystackPop = (window as any).PaystackPop;
    if (!PaystackPop) return alert("⚠️ Paystack failed to initialize.");

    const handler = PaystackPop.setup({
      key: "pk_live_8a67ab1a0c1db93b72996e699a335eed39c39e62",
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      callback: (response: any) => {
        console.log("✅ Payment successful:", response);
        alert(`✅ Payment successful! Reference: ${response.reference}`);
        setPaymentSuccess(true);
        clearCart();

        // 🧾 Record transaction
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
        }).catch((err) => console.error("❌ Failed to save payment:", err));
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
        <div className="bg-[#403F2B] text-[#FEFAF1] p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <p>Bum’s Hero × {quantity}</p>
            <p>₦{subtotal.toLocaleString()}</p>
          </div>
          <hr className="my-3 border-[#F3F1C4]/40" />
          <div className="flex justify-between font-semibold text-lg">
            <p>Total:</p>
            <p>₦{total.toLocaleString()}</p>
          </div>
          {paymentSuccess && (
            <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">
              ✅ Payment recorded successfully.
            </div>
          )}
        </div>

        {/* Checkout Form */}
        <form className="bg-white p-6 rounded-xl shadow-md" onSubmit={(e) => e.preventDefault()}>
          <h2 className="text-2xl font-bold mb-6 text-[#403F2B]">Shipping Details</h2>
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
            <Link href="/product" className="text-[#403F2B] underline">
              ← Continue Shopping
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
