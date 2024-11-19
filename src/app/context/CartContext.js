"use client";
import { createContext, useState } from "react";

// creat context
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  // cart open state
  const [isOpen, setIsOpen] = useState(false);

  //cart state
  const [cart, setCart] = useState([]);

  const addToCart = (
    id,
    image,
    name,
    price,
    additionalTopping,
    size,
    crust
  ) => {
    // console.log(id, image, name, price, additionalTopping, size, crust);

    // sort additionaltopping by name
    additionalTopping.sort((a, b) => a.name.localeCompare(b.name));

    const newItem = {
      id,
      image,
      name,
      price,
      additionalTopping,
      size,
      crust,
      amount: 1,
    };

    const cartItemIndex = cart.findIndex(
      (item) =>
        item.id === id &&
        item.price === price &&
        item.size === size &&
        item.size === size &&
        // check if additionaltopping array is equal
        JSON.stringify(item.additionalTopping) ===
          JSON.stringify(item.additionalTopping) &&
        item.crust === crust
    );

    setCart([...cart, newItem]);

    // open the cart every time you add a product
    setIsOpen(true);
  };

  return (
    <CartContext.Provider value={{ isOpen, setIsOpen, addToCart, cart }}>
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;
