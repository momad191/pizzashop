"use client";
import react, { useState, useEffect, useContext } from "react";
import { creatOrder } from "../actions/order";

import { FaCheckCircle } from "react-icons/fa";

// next image
import Image from "next/image";

// context
import { CartContext } from "../context/CartContext";

const CheckoutDetails = ({ setModal }) => {
  const { cart, setCart, cartTotal } = useContext(CartContext);
  // console.log(cart);

  const [successMsg, setSuccessMsg] = useState(false);
  const [count, setCount] = useState(5);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    street_name: "",
    street_no: "",
    block: "",
    floor: "",
    apt_no: "",
    mentions: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function onSubmit(event) {
    event.preventDefault();

    try {
      await creatOrder(formData, cart, cartTotal); // Pass cart as second parameter
      setSuccessMsg(true);
    } catch (e) {
      console.error(e);
      setError("Check your credentials");
    }
  }

  //counter
  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => {
        if (count > 1) {
          setCount(count - 1);
        }
      }, 1000);
      //clear timer
      return () => clearTimeout(timer);
    }
  });

  //close modal after 5 sec
  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => {
        setSuccessMsg(false);
        //clean cart
        setCart([]);
        //close modal
        setModal(false);
      }, 5000);
      //clean timer
      return () => clearTimeout(timer);
    }
  }, [successMsg, setCart, setModal]);

  return (
    <div>
      {error !== "" && (
        <div className=" flex flex-col-2 gap-3 items-center justify-center bg-red-500 border border-white p-4 rounded-xl">
          <FaCheckCircle className="text-5xl text-white/80 " />
          <h4 className="text-white text-2xl font-bold ">{error}</h4>
        </div>
      )}

      {successMsg && (
        <div className="flex flex-col justify-center items-center h-[100vh] lg:h-[600px] px-6">
          <h2 className="text-2xl font-semibold text-center ">
            Thank you! The order has been placed!
          </h2>
          <Image
            src={"/success-1.gif"}
            width={500}
            height={500}
            alt="Success Animation"
            unoptimized
          />
          <div>
            The window will be close in <span>{count}</span>seconds
          </div>
        </div>
      )}

      <div className="lg:gap-x-8 w-full lg:px-12 lg:py-8">
        {/* title  */}
        <h2 className="mb-6 text-[20px] uppercase font-extrabold text-center lg:text-left pt-6 lg:pt-0 ">
          Shipping & checkout
        </h2>
        <form
          onSubmit={onSubmit}
          className="h-[86vh] lg:h-[47.5vh] flex flex-col lg:flex-row lg:gap-x-4"
        >
          {/* box1  */}
          <div className=" flex-1 h-full overflow-y-auto lg:overflow-visible py-4 px-8 lg:py-0 lg:px-0">
            {/* input wrapper */}
            <div className="flex flex-col gap-4 h-full">
              {/* first name & last name  */}
              <div className="flex flex-col lg:flex-row justify-between gap-4 lg:gap-0 lg:gap-x-4">
                <input
                  type="text"
                  className="w-full input"
                  placeholder="first name"
                  name="first_name"
                  id="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  className="w-full input"
                  placeholder="last name"
                  name="last_name"
                  id="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </div>

              {/* phone &  email  */}
              <div className="flex flex-col lg:flex-row justify-between gap-4 lg:gap-0 lg:gap-x-4">
                <input
                  type="text"
                  className="w-full input"
                  placeholder="phone"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  className="w-full input"
                  placeholder="Email Address"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* street name &  street no  */}
              <div className="flex flex-col lg:flex-row justify-between gap-4 lg:gap-0 lg:gap-x-4">
                <input
                  type="text"
                  className="w-full input"
                  placeholder="Street name"
                  name="street_name"
                  id="street_name"
                  value={formData.street_name}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  className="w-full input"
                  placeholder="Street No"
                  name="street_no"
                  id="street_no"
                  value={formData.street_no}
                  onChange={handleChange}
                />
              </div>
              {/* block floor &  apartment  */}
              <div className="flex justify-between gap-x-4">
                <input
                  type="text"
                  className="w-full input"
                  placeholder="Block"
                  name="block"
                  id="block"
                  value={formData.block}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  className="w-full input"
                  placeholder="Floor"
                  name="floor"
                  id="floor"
                  value={formData.floor}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  className="w-full input"
                  placeholder="Apt. No"
                  name="apt_no"
                  id="apt_no"
                  value={formData.apt_no}
                  onChange={handleChange}
                />
              </div>
              {/* textarea  */}
              <div className="flex-1 h-full">
                <textarea
                  className="textarea w-full h-full"
                  placeholder="Mentions (optional)"
                  name="mentions"
                  id="mentions"
                  value={formData.mentions}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </div>

          {/* box2 */}
          <div className=" flex-1 h-full lg:max-w-[40%] flex flex-col justify-between pt-3 px-8 lg:p-0 ">
            <div className="border rounded-lg flex flex-col mb-4 p-4 h-full">
              <h3 className="text-base font-extrabold uppercase mb-4 border-b pd-4 ">
                Your order
              </h3>
              {/* items  */}
              <div className="overflow-y-scroll overflow-hidden scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-white-200 font-semibold flex flex-col gap-y-4 h-[240px] py-200">
                {cart.map((pizza, index) => {
                  return (
                    <div
                      className="flex justify-between text-[15px]"
                      key={index}
                    >
                      <div className="flex gap-x-2">
                        <div className="capitalize"> {pizza.name}</div>
                        <div> {pizza.amount > 1 && `x ${pizza.amount}`} </div>
                      </div>
                      <div>
                        ${parseFloat(pizza.price * pizza.amount).toFixed(2)}
                      </div>
                    </div>
                  );
                })}
              </div>
              <hr className="border border-primary border-dashed mb-2" />
              <span className=" font-extrabold text-black/90">
                total: ${parseFloat(cartTotal).toFixed(2)}
              </span>
            </div>
            {/* place order button  */}
            <button type="submit" className="btn btn-lg gradient w-full">
              place order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutDetails;
