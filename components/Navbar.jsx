"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import { useClerk, useUser, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from "@/assets/assets";

const Navbar = () => {
  const { router } = useAppContext();
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Define your admin email here
  const ADMIN_EMAIL = "aneesh.rajx@gmail.com";
  const isAdmin = user?.primaryEmailAddress?.emailAddress === ADMIN_EMAIL;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/all-products", label: "Shop" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 py-3 text-black bg-white">
      {/* Logo */}
      <h1
        onClick={() => router.push("/")}
        className="text-2xl font-semibold cursor-pointer hover:text-orange-500 duration-300"
      >
        <span className="text-orange-600 font-bold">N</span>EXUS
      </h1>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={`relative text-black hover:text-orange-600 duration-300
              after:block after:absolute after:-bottom-0.5 after:left-0 after:w-0 
              after:h-[1.5px] after:bg-orange-600 hover:after:w-full after:transition-all
              ${pathname === link.href ? "text-orange-600 after:w-full" : ""}`}
          >
            {link.label}
          </Link>
        ))}
        {/* Only admin sees Seller Dashboard */}
        {isAdmin && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border border-orange-600 px-4 py-1.5 rounded-full text-orange-600 hover:bg-orange-50 transition"
          >
            Seller Dashboard
          </button>
        )}
      </div>

      {/* Desktop Right Section */}
      <div className="hidden md:flex items-center gap-4">
        <Image src={assets.search_icon} alt="search" className="w-4 h-4" />
        {user ? (
          <UserButton afterSignOutUrl="/">
            <UserButton.MenuItems>
              <UserButton.Action
                label="Cart"
                labelIcon={<CartIcon />}
                onClick={() => router.push("/cart")}
              />
              <UserButton.Action
                label="My Orders"
                onClick={() => router.push("/my-orders")}
              />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={openSignIn}
            className="flex items-center gap-2 hover:text-orange-600 transition"
          >
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        )}
      </div>

      {/* Mobile Navigation - Simplified version */}
      <div className="md:hidden flex items-center gap-4">
        {/* Search Icon */}
        <Image src={assets.search_icon} alt="search" className="w-4 h-4" />
        
         {user ? (
          <UserButton afterSignOutUrl="/">
             <UserButton.MenuItems>
              <UserButton.Action
                label="Home"
                labelIcon={<HomeIcon/>}
                onClick={() => router.push("/")}
              />
              <UserButton.Action
                label="My Orders"
                onClick={() => router.push("/my-orders")}
              />
            </UserButton.MenuItems>
            
            <UserButton.MenuItems>
              <UserButton.Action
                label="Cart"
                labelIcon={<CartIcon />}
                onClick={() => router.push("/cart")}
              />
              <UserButton.Action
                label="My Orders"
                onClick={() => router.push("/my-orders")}
              />
            </UserButton.MenuItems>
             <UserButton.MenuItems>
              <UserButton.Action
                label="My Orders"
                labelIcon={<BoxIcon/>}
                onClick={() => router.push("/my-orders")}
              />
              <UserButton.Action
                label="My Orders"
                onClick={() => router.push("/my-orders")}
              />
            </UserButton.MenuItems>
            
          </UserButton>
        ) : (
          <button
            onClick={openSignIn}
            className="flex items-center gap-2 hover:text-orange-600 transition"
          >
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        )}
        
        {/* Seller Dashboard for Admin (mobile) */}
        {isAdmin && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border border-orange-600 px-3 py-1.5 rounded-full text-orange-600 hover:bg-orange-50 transition"
          >
            Seller
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;