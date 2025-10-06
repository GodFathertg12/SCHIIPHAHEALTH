"use client";
import { createContext, useState, ReactNode } from "react";
import { generateReferralCode } from "../../utils/generateReferralCode";

interface CartContextType {
  quantity: number;
  referralCode?: string;
  referralDiscount?: number;
  discountedTotal: number;
  generatedCode?: string;
  addToCart: (
    qty: number,
    code?: string,
    discount?: number,
    total?: number,
    newCode?: string
  ) => void;
  clearCart: () => void;
  generateNewReferral: () => string;
}

export const CartContext = createContext<CartContextType>({
  quantity: 0,
  referralCode: "",
  referralDiscount: 0,
  discountedTotal: 0,
  generatedCode: "",
  addToCart: () => {},
  clearCart: () => {},
  generateNewReferral: () => "",
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [quantity, setQuantity] = useState(0);
  const [referralCode, setReferralCode] = useState<string>("");
  const [referralDiscount, setReferralDiscount] = useState<number>(0);
  const [discountedTotal, setDiscountedTotal] = useState<number>(0);
  const [generatedCode, setGeneratedCode] = useState<string>("");

  const addToCart = (
    qty: number,
    code?: string,
    discount?: number,
    total?: number,
    newCode?: string
  ) => {
    setQuantity(qty);
    setReferralCode(code || "");
    setReferralDiscount(discount || 0);
    setDiscountedTotal(total || 0);
    if (newCode) setGeneratedCode(newCode);

    // ✅ Record promoter referral if code exists
    if (code) {
      fetch("/api/recordReferral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          referralCode: code,
          quantity: qty,
          total: total || 0,
          date: new Date(),
        }),
      }).catch((err) => console.error("Failed to record referral:", err));
    }
  };

  const clearCart = () => {
    setQuantity(0);
    setReferralCode("");
    setReferralDiscount(0);
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
        referralDiscount,
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
