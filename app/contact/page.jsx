"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar"; // Update path if needed

const Contact = () => {
  const router = useRouter();

  const handleCustomerClick = () => {
    router.push("/customer"); // Redirect to Customer Care page
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-col justify-center items-center flex-1 p-8 gap-10 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">
          Contact <span className="text-orange-600">Us</span>
        </h1>

        {/* About Company */}
        <p className="text-lg text-justify mb-8">
          At <span className="font-semibold">Our Company</span>, we are committed to providing
          exceptional solutions and services to our clients. Our team of experts focuses on
          innovation, reliability, and delivering results that exceed expectations. Reach out to
          us for any inquiries or support—we are here to help!
        </p>

        {/* Contact Info (Horizontal) */}
        <div className="flex flex-wrap justify-center gap-12 text-sm text-black mb-8">
          <p>Address: 123 Tech Street, Innovation City</p>
          <p>Phone: +91 98765 43210</p>
          <p>Email: aneesh.dev@gmail.com</p>
        </div>

        {/* Customer Care Button */}
        <button
          onClick={handleCustomerClick}
          className="px-8 py-3 bg-orange-600 text-white rounded hover:bg-orange-500 transition"
        >
          Customer Care
        </button>
      </div>
    </div>
  );
};

export default Contact;
