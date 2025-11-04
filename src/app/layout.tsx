// src/app/layout.tsx
import "./globals.css";
import Script from "next/script";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartProvider } from "../components/CartContext";
import PageTransition from "../components/PageTransition";
import OrderQueueWorker from "../components/OrderQueueWorker"; // ✅ Import client worker

export const metadata = {
  title: "Schiipha Health",
  description: "Innovative healthcare products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-[#403F2B] via-[#403F2B] to-[#29291F] text-[#FEFAF1]">
        {/* ✅ Tailwind CDN (for dev/demo only) */}
        <Script
          id="tailwind-cdn"
          src="https://cdn.tailwindcss.com"
          strategy="beforeInteractive"
        />

        <CartProvider>
          <OrderQueueWorker /> {/* ✅ Worker now runs on client */}
          <Navbar />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </CartProvider>

        {/* ✅ Paystack Script (must be after interactive to avoid undefined errors) */}
        <Script
          src="https://js.paystack.co/v1/inline.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
