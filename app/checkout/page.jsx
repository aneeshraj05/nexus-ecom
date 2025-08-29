'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Checkout = () => {
  const { cartItems, products, setCartItems } = useAppContext();
  const router = useRouter();

  const handlePayment = () => {
    const order = {
      items: Object.keys(cartItems).map(id => {
        const product = products.find(p => p._id === id);
        return { name: product.name, quantity: cartItems[id], price: product.offerPrice };
      }),
      amount: Object.keys(cartItems).reduce((sum, id) => {
        const product = products.find(p => p._id === id);
        return sum + product.offerPrice * cartItems[id];
      }, 0),
      date: new Date(),
      paymentStatus: "Paid"
    };

    localStorage.setItem("latestOrder", JSON.stringify(order));
    setCartItems({});
    localStorage.removeItem("localCart");
    router.push("/success");
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center min-h-screen text-center">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
        <p className="mb-6">Confirm your order and proceed to payment.</p>
        <button
          onClick={handlePayment}
          className="px-6 py-3 bg-orange-600 text-white rounded-md"
        >
          Pay Now
        </button>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
