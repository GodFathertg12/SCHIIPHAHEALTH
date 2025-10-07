"use client";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 py-12 flex flex-col items-center">
      <div className="max-w-3xl w-full space-y-6">
        <h1 className="text-4xl font-bold text-center text-green-800">About Schiipha</h1>
        <p className="text-lg leading-relaxed">
          Schiipha, proudly based in Lagos, is redefining hygiene with eco-friendly innovation.
          Our portable, biodegradable potties create a clean and reliable barrier between users
          and toilet seats — no plastic, no waste, just peace of mind.
        </p>
        <p className="text-lg leading-relaxed">
          Trusted by schools, restaurants, hospitals, hotels, and organizations, we make hygiene
          simple, safe, and sustainable.
        </p>
        <p className="text-lg leading-relaxed">
          At Schiipha, caring for people and the planet goes hand in hand. Join us in building cleaner
          habits and a healthier future, one flush at a time.
        </p>
      </div>
    </div>
  );
}
