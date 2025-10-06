"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"


const product = {
  name: "Bum’s Hero",
  price: "₦25,000",
  image: "/products/bums-hero.jpg", // place your image inside public/products
  link: "https://www.schiiphahealth.com/shop", // your Wix shop URL
};
<Link href="/products/bum-hero">
  <Image
    src={product.image}
    alt={product.name}
    width={400}
    height={400}
    className="rounded-lg mx-auto cursor-pointer hover:scale-105 transition"
  />
</Link>
export default function Products() {
  return (
    <section id="products" className="py-16 bg-white text-center px-6">
      <motion.h2
        className="text-4xl font-bold text-gray-900 mb-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Our Product
      </motion.h2>

      <motion.div
        className="max-w-sm mx-auto p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <h3 className="inline-block mt-4 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition">{product.name}</h3>
        <p className="text-gray-600 text-lg font-medium">{product.price}</p>
      </motion.div>
    </section>
  )
}
