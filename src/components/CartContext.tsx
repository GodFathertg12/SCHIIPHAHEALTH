"use client";

import { createContext, useState, ReactNode } from "react";

interface CartContextType {
  quantity: number;
  referralCode?: string;
  discountedTotal: number;
  generatedCode?: string;
  addToCart: (
    qty: number,
    code?: string,
    total?: number,
    newCode?: string
  ) => void;
  clearCart: () => void;
  generateNewReferral: () => string;
}

export const CartContext = createContext<CartContextType>({
  quantity: 0,
  referralCode: "",
  discountedTotal: 0,
  generatedCode: "",
  addToCart: () => {},
  clearCart: () => {},
  generateNewReferral: () => "",
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [quantity, setQuantity] = useState(0);
  const [referralCode, setReferralCode] = useState<string>("");
  const [discountedTotal, setDiscountedTotal] = useState<number>(0);
  const [generatedCode, setGeneratedCode] = useState<string>("");

  // ✅ Inline referral code generator
  const generateReferralCode = (): string => {
    const prefix = "SCHIIPHA";
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${prefix}-${random}`;
  };

  const addToCart = (
    qty: number,
    code?: string,
    total?: number,
    newCode?: string
  ) => {
    setQuantity(qty);
    setReferralCode(code || "");
    setDiscountedTotal(total || 0);
    if (newCode) setGeneratedCode(newCode);

    // ✅ Record referral if code exists
    if (code) {
      fetch("/api/referrals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          referralCode: code,
          quantity: qty,
          total: total || 0,
          date: new Date(),
        }),
      }).catch((err) => console.error("❌ Failed to record referral:", err));
    }
  };

  const clearCart = () => {
    setQuantity(0);
    setReferralCode("");
    setDiscountedTotal(0);
    setGeneratedCode("");
  };

  const generateNewReferral = () => {
    const code = generateReferralCode();
    setGeneratedCode(code);
    return code;
  };

  return (
    <CartContext.Provider
      value={{
        quantity,
        referralCode,
        discountedTotal,
        generatedCode,
        addToCart,
        clearCart,
        generateNewReferral,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
