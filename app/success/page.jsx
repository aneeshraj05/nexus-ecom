// app/success/page.jsx
'use client';
import { useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function SuccessPage() {
  useEffect(() => {
    // Redirect to my-orders after 3 seconds
    const timer = setTimeout(() => {
      window.location.href = '/my-orders';
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-green-500 text-6xl mb-4">✓</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-6">Thank you for your purchase.</p>
          <p className="text-gray-500">Redirecting to your orders...</p>
        </div>
      </div>
    </>
  );
}