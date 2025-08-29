"use client";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const NewsLetter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    toast.dismiss(); // dismiss any previous toast

    if (!email) {
      toast.error("Please enter a valid email!");
      return;
    }

    toast.success(`Subscribed successfully with ${email}!`);
    setEmail("");
  };

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 pt-8 pb-14">
      {/* Toaster rendered only once here */}
      <Toaster position="top-right" />

      <h1 className="md:text-4xl text-2xl font-medium">
        Subscribe now & get 20% off
      </h1>
      <p className="md:text-base text-gray-500/80 pb-8">
        Join QuickCart's newsletter to receive exclusive deals, latest products, 
        and shopping tips straight to your inbox.
      </p>
      <div className="flex items-center justify-between max-w-2xl w-full md:h-14 h-12">
        <input
          className="border border-gray-500/30 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
          type="email"
          placeholder="Enter your email id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="md:px-12 px-8 h-full text-white bg-orange-600 rounded-md rounded-l-none"
          onClick={handleSubscribe}
        >
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default NewsLetter;
