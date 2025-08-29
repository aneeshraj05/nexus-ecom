'use client';
import React, { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchedOrders = getOrders();
    setOrders(fetchedOrders);
  }, []);

  if (orders.length === 0) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col justify-center items-center min-h-screen text-center">
          <p className="text-gray-500">No orders yet. Complete a payment to see your orders.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-between px-6 md:px-16 lg:px-32 py-6 min-h-screen">
        <h2 className="text-lg font-medium mt-6">My Orders</h2>
        <div className="max-w-5xl border-t border-gray-300 text-sm mt-5">
          {orders.map((order, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-5 justify-between p-5 border-b border-gray-300">
              <div className="flex-1 flex gap-5 max-w-80">
                <Image src="/box_icon.png" alt="box" width={64} height={64} />
                <p className="flex flex-col gap-3">
                  <span className="font-medium text-base">
                    {order.items.map(item => item.product.name + ` x ${item.quantity}`).join(", ")}
                  </span>
                  <span>Items: {order.items.length}</span>
                </p>
              </div>
              <div>
                <p>
                  <span className="font-medium">{order.address.fullName}</span><br/>
                  <span>{order.address.area}</span><br/>
                  <span>{order.address.city}, {order.address.state}</span><br/>
                  <span>{order.address.phoneNumber}</span>
                </p>
              </div>
              <p className="font-medium my-auto">{order.amount}</p>
              <div>
                <p className="flex flex-col">
                  <span>Method: {order.method}</span>
                  <span>Date: {new Date(order.date).toLocaleDateString()}</span>
                  <span>Payment: {order.paymentStatus}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;
