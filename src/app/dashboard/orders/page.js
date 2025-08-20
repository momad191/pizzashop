"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders, setPage } from "../../redux/ordersSlice";
import OrderStatusUpdater from "./OrderStatusUpdater";
import Sidebar from "../Sidebar"; 

const Page = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderCart, setSelectedOrderCart] = useState(null);
 
  const dispatch = useDispatch();
  const { orders, status, error, currentPage, totalPages } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {
    dispatch(fetchOrders(currentPage)); // Fetch orders based on current page
  }, [currentPage, dispatch]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setPage(currentPage - 1)); // Navigate to previous page
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setPage(currentPage + 1)); // Navigate to next page
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-bold animate-pulse text-blue-500">
          Loading...
        </div>
      </div>
    );
  }

  if (error) return <p>Error: {error}</p>;

  if (status === "failed") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  const changeStatus = (id, newStatus) => {
    if (window.confirm("Are you sure you want to change the order status?")) {
      dispatch(
        // Dispatch action to update order status in the Redux store
        updateOrderStatus({ id, status: newStatus })
      );
    }
  };

  const viewDetails = (order) => {
    setSelectedOrder(order); // Set the selected order to show details
  };
  const viewDetailsCart = (order) => {
    setSelectedOrderCart(order); // Set the selected order to show details
  };

  const closeDialog = () => {
    setSelectedOrder(null); // Close the dialog by clearing the selected order
    setSelectedOrderCart(null); // Close the dialog by clearing the selected orderCart
  };

  return (
    <div className="min-h-screen bg-red-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-red-700 mb-4">
          Manage All Orders
        </h1>
        <div className="bg-white rounded-lg shadow p-4">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b p-2 text-left">Order ID</th>
                <th className="border-b p-2 text-left">Name</th>
                <th className="border-b p-2 text-left">Mobile</th>
                <th className="border-b p-2 text-left">Status</th>
                <th className="border-b p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="border-b p-2">{order._id}</td>
                  <td className="border-b p-2">
                    {order.first_name} {order.last_name}
                  </td>
                  <td className="border-b p-2">{order.phone}</td>
                  <td className="border-b p-2">{order.status}</td>
                  <td className="border-b p-2 flex space-x-2">
                    <OrderStatusUpdater order={order} />
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                      onClick={() => viewDetails(order)}
                    >
                      View Order Details
                    </button>
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                      onClick={() => viewDetailsCart(order)}
                    >
                      View Cart Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 ${
              currentPage === 1 && "opacity-50 cursor-not-allowed"
            }`}
          >
            Previous
          </button>

          <span className="text-lg">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 ${
              currentPage === totalPages && "opacity-50 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>
      </main>

      {/* Order Details Dialog */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            <p className="mb-4">
              <strong>Order ID:</strong> {selectedOrder._id}
            </p>
            <p className="mb-4">
              <strong>Status:</strong> {selectedOrder.status}
            </p>
            <p className="mb-4">
              <strong>Name:</strong> {selectedOrder.first_name}{" "}
              {selectedOrder.last_name}
            </p>
            <p className="mb-4">
              <strong>Email:</strong> {selectedOrder.email}
            </p>
            <p className="mb-4">
              <strong>phone:</strong> {selectedOrder.phone}
            </p>
            <p className="mb-4">
              <strong>street name:</strong> {selectedOrder.street_name}
            </p>
            <p className="mb-4">
              <strong>street No:</strong> {selectedOrder.street_no}
            </p>
            <p className="mb-4">
              <strong>block:</strong> {selectedOrder.block}
            </p>
            <p className="mb-4">
              <strong>floor:</strong> {selectedOrder.floor}
            </p>
            <p className="mb-4">
              <strong>apt No:</strong> {selectedOrder.apt_no}
            </p>
            <p className="mb-4">
              <strong>mentions:</strong> {selectedOrder.mentions}
            </p>
            <p className="mb-4">
              <strong>delivery rep name:</strong>
              {selectedOrder.delivery_rep_name}
            </p>
            <p className="mb-4">
              <strong>total:</strong> ${selectedOrder.total}
            </p>

            <button
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              onClick={closeDialog}
            >
              X
            </button>
          </div>
        </div>
      )}

      {/* Order cart Details Dialog */}
      {selectedOrderCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-scroll h-full">
          <div className="bg-white rounded-lg shadow-lg p-2 w-3/4 max-w-lg min-h-full">
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            {selectedOrderCart.cart?.map((pizza, index) => (
              <div className="" key={index}>
                <div className="flex gap-x-2 mb-2">
                  {/* image  */}
                  <div className="flex justify-center items-center">
                    <Image src={pizza.image} width={90} height={90} alt="" />
                  </div>
                  {/* pizza info   */}
                  <div className="flex-1 flex flex-col gap-y-1">
                    {/* name */}
                    <div className="text-lg capitalize font-bold">
                      {pizza.name}
                    </div>
                    <div className="flex flex-col gap-y-1">
                      {/* crust */}
                      <div className="capitalize font-medium text text-[15px] ">
                        {pizza.crust} crust
                      </div>
                      {/* size */}
                      <div className="capitalize mb-2 font-medium text-[15px]">
                        {pizza.size} size
                      </div>
                      {/* quantity controls */}
                      <div className="flex items-center gap-x-1">
                        {/* decrease quantity */}
                        <div className="w-[18px] h-[18px] flex items-center justify-center   text-white gradient rounded-full"></div>
                        {/* pizza amount */}
                        <div className="font-semibold flex flex-1 max-w-[30px] justify-center items-center text-sm">
                          {pizza.amount}
                        </div>
                        {/* increase quantity */}
                        <div className="w-[18px] h-[18px] flex items-center justify-center   text-white gradient rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between">
                    {/* remove item */}
                    <div
                      onClick={() =>
                        removeItem(pizza.id, pizza.price, pizza.crust)
                      }
                      className="text-2xl flex justify-center items-center self-end cursor-pointer hover:scale-110 duration-100 transition-all text-orange"
                    ></div>

                    {/* price */}
                    <div>
                      <span className="text-[17px] font-medium font-robotoCondensed">
                        ${parseFloat(pizza.price * pizza.amount).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                {/* toppings  */}
                <div className="flex flex-wrap items-center gap-3 p-6 border-b border-black/10">
                  <div className="font-semibold">
                    Toppings: {pizza.additionalTopping.length === 0 && "None"}
                  </div>
                  {pizza.additionalTopping.map((topping, index) => {
                    return (
                      <div
                        className="capitalize text-sm gradient font-medium px-3 py-1 rounded-full leading-none"
                        key={index}
                      >
                        {topping.name}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="flex gap-x-5 py-3">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                onClick={closeDialog}
              >
                X
              </button>
              <h1> </h1>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                onClick={closeDialog}
              >
                ${selectedOrderCart.total}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
