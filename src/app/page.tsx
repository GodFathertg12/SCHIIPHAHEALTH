"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);

    // ✅ Referral code handler
    const params = new URLSearchParams(window.location.search);
    const refCode = params.get("ref");
    const validCodes = [
      "deyi",
      "majeed",
      "joel",
      "ayo",
      "robinson",
      "abraham",
      "jide",
      "shina",
      "ebuka",
      "olamide",
    ];

    if (refCode && validCodes.includes(refCode.toLowerCase())) {
      localStorage.setItem("referralCode", refCode.toLowerCase());
      console.log("Referral saved:", refCode);
      window.location.href ="/shop/student"
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-[#403F2B] text-[#F3F1C4] overflow-hidden relative">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative">
        {/* ✅ Logo */}
        <div className="absolute top-6 left-6">
          <img
            src="/logo.png"
            alt="Schiipha Health Logo"
            className="w-20 h-auto rounded-md shadow-sm"
          />
        </div>

        {/* Hero Text */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-[Fraunces] mb-6"
        >
          Welcome to Schiipha Health
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-lg md:text-xl max-w-2xl font-[Avenir]"
        >
          Discover innovative healthcare products designed to improve hygiene and comfort.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mt-10"
        >
          <Link
            href="/shop"
            className="bg-[#F3F1C4] text-[#29291F] px-6 py-3 rounded-lg font-semibold hover:bg-[#d9d79e] transition-transform transform hover:scale-105"
          >
            Shop Now
          </Link>
        </motion.div>
      </section>

      {/* Info Section */}
      <section className="py-24 px-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-[Fraunces] mb-4">
            Eco-Commitment
          </h2>
          <p className="text-[#F3F1C4]/80 font-[Avenir]">
            Schiipha, proudly based in Lagos, is redefining hygiene with eco-friendly innovation. Our portable, biodegrable potties create a clean and reliable barrier
            between users and toilet seats, noplastic, no waste, just peace of mind. Trusted by Schools, restaurants, hospitals, hotels, and organizations, we make hygiene
            simple, safe, and sustainable. At Schiipha, carinng for people and the planet goes hand in hand. Join us in building cleaner habits and a 
            healthier future, one flush at a time.
          </p>
        </motion.div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-8 right-8 bg-[#F3F1C4] text-[#29291F] p-3 rounded-full shadow-lg hover:bg-[#d9d79e] transition"
        >
          ↑
        </motion.button>
      )}
    </main>
  );
}
