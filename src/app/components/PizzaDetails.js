"use client";
import { useState, useEffect, useContext } from "react";
// Next Image
import Image from "next/image";

//componentss
import SizeSelection from "./SizeSelection";
import CrustSelection from "./CrustSelection";
import Topping from "./Topping";

//context
import { CartContext } from "../context/CartContext";

const PizzaDetails = ({ pizza, setModal }) => {
  // pizza size state
  const [size, setSize] = useState("small");
  //pizza crust state
  const [crust, setCrust] = useState("traditional");
  //pizza additional topping state
  const [additionalTopping, setAdditionalTopping] = useState([]);

  //pizza additional topping pice state
  const [additionalToppingPrice, setAdditionalToppingPrice] = useState(0);

  // pice state
  const [price, setPrice] = useState(0);

  const { addToCart } = useContext(CartContext);

  // console.log(additionalTopping);

  // set the price based on the pizza size
  useEffect(() => {
    let calculatedPrice = 0;

    if (size === "small") {
      calculatedPrice = parseFloat(
        pizza.priceSm + additionalToppingPrice
      ).toFixed(2);
    } else if (size === "medium") {
      calculatedPrice = parseFloat(
        pizza.priceMd + additionalToppingPrice
      ).toFixed(2);
    } else if (size === "large") {
      calculatedPrice = parseFloat(
        pizza.priceLg + additionalToppingPrice
      ).toFixed(2);
    }

    setPrice(calculatedPrice);
  }, [
    size,
    pizza.priceSm,
    pizza.priceMd,
    pizza.priceLg,
    additionalToppingPrice,
    additionalTopping,
  ]);

  useEffect(() => {
    if (additionalTopping.length > 0) {
      const toppingPrice = additionalTopping.reduce((a, c) => {
        return a + c.price;
      }, 0);
      setAdditionalToppingPrice(toppingPrice);
    } else {
      setAdditionalToppingPrice(0);
    }
  }, [additionalTopping]);

  return (
    <div className="flex flex-col lg:flex-row lg:gap-x-8 h-full md:p-10">
      {/* top */}
      <div className="lg:flex-1 flex justify-center items-center">
        {/* pizza image  */}
        <div className="max-w-[300px] lg:max-w-none mt-0 lg:mt-0">
          <Image
            width={450}
            height={450}
            sizes="(max-width:768) 100vw, 700px"
            src={pizza.image}
            alt=""
            priority={1}
            className="mx-auto relative"
          />
        </div>
      </div>
      {/* details  */}
      <div className="flex flex-col flex-1">
        <div className="flex-1 p-x text-center lg:text-left">
          <div className="flex-1 bg-white overflow-y-scroll h-[44vh] lg:h-[64vh] scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-white pr-2">
            {/* name */}
            <div className="font-semibold">
              <h2 className="capitalize text-3xl mb-1">{pizza.name}</h2>
              {/* Size and crust text */}
              <div className="mb-6 text-lg font-medium">
                <span>
                  {size === "small"
                    ? "25cm"
                    : size === "medium"
                    ? "30cm"
                    : size === "large"
                    ? "35cm"
                    : null}
                </span>
                <span>, {crust} crust</span>
              </div>
            </div>
            {/* Size selection */}
            <SizeSelection pizza={pizza} size={size} setSize={setSize} />
            {/* crust selection */}
            <CrustSelection crust={crust} setCrust={setCrust} />
            {/* toppings */}
            <div className="mb-4 text-xl font-semibold ">Choose topping</div>
            {/* toppings List */}
            <div className="flex flex-1 flex-wrap gap-2 py-1 justify-center lg:justify-start">
              {pizza.toppings?.map((topping, index) => {
                return (
                  <Topping
                    topping={topping}
                    additionalTopping={additionalTopping}
                    setAdditionalTopping={setAdditionalTopping}
                    key={index}
                  />
                );
              })}
            </div>
          </div>
          <div></div>
        </div>
        {/* add to cart button   */}
        <div className="h-full flex items-center px-2 lg:items-end">
          <button
            onClick={() => {
              addToCart(
                pizza.id,
                pizza.image,
                pizza.name,
                price,
                additionalTopping,
                size,
                crust
              );
              setModal(false);
            }}
            className="btn btn-lg gradient w-full flex justify-center gap-x-2 "
          >
            <div>Add to cart for</div>
            <div> $ {price}</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaDetails;
