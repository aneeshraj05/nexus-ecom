// utils/orders.js (Client-side localStorage helper)

export const saveOrder = (order) => {
  localStorage.setItem("latestOrder", JSON.stringify(order));
};

export const getOrders = () => {
  const order = localStorage.getItem("latestOrder");
  return order ? [JSON.parse(order)] : [];
};
