'use client';
import React, { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { addressDummyData } from "@/assets/assets";
import { useRouter } from "next/navigation";

const OrderSummary = () => {
  const { currency, getCartCount, getCartAmount, cartItems, products } = useAppContext();
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userAddresses, setUserAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => setUserAddresses(addressDummyData), []);

  const cartAmount = getCartAmount?.() || 0;
  const taxAmount = Math.floor(cartAmount * 0.02);
  const totalAmount = cartAmount + taxAmount;

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
    setError("");
  };

  // Simulate order/payment
  const createOrder = () => {
    if (!selectedAddress) {
      setError("Please select a shipping address.");
      return;
    }

    if (getCartCount() === 0) {
      setError("Your cart is empty.");
      return;
    }

    setLoading(true);
    setError("");

    // Simulate delay
    setTimeout(() => {
      // Clear cart
      localStorage.removeItem('cartItems');
      setLoading(false);
      // Redirect to success page
      router.push("/success");
    }, 1500);
  };

  return (
    <div className="w-full md:w-96 bg-gray-100 p-5">
      <h2 className="text-xl md:text-2xl font-medium text-gray-700">Order Summary</h2>
      <hr className="border-gray-500/30 my-5" />

      {/* Address Selection */}
      <div>
        <label className="text-base font-medium uppercase text-gray-600 block mb-2">Select Address</label>
        <div className="relative inline-block w-full text-sm border">
          <button
            className="peer w-full text-left px-4 pr-2 py-2 bg-white text-gray-700 focus:outline-none"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>
              {selectedAddress
                ? `${selectedAddress.fullName}, ${selectedAddress.area}, ${selectedAddress.city}, ${selectedAddress.state}`
                : "Select Address"}
            </span>
          </button>

          {isDropdownOpen && (
            <ul className="absolute w-full bg-white border shadow-md mt-1 z-10 py-1.5">
              {userAddresses.map((address, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer"
                  onClick={() => handleAddressSelect(address)}
                >
                  {address.fullName}, {address.area}, {address.city}, {address.state}
                </li>
              ))}
              <li
                onClick={() => router.push("/add-address")}
                className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer text-center"
              >
                + Add New Address
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {/* Order Summary */}
      <div className="space-y-4 mt-6">
        <div className="flex justify-between text-base font-medium">
          <p className="uppercase text-gray-600">Items {getCartCount()}</p>
          <p className="text-gray-800">{currency}{cartAmount.toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Shipping Fee</p>
          <p className="font-medium text-gray-800">Free</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Tax (2%)</p>
          <p className="font-medium text-gray-800">{currency}{taxAmount.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-lg md:text-xl font-medium border-t pt-3">
          <p>Total</p>
          <p>{currency}{totalAmount.toFixed(2)}</p>
        </div>
      </div>

      <button
        onClick={createOrder}
        disabled={loading || getCartCount() === 0}
        className="w-full bg-orange-600 text-white py-3 mt-5 hover:bg-orange-700 disabled:opacity-60"
      >
        {loading ? "Processing..." : "Place Order"}
      </button>
    </div>
  );
};

export default OrderSummary;
