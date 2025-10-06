"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function StudentPage() {
  return (
    <main className="min-h-screen bg-[#FEFAF1] flex flex-col items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full bg-white rounded-xl shadow-xl p-10 flex flex-col md:flex-row gap-10"
      >
        {/* Product Image */}
        <div className="md:w-1/2 flex justify-center items-center">
          <motion.img
            src="/product.jpg"
            alt="Bum's Hero Student"
            className="rounded-lg w-full max-w-sm h-auto object-cover"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 flex flex-col justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-[Fraunces] text-[#403F2B]">
              Bum's Hero - Student Pack
            </h1>
            <p className="text-xl md:text-2xl font-semibold text-[#29291F] mt-2">
              7 pieces for ₦3,000
            </p>
            <p className="text-base md:text-lg text-[#403F2B] leading-relaxed mt-4">
              Perfect for students seeking comfort and quality. High-quality materials and unique designs.
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mt-4">
            {/* You can add quantity buttons here if needed */}
          </div>

          {/* Shop Now Button */}
          <Link
            href="/products"
            className="mt-6 bg-[#403F2B] text-[#FEFAF1] font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-[#29291F] transition transform hover:scale-105 text-center"
          >
            Shop Now
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
