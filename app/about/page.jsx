"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-gray-900">
      <Navbar />

      <main className="flex-1 flex flex-col justify-center items-center text-center px-6 py-16">
        <h1 className="text-4xl font-bold tracking-tight mb-6">
          About <span className="text-orange-600">Us</span>
        </h1>
        <p className="text-black text-lg leading-relaxed max-w-2xl">
          At <span className="font-semibold text-orange-600">QuickCart</span>, we believe in creating simple, innovative, 
          and high-quality solutions that enhance everyday life. Our vision is 
          to blend technology with creativity to deliver meaningful experiences, 
          while staying committed to sustainability, transparency, and positive impact.
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default About;
