"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ReferralRedirectPage({ params }: { params: { code: string } }) {
  const router = useRouter();

  useEffect(() => {
    if (params.code) {
      // Save referral to localStorage so we can retrieve it at checkout
      localStorage.setItem("referralName", params.code);
      router.push("/shop/student");
    }
  }, [params.code, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting...</p>
    </div>
  );
}
