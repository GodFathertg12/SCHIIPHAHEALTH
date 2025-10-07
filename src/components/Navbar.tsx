"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useContext } from "react";
import { CartContext } from "./CartContext";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { quantity } = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <nav className="bg-transparent sticky top-0 z-50">
      <div className="container flex items-center justify-between py-4">
        {/* Logo + Brand */}
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png" // ensure logo is inside /public
            alt="Schiipha Health Logo"
            width={42}
            height={42}
            className="object-contain mt-1" // lowered slightly
          />
          <Link
            href="/"
            className="text-2xl font-semibold text-[#F3F1C4] leading-none"
          >
            Schiipha Health
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-[#FEFAF1]">
          <Link href="/" className="hover:text-[#F3F1C4]">HOME</Link>
          <Link href="/#welcome" className="hover:text-[#F3F1C4]">WELCOME</Link>
          {/*<Link href="/products" className="hover:text-[#F3F1C4]">PRODUCT GALLERY</Link>*/}

          <div className="relative">
            <button onClick={() => setMoreOpen(v => !v)} className="hover:text-[#F3F1C4]">
              MORE
            </button>
            {moreOpen && (
              <div className="absolute left-0 top-8 bg-[#FEFAF1] text-[#29291F] rounded shadow p-3 min-w-[160px]">
                <Link href="/about" className="block py-1">About Us</Link>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="block py-1"
                >
                  Instagram
                </a>
                <Link href="/contact" className="block py-1">Contact</Link>
              </div>
            )}
          </div>

          {/* Cart */}
          <div className="relative">
            <button className="flex items-center gap-2">
              🛒 <span className="font-semibold">{quantity}</span>
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-[#FEFAF1]" onClick={() => setOpen(v => !v)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-transparent">
          <div className="container py-4 flex flex-col gap-3 text-[#FEFAF1]">
            <Link href="/" onClick={() => setOpen(false)}>HOME</Link>
            <Link href="/#welcome" onClick={() => setOpen(false)}>WELCOME</Link>
            {/*<Link href="/products" onClick={() => setOpen(false)}>PRODUCT GALLERY</Link>*/}
            <Link href="/about" onClick={() => setOpen(false)}>ABOUT US</Link>
            <Link href="/contact" onClick={() => setOpen(false)}>CONTACT</Link>
            <div className="pt-2 border-t border-[#29291F] flex items-center gap-2">
              🛒 <span className="font-semibold">{quantity}</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
