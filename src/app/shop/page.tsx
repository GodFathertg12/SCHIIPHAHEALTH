"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-[#FEFAF1] text-[#29291F] flex flex-col items-center justify-center px-6 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-green-800 font-[Fraunces] mb-10"
      >
        Choose Your Pack
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-10 max-w-5xl w-full">
        {/* Student Pack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white rounded-xl shadow-xl p-8 flex flex-col items-center text-center hover:shadow-2xl transition"
        >
          <img src="/product.png" alt="Student Pack" className="rounded-lg w-56 mb-6" />
          <h2 className="text-2xl font-semibold mb-4 text-[#403F2B]">Student Pack</h2>
          <p className="text-[#403F2B] mb-6">7 pieces for ₦3,000 — perfect for students.</p>
          <Link href="/shop/student">
            <button className="bg-[#403F2B] text-[#FEFAF1] px-6 py-3 rounded-lg hover:bg-[#29291F] transition">
              View Details
            </button>
          </Link>
        </motion.div>

        {/* Enterprise Pack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white rounded-xl shadow-xl p-8 flex flex-col items-center text-center hover:shadow-2xl transition"
        >
          <img src="/product.png" alt="Enterprise Pack" className="rounded-lg w-56 mb-6" />
          <h2 className="text-2xl font-semibold mb-4 text-[#403F2B]">Enterprise Pack</h2>
          <p className="text-[#403F2B] mb-6">100 pieces for ₦90,000 — great for businesses.</p>
          <Link href="/shop/enterprise">
            <button className="bg-[#403F2B] text-[#FEFAF1] px-6 py-3 rounded-lg hover:bg-[#29291F] transition">
              View Details
            </button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
