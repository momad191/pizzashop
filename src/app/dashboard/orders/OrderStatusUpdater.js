"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { updateOrderStatus } from "../../redux/ordersSlice";

const OrderStatusUpdater = ({ order }) => {
  const dispatch = useDispatch();

  const changeStatus = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ orderId, newStatus }));
  };

  return (
    <select
      className="border p-1 rounded-md"
      value={order.status}
      onChange={(e) => changeStatus(order._id, e.target.value)}
    >
      <option value="Pending">Pending</option>
      <option value="Processing">Processing</option>
      <option value="Delivered">Delivered</option>
    </select>
  );
};

export default OrderStatusUpdater;
