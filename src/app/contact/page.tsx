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
          <p className="mt-3 text-[#FEFAF1]">Email: info@schiiphahealth.com</p>
          <p className="mt-2 text-[#FEFAF1]">Phone: +234 800 123 4567</p>
        </div>

        <form onSubmit={handleSubmit} className="md:w-1/2 bg-[#403F2B] p-6 rounded text-[#FEFAF1]">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full p-3 rounded mb-3 text-[#29291F]" />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full p-3 rounded mb-3 text-[#29291F]" />
          <textarea name="message" value={form.message} onChange={handleChange} rows={5} className="w-full p-3 rounded mb-3 text-[#29291F]" />
          <button type="submit" className="btn-accent w-full py-3 rounded">Send Message</button>
        </form>
      </div>
    </main>
  );
}
