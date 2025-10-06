"use client"
import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section
      id="welcome"
      className="relative bg-cover bg-center h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('/hero-background.jpg')", // Replace with your hero image
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <motion.div
        className="relative text-center text-white px-6 max-w-3xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          Redefining Hygiene, <br />
          <span className="text-blue-400">One Step at a Time</span>
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Eco-friendly, innovative, and designed for your comfort — Schiipha Health is your partner in modern hygiene.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="#products"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg font-semibold transition"
          >
            Shop Now
          </a>
          <a
            href="#about"
            className="px-6 py-3 border border-white rounded-lg hover:bg-white hover:text-black font-semibold transition"
          >
            Learn More
          </a>
        </div>
      </motion.div>
    </section>
  )
}
