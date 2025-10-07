"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-[#FEFAF1] flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-4xl md:text-5xl font-[Fraunces] mb-12 text-[#403F2B] text-center">
        Choose Your Shop Type
      </h1>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Student Option */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-[#403F2B] text-[#FEFAF1] p-12 rounded-lg shadow-lg flex flex-col items-center gap-6 cursor-pointer"
        >
          <h2 className="text-2xl font-semibold">Student</h2>
          <p className="text-center">
            7 pieces of Bum's Hero <br /> <span className="font-bold">₦3,000</span>
          </p>
          <Link
            href="/student"
            className="mt-4 bg-[#F3F1C4] text-[#29291F] px-6 py-3 rounded-lg font-semibold hover:bg-[#d9d79e] transition"
          >
            Shop Now
          </Link>
        </motion.div>

        {/* Enterprise Option */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-[#29291F] text-[#FEFAF1] p-12 rounded-lg shadow-lg flex flex-col items-center gap-6 cursor-pointer"
        >
          <h2 className="text-2xl font-semibold">Enterprise</h2>
          <p className="text-center">
            100 pieces of Bum's Hero <br /> <span className="font-bold">₦90,000</span>
          </p>
          <Link
            href="/enterprise"
            className="mt-4 bg-[#F3F1C4] text-[#29291F] px-6 py-3 rounded-lg font-semibold hover:bg-[#d9d79e] transition"
          >
            Shop Now
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
