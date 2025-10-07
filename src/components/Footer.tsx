"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 text-center space-y-4">
        <p className="text-sm">
          📞 +2347062156810 | +2349155549137 | +2349125402776
        </p>
        <p className="text-sm">📧 schiiphahealth@gmail.com</p>

        <div className="flex justify-center space-x-6 text-sm">
          <Link href="/about" className="hover:text-white transition">
            About Us
          </Link>
          <Link href="/privacy-policy" className="hover:text-white transition">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-white transition">
            Terms & Conditions
          </Link>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          © {new Date().getFullYear()} Schiipha. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
