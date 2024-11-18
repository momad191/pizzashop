"use client";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

//components
import CartTop from "./CartTop";
import CartBottom from "./CartBottom";
import CartItem from "./CartItem";

const CartMobile = () => {
  const { cart, isOpen } = useContext(CartContext);
  return (
    <div
      className={`${
        isOpen ? "bottom-0" : "-bottom-full"
      } bg-white fixed w-full h-full left-0 z-20 transition-all duration-300 lg:hidden flex flex-col `}
    >
      {/* top */}
      <CartTop />

      {/* cart items  */}
      <div>
        {cart?.map((pizza, index) => {
          return <CartItem pizza={pizza} key={index} />;
        })}
      </div>
      {/* cart bottom  */}
      <CartBottom />
    </div>
  );
};

export default CartMobile;
