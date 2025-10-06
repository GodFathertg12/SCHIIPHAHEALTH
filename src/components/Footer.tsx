"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#403F2B] text-[#FEFAF1] py-12 mt-12">
      <div className="container grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-2xl font-semibold text-[#F3F1C4]">Schiipha Health</h3>
          <p className="mt-2 text-sm">Quality hygiene solutions for everyday comfort.</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-[#F3F1C4]">Contact</h4>
          <p className="text-sm">Email: info@schiiphahealth.com</p>
          <p className="text-sm">Phone: +234 800 123 4567</p>
          <p className="text-sm">Lagos, Nigeria</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-[#F3F1C4]">Policies</h4>
          <ul className="text-sm space-y-2">
            <li><Link href="/privacy-policy" className="hover:text-[#F3F1C4]">Privacy Policy</Link></li>
            <li><Link href="/accessibility" className="hover:text-[#F3F1C4]">Accessibility Statement</Link></li>
            <li><Link href="/shipping-policy" className="hover:text-[#F3F1C4]">Shipping Policy</Link></li>
            <li><Link href="/terms" className="hover:text-[#F3F1C4]">Terms & Conditions</Link></li>
            <li><Link href="/refund-policy" className="hover:text-[#F3F1C4]">Refund Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="container text-center mt-8 text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
        © {new Date().getFullYear()} Schiipha Health. All rights reserved.
      </div>
    </footer>
  );
}
