// utils/orderStorage.js
export const saveOrder = (order) => {
  const orders = JSON.parse(localStorage.getItem("myOrders")) || [];
  orders.push(order);
  localStorage.setItem("myOrders", JSON.stringify(orders));
};

export const getOrders = () => {
  return JSON.parse(localStorage.getItem("myOrders")) || [];
};
