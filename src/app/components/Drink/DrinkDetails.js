"use client";
import { useState, useEffect, useContext } from "react";
// Next Image
import Image from "next/image";

//componentss
import SizeSelection from "./SizeSelection";
import Topping from "../Topping";

//context
import { CartContext } from "../../context/CartContext";

const DrinkDetails = ({ drink, setModal }) => {
  // pizza size state
  const [size, setSize] = useState("small");
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
        drink.priceSm + additionalToppingPrice
      ).toFixed(2);
    } else if (size === "medium") {
      calculatedPrice = parseFloat(
        drink.priceMd + additionalToppingPrice
      ).toFixed(2);
    } else if (size === "large") {
      calculatedPrice = parseFloat(
        drink.priceLg + additionalToppingPrice
      ).toFixed(2);
    }

    setPrice(calculatedPrice);
  }, [
    size,
    drink.priceSm,
    drink.priceMd,
    drink.priceLg,
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
    <div className="flex flex-col lg:flex-row lg:gap-x-8 h-full md:p-10 font-Kufi-arabic">
      {/* top */}
      <div className="lg:flex-1 flex justify-center items-center">
        {/* drink image  */}
        <div className="max-w-[300px] lg:max-w-none mt-0 lg:mt-0">
          <Image
            width={450}
            height={450}
            sizes="(max-width:768) 100vw, 700px"
            src={drink.image}
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
              <h2 className="capitalize text-3xl mb-1">{drink.name}</h2>
              {/* Size and crust text */}
              <div className="mb-6 text-lg font-medium">
                <span>
                  {size === "small"
                    ? "66 millimeters"
                    : size === "medium"
                    ? "1Liter "
                    : size === "large"
                    ? "2.25Liter"
                    : null}
                </span>
              </div>
            </div>
            {/* Size selection */}
            <SizeSelection drink={drink} size={size} setSize={setSize} />
          </div>
          <div></div>
        </div>
        {/* add to cart button   */}
        <div className="h-full flex items-center px-2 lg:items-end">
          <button
            onClick={() => {
              addToCart(
                drink.id,
                drink.image,
                drink.name,
                price,
                additionalTopping,
                size
              );
              setModal(false);
            }}
            className="btn btn-lg gradient w-full flex justify-center gap-x-2 "
          >
            {/* <div>Add to cart for</div>
            <div> $ {price}</div> */}
            <div>اضف للطلب </div>
            <div> SAR {price}</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DrinkDetails;
