"use client";

import { motion } from "framer-motion";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CartContext } from "../../components/CartContext";

interface ReferralResponse {
  valid: boolean;
  discount: number;
}

export default function ProductPage() {
  const router = useRouter();

  const [quantity, setQuantity] = useState(1);
  const [referralCode, setReferralCode] = useState("");
  const [referralDiscount, setReferralDiscount] = useState(0);
  const [referralValid, setReferralValid] = useState(false);

  const { addToCart, generatedCode } = useContext(CartContext);

  const pricePerSet = 3000;

  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const codeFromUrl = params.get("ref")?.toUpperCase();

      if (codeFromUrl) {
        fetch(`/api/referrals?code=${codeFromUrl}`)
          .then(res => res.json())
          .then((data: ReferralResponse) => {
            if (data.valid) {
              setReferralCode(codeFromUrl);
              setReferralDiscount(data.discount);
              setReferralValid(true);
            }
          })
          .catch(err => console.error("Referral check failed:", err));
      }
    }
  }, []);

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
    <main className="min-h-screen bg-[#FEFAF1] text-[#29291F] px-6 py-12">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-start">
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 flex justify-center"
        >
          <motion.img
            src="/product.png"
            alt="Bum&apos;s Hero"
            className="rounded-lg shadow-lg w-full max-w-md h-auto object-cover cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
        </motion.div>

        {/* Product Details */}
        <div className="md:w-1/2 flex flex-col justify-start">
          <h1 className="text-4xl font-[Fraunces] mb-4 text-[#403F2B]">
            Bum&apos;s Hero
          </h1>
          <p className="text-lg mb-2 font-[Avenir]">
            Price: <span className="font-semibold">₦{pricePerSet.toLocaleString()}</span>
          </p>

          <p className="text-base mb-6 leading-relaxed font-[Avenir]">
            From unique designs to high-quality materials, our Bum&apos;s Hero products
            are a must-have for everyone seeking a comfortable toilet experience.
            <br />
            <span className="font-semibold">7 pieces for ₦{pricePerSet.toLocaleString()}</span>
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={handleDecrease}
              className="px-3 py-1 bg-[#403F2B] text-[#FEFAF1] rounded hover:bg-[#29291F] transition"
            >
              -
            </button>
            <span className="font-semibold">{quantity}</span>
            <button
              onClick={handleIncrease}
              className="px-3 py-1 bg-[#403F2B] text-[#FEFAF1] rounded hover:bg-[#29291F] transition"
            >
              +
            </button>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="mb-4 bg-[#F3F1C4] text-[#29291F] font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-[#d9d79e] transition transform hover:scale-105"
          >
            Add to Cart (₦{discountedTotal.toLocaleString()})
          </button>

          {/* Proceed to Checkout */}
          <button
            onClick={handleProceedToCheckout}
            className="mb-4 bg-[#403F2B] text-[#FEFAF1] font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-[#29291F] transition transform hover:scale-105"
          >
            Proceed to Checkout
          </button>

          {/* Referral Code */}
          {referralValid && referralCode && (
            <p className="mt-4 p-3 bg-green-100 text-green-800 rounded">
              🎉 Referral code applied: <strong>{referralCode}</strong> — {referralDiscount}% discount!
            </p>
          )}

          {/* Cart Preview */}
          <div className="mt-8 p-4 bg-[#403F2B] text-[#F3F1C4] rounded-lg shadow-inner">
            <p className="font-semibold mb-2">Cart Preview</p>
            <p>
              {quantity} × Bum&apos;s Hero = ₦{baseTotal.toLocaleString()}
              {referralDiscount > 0 && (
                <>
                  <br />
                  <span className="text-green-400 font-semibold">-{referralDiscount}% discount applied</span>
                  <br />
                  New Total: ₦{discountedTotal.toLocaleString()}
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
