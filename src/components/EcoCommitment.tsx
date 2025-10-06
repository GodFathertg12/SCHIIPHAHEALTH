"use client"
import { motion } from "framer-motion"

export default function EcoCommitment() {
  return (
    <section id="eco" className="py-20 bg-gray-50 px-6">
      <div className="max-w-5xl mx-auto text-center">
        {/* Title */}
        <motion.h2
          className="text-3xl font-bold text-orange-500"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Our Eco-Commitment
        </motion.h2>

        {/* Subtitle / Paragraph */}
        <motion.p
          className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          At Schiipha Health, we believe hygiene shouldn’t come at the expense of
          the planet. That’s why our products are designed with eco-friendly
          materials, sustainable packaging, and innovative practices that put
          both people and the environment first.
        </motion.p>

        {/* Callout box */}
        <motion.div
          className="bg-white shadow-md rounded-xl p-8 max-w-2xl mx-auto border border-gray-100"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
        >
          <h3 className="text-2xl font-semibold text-green-600 mb-3">
            🌱 Sustainability Promise
          </h3>
          <p className="text-gray-700">
            Every step we take is towards a cleaner, greener, and more
            responsible future. From biodegradable materials to reduced carbon
            footprint, we’re committed to protecting what matters most — your
            health and the environment.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
