"use client";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { IoCloseOutline } from "react-icons/io5";

const CartTop = () => {
  const { setIsOpen } = useContext(CartContext);
  return (
    <div className="w-full h-20 border-b flex items-center justify-between px-10">
      {/* shopping bag text */}
      <div className="font-semibold">Shopping Bag (3)</div>
      {/* close icon  */}
      <div onClick={() => setIsOpen(false)} className="cursor-pointer group">
        <IoCloseOutline className="text-4xl group-hover:scale-110 duration-300 transition-all" />
      </div>
    </div>
  );
};

export default CartTop;
