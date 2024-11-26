"use client";
import Image from "next/image";
import React from "react";
const Orders = ({ orders }) => {
  return (
    <div className="min-h-screen bg-primary bg-pattern p-6">
      <div className="container mx-auto">
        <h1 className="text-5xl font-extrabold text-white text-center mb-6 animate-fadeIn">
          {orders.length > 0 ? "Orders Management" : "no"}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 items-center justify-center">
          {orders.map((order) => (
            <div
              key={order._id.toString()}
              className="bg-white text-black shadow-md rounded-lg p-6 hover:scale-105 transform transition duration-300 hover:shadow-lg mt-10"
            >
              <h2 className="text-2xl font-semibold  mb-2">
                {order.first_name} {order.last_name}
              </h2>
              <p className=" mb-4">
                <span className="font-bold">Order ID:</span>{" "}
                {order._id.toString()}
              </p>
              <div className="mb-4">
                <h3 className="text-lg font-medium  mb-5">
                  Items & Quantities {order?.cart?.length}
                </h3>
                <div className="flex flex-col  list-disc pl-5 space-y-1 gap-10">
                  {order.cart?.map((item, index) => (
                    <div
                      key={index}
                      className=" text-2xl font-bold border-b   border-primary p-10"
                    >
                      {index + 1} - {item.name} -{item.size}- {item.crust}-{" "}
                      {item.price} X {item.amount}
                      <Image src={item.image} width={70} height={70} alt="" />
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
              <div>
                <button className="bg-green-600 text-white text-3xl p-10 rounded-lg ">
                  change to complete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
