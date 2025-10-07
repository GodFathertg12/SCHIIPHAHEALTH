"use client";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e: any) => { e.preventDefault(); alert("Message sent (demo)"); setForm({ name: "", email: "", message: "" }); };

  return (
    <main className="container py-12">
      <div className="md:flex gap-12">
        <div className="md:w-1/2">
          <h1 className="text-3xl font-semibold text-[#F3F1C4]">Contact Us</h1>
          <p className="mt-3 text-[#FEFAF1]">Email: Schiiphahealth@gmail.com</p>
          <p className="mt-2 text-[#FEFAF1]">Phone: +2347062156810</p>
        </div>


      </div>
    </main>
  );
}
