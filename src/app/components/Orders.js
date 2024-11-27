"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Moment from "react-moment";
import moment from "moment";
import { FaPhone } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { FaFlag } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

import { Delivered } from "@/app/actions/order";
import { Received } from "@/app/actions/order";
import { deleteOrder } from "@/app/actions/order";

const Orders = ({ orders }) => {
  const handleDelivered = async (id) => {
    var result = confirm(
      "I confirm that I have delivered the order successfully"
    );
    if (result) {
      await Delivered(id);
    }
  };

  const handleReceived = async (id) => {
    var result = confirm(
      "I confirm that I want to receive this order and start deliver it"
    );
    if (result) {
      await Received(id);
    }
  };

  const handleDeleteOrder = async (id) => {
    var result = confirm(
      "are you sure want to delete this record from the database"
    );
    if (result) {
      await deleteOrder(id);
    }
  };

  return (
    <div className="min-h-screen  bg-primary bg-pattern p-6">
      <div className="container mx-auto">
        <h1 className="text-5xl font-extrabold text-white text-center mb-6 animate-fadeIn">
          Orders Management
        </h1>

        <div className="justify-center items-center">
          <Link href="/orders/received">
            <button className=" bg-white text-black hover:bg-green-500 hover:text-white   p-10 rounded-lg mb-4 mr-4 justify-center items-center">
              <FaCar className="text-4xl" />

              <span> Received orders </span>
            </button>
          </Link>
          <Link href="/orders/delivered">
            <button className="bg-white text-black hover:bg-green-500 hover:text-white   p-10 rounded-lg mb-4 mr-4 justify-center items-center">
              <FaFlag className="text-4xl" />

              <span> delivered orders </span>
            </button>
          </Link>
          <Link href="/orders/new">
            <button className="bg-white text-black hover:bg-green-500 hover:text-white   p-10 rounded-lg mb-4 mr-4  justify-center items-center">
              <FaArrowCircleRight className="text-4xl" />
              <span> new orders </span>
            </button>
          </Link>
          <Link href="/orders">
            <button className="bg-white text-black hover:bg-green-500 hover:text-white   p-10 rounded-lg mb-4 mr-4 justify-center items-center">
              <FaList className="text-4xl" />
              <span> All orders </span>
            </button>
          </Link>
        </div>

        <div> {orders.length > 0 ? "Orders Management" : "no orders "}</div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 items-center justify-center">
          {orders?.map((order) => (
            <div
              key={order._id.toString()}
              className="bg-white    text-black shadow-md rounded-lg p-6   transform transition duration-300 hover:shadow-lg mt-10"
            >
              <div className="flex justify-start items-center">
                <h2 className="text-2xl font-semibold  mb-2">
                  {order.first_name} {order.last_name} -
                </h2>
                <FaPhone className="text-2xl font-semibold  mr-2" />
                <a
                  className="hover:text-green-500 text-2xl"
                  href={`tel:${order.phone}`}
                >
                  {" "}
                  {order.phone}{" "}
                </a>
              </div>
              <p className=" mb-4">
                <span className="font-bold">Order ID:</span>{" "}
                {order._id.toString()}
              </p>
              <div className="mb-4">
                <h3 className="text-lg font-medium  mb-5">
                  Items {order?.cart?.length}
                </h3>
                <div className="flex flex-col  list-disc pl-5 space-y-1 gap-10">
                  {order.cart?.map((item, index) => (
                    <div
                      key={index}
                      className=" text-2xl font-bold border-b   border-primary p-10"
                    >
                      {index + 1} - {item.name} -{item.size}- {item.crust}-{" "}
                      {item.price} X {item.amount}
                      <Image
                        src={item.image}
                        width={70}
                        height={70}
                        alt=""
                        sizes="(max-width:768) 100vw, 700px"
                      />
                      <div className="flex-1 xl:flex border border-black-500  list-disc pl-5 space-y-1 gap-10 justify-start items-center">
                        <h3 className="text-lg font-bold  mb-5">
                          additionalToppings:
                        </h3>
                        {item?.additionalTopping?.map((item, index) => (
                          <div key={index} className=" text-xl ">
                            {item.name} - ${item.price}
                            <Image
                              src={item.image}
                              width={70}
                              height={70}
                              alt=""
                              sizes="(max-width:768) 100vw, 700px"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-gray-800 text-lg font-semibold">
                Total Price: <span className="">${order.total.toFixed(2)}</span>
              </p>
              <div className=" text-lg font-medium gap-10">
                {order.status === "delivered" && (
                  <button
                    onClick={() => handleDeleteOrder(order._id)}
                    className="bg-red-700 text-white hover:bg-red-500 hover:text-white   p-10 rounded-lg mb-4 mr-4 "
                  >
                    delete Order
                  </button>
                )}
                {order.status === "received" && (
                  <button
                    onClick={() => handleDelivered(order._id)}
                    className="bg-green-400 text-black hover:bg-green-500 hover:text-white   p-10 rounded-lg mb-4 mr-4 "
                  >
                    Delivered successfully
                  </button>
                )}

                {order.status !== "received" &&
                  order.status !== "delivered" && (
                    <button
                      onClick={() => handleReceived(order._id)}
                      className="bg-green-400 text-black hover:bg-green-500 hover:text-white   p-10 rounded-lg mb-4 mr-4 "
                    >
                      Receive the order
                    </button>
                  )}

                <button className="bg-gray-500 text-white  p-10 rounded-lg mb-4 mr-4 ">
                  <span>
                    time:
                    <Moment locale="en" format="hh:mm:ss">
                      {order.date}
                    </Moment>
                  </span>{" "}
                  |
                  <span> {moment(order.date).startOf("minut").fromNow()} </span>
                </button>
                <button
                  onClick={() => alert("Receive the order")}
                  className="bg-gray-500 text-white  p-10 rounded-lg mb-4 mr-4 "
                >
                  date: <Moment format="YYYY/MM/DD">{order.date}</Moment>
                </button>

                {order.status === "delivered" && (
                  <button className="bg-green-500 text-white  p-10 rounded-full mb-4 mr-4  justify-center items-center">
                    <div className="items-center">
                      <FaCheckCircle className="text-5xl" />
                      <div>Delivered</div>
                    </div>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
