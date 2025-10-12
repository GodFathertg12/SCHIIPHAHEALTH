"use client";

import { motion } from "framer-motion";
import { Suspense, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { CartContext } from "../../../components/CartContext";

function EnterpriseContent() {
  const router = useRouter();
  const { addToCart, generatedCode } = useContext(CartContext);

  const [quantity, setQuantity] = useState(1);

  const pricePerSet = 10000; // Enterprise price
  const piecesPerSet = 20; // Enterprise quantity

  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const total = pricePerSet * quantity;

  const handleAddToCart = () => {
    addToCart(quantity, "", total, generatedCode);
    alert("🛒 Item added to cart!");
  };

  const handleProceedToCheckout = () => {
    addToCart(quantity, "", total, generatedCode);
    router.push("/checkout");
  };

  return (
    <main className="min-h-screen bg-[#FEFAF1] text-[#29291F] px-6 py-12 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full bg-white rounded-lg shadow-xl p-10 flex flex-col md:flex-row gap-10"
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
        <div className="md:w-1/2 flex flex-col justify-start gap-6">
          <h1 className="text-3xl md:text-4xl font-[Fraunces] text-[#403F2B]">
            Bum's Hero - Enterprise Pack
          </h1>
          <p className="text-xl md:text-2xl font-semibold text-[#29291F]">
            {piecesPerSet} pieces for ₦{pricePerSet.toLocaleString()}
          </p>
          <p className="text-base md:text-lg text-[#403F2B] leading-relaxed">
            Designed for business owners and bulk buyers. Premium quality at the best wholesale rate.
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
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

          {/* Add to Cart & Checkout */}
          <div className="flex flex-col gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-[#F3F1C4] text-[#29291F] font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-[#d9d79e] transition transform hover:scale-105"
            >
              Add to Cart (₦{total.toLocaleString()})
            </button>

            <button
              onClick={handleProceedToCheckout}
              className="bg-[#403F2B] text-[#FEFAF1] font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-[#29291F] transition transform hover:scale-105"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </motion.div>
    </main>
  );
}

export default function EnterprisePage() {
  return (
    <Suspense fallback={<p className="p-10 text-center">Loading enterprise package...</p>}>
      <EnterpriseContent />
    </Suspense>
  );
}
