"use client";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { IoCloseOutline } from "react-icons/io5";
import { IoArrowForwardSharp } from "react-icons/io5";

const CartTop = () => {
  const { isOpen, setIsOpen, itemAmount } = useContext(CartContext);

  return (
    <div className="w-full h-20 border-b flex items-center justify-between px-10">
      {/* shopping bag text */}
      {/* <div className="font-semibold">Shopping Bag ({itemAmount})</div> */}
      <div className="font-semibold">الطلبات ({itemAmount})</div>

      {/* close icon  */}
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer group">
        <IoCloseOutline
          onClick={() => setIsOpen(!isOpen)}
          className="text-4xl group-hover:scale-110 duration-300 transition-all"
        />
      </div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className=" flex items-center justify-center cursor-pointer group group-hover:scale-110 duration-300 transition-all"
      >
        {/* Continu shopping */}
        متابعة الاختيار
        <IoArrowForwardSharp
          onClick={() => setIsOpen(!isOpen)}
          className="text-4xl group-hover:scale-110 duration-300 transition-all mr-5"
        />
      </div>
    </div>
  );
};

export default CartTop;
