"use client";

import { motion } from "framer-motion";
import { useState, useContext, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CartContext } from "../../../components/CartContext";

function EnterprisePageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [quantity, setQuantity] = useState(1);
  const [referralCode, setReferralCode] = useState("");
  const [referralDiscount, setReferralDiscount] = useState(0);
  const [referralValid, setReferralValid] = useState(false);

  const { addToCart, generatedCode } = useContext(CartContext);

  const pricePerSet = 90000; // Enterprise bulk price
  const piecesPerSet = 100; // Enterprise bulk quantity

  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  // ✅ Auto-apply referral code from URL safely inside Suspense
  useEffect(() => {
    if (!searchParams) return;
    const codeFromUrl = searchParams.get("ref")?.toUpperCase();
    if (codeFromUrl) {
      fetch(`/api/referrals?code=${codeFromUrl}`)
        .then(res => res.json())
        .then(data => {
          if (data.valid) {
            setReferralCode(codeFromUrl);
            setReferralDiscount(data.discount);
            setReferralValid(true);
          }
        })
        .catch(err => console.error("Referral check failed:", err));
    }
  }, [searchParams]);

  const baseTotal = pricePerSet * quantity;
  const discountedTotal = referralDiscount
    ? baseTotal - (baseTotal * referralDiscount) / 100
    : baseTotal;

  const handleAddToCart = () => {
    addToCart(quantity, referralCode, referralDiscount, discountedTotal);
    alert("🛒 Item added to cart!");
  };

  const handleProceedToCheckout = () => {
    addToCart(quantity, referralCode, referralDiscount, discountedTotal, generatedCode);
    router.push("/checkout");
  };

  return (
    <main className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl w-full bg-white rounded-xl shadow-2xl p-10 md:flex gap-10"
      >
        {/* Product Image */}
        <div className="md:w-1/2 flex justify-center items-center">
          <motion.img
            src="/product.png"
            alt="Bum's Hero Enterprise"
            className="rounded-lg w-full max-w-sm h-auto object-cover"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 flex flex-col justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-[Fraunces] text-[#403F2B]">
              Bum's Hero - Enterprise Bulk Pack
            </h1>
            <p className="text-xl md:text-2xl font-semibold text-[#29291F] mt-2">
              {piecesPerSet} pieces for ₦{pricePerSet.toLocaleString()}
            </p>
            <p className="text-base md:text-lg text-[#403F2B] leading-relaxed mt-4">
              Perfect for businesses or bulk orders. Premium quality, unique designs, and professional packaging for enterprises.
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 ">
            <button
              onClick={handleDecrease}
              className="px-4 py-2 bg-[#403F2B] text-[#FEFAF1] rounded hover:bg-[#29291F] transition"
            >
              -
            </button>
            <span className="font-semibold text-lg">{quantity}</span>
            <button
              onClick={handleIncrease}
              className="px-4 py-2 bg-[#403F2B] text-[#FEFAF1] rounded hover:bg-[#29291F] transition"
            >
              +
            </button>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-[#F3F1C4] text-[#29291F] font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-[#d9d79e] transition transform hover:scale-105"
            >
              Add to Cart (₦{discountedTotal.toLocaleString()})
            </button>
            <button
              onClick={handleProceedToCheckout}
              className="flex-1 bg-[#403F2B] text-[#FEFAF1] font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-[#29291F] transition transform hover:scale-105"
            >
              Proceed to Checkout
            </button>
          </div>

          {/* Referral Code */}
          {referralValid && referralCode && (
            <p className="mt-4 p-3 bg-green-100 text-green-800 rounded">
              🎉 Referral code applied: <strong>{referralCode}</strong> — {referralDiscount}% discount!
            </p>
          )}

          {/* Cart Preview */}
          <div className="mt-6 p-4 bg-[#29291F] text-[#F3F1C4] rounded-lg shadow-inner">
            <p className="font-semibold mb-2">Cart Preview</p>
            <p>
              {quantity} × Bum's Hero = ₦{baseTotal.toLocaleString()}
              {referralDiscount > 0 && (
                <>
                  <br />
                  <span className="text-green-400 font-semibold">-{referralDiscount}% discount applied</span>
                  <br />
                  Total: ₦{discountedTotal.toLocaleString()}
                </>
              )}
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}

// ✅ Suspense wrapper prevents build-time hydration errors
export default function EnterprisePage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <EnterprisePageInner />
    </Suspense>
  );
}
