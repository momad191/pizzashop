"use client";
import { useState, useEffect, useContext } from "react";
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

  const [formErrors, setFormErrors] = useState({});

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

    setFormErrors({
      ...formErrors,
      [e.target.name]: "", // Clear error when user modifies input
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.first_name.trim())
      errors.first_name = "First name is required.";
    if (!formData.last_name.trim()) errors.last_name = "Last name is required.";
    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format.";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Phone number must be 10 digits.";
    }
    if (!formData.street_name.trim())
      errors.street_name = "Street name is required.";
    if (!formData.street_no.trim())
      errors.street_no = "Street number is required.";
    if (!formData.block.trim()) errors.block = "Block is required.";
    if (!formData.floor.trim()) errors.floor = "Floor is required.";
    if (!formData.apt_no.trim())
      errors.apt_no = "Apartment number is required.";
    return errors;
  };

  // async function onSubmit(event) {
  //   event.preventDefault();
  //   const errors = validateForm();
  //   if (Object.keys(errors).length > 0) {
  //     setFormErrors(errors);
  //     return;
  //   }

  //   try {
  //     await creatOrder(formData, cart, cartTotal); // Pass cart as second parameter
  //     setSuccessMsg(true);
  //   } catch (e) {
  //     console.error(e);

  //     setError("Failed to place the order. Please try again.");
  //   }
  // }

  async function onSubmit(event) {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      await creatOrder(formData, cart, cartTotal);

      // ✅ Build WhatsApp message
      let orderMessage = `🛒 *طلب جديد*%0A%0A`;
      orderMessage += `👤 الاسم: ${formData.first_name} ${formData.last_name}%0A`;
      orderMessage += `📞 رقم الهاتف: ${formData.phone}%0A`;
      orderMessage += `📧 الايميل: ${formData.email}%0A%0A`;
      orderMessage += `📍 العنوان: شارع ${formData.street_name}, رقم ${formData.street_no}, مبنى ${formData.block}, طابق ${formData.floor}, شقة ${formData.apt_no}%0A`;
      if (formData.mentions) {
        orderMessage += `📝 ملاحظات: ${formData.mentions}%0A`;
      }
      orderMessage += `%0A📦 *تفاصيل الطلب*:%0A`;
      cart.forEach((item) => {
        orderMessage += `- ${item.name} x${item.amount} = $${(
          item.price * item.amount
        ).toFixed(2)}%0A`;
      });
      orderMessage += `%0A💰 الاجمالي: $${parseFloat(cartTotal).toFixed(2)}%0A`;

      // ✅ Add location link if available
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const locationUrl = `https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`;
          orderMessage += `%0A📍 الموقع: ${locationUrl}`;

          // Replace with your WhatsApp number (with country code, no + or spaces)
          const phoneNumber = "966551203580"; // example: "96512345678"
          const whatsappUrl = `https://wa.me/${phoneNumber}?text=${orderMessage}`;

          window.open(whatsappUrl, "_blank"); // Open WhatsApp
        });
      } else {
        const phoneNumber = "966551203580";
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${orderMessage}`;
        window.open(whatsappUrl, "_blank");
      }

      setSuccessMsg(true);
    } catch (e) {
      console.error(e);
      setError("Failed to place the order. Please try again.");
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
    <div className="w-full h-full font-Kufi-arabic p-4">
      {error !== "" && (
        <div className=" flex flex-col-2 gap-3 items-center justify-center bg-red-500 border border-white p-4 rounded-xl">
          <FaCheckCircle className="text-5xl text-white/80 " />
          <h4 className="text-white text-2xl font-bold ">{error}</h4>
        </div>
      )}

      {successMsg && (
        <div className="flex flex-col justify-center items-center h-[100vh] lg:h-[600px] px-6">
          <h2 className="text-2xl font-semibold text-center ">
            {/* Thank you! The order has been placed! */}
            شكراً لك! تم تقديم الطلب!
          </h2>
          <Image
            src={"/success-1.gif"}
            width={500}
            height={500}
            alt="Success Animation"
            unoptimized
          />
          {/* <div>
            The window will be close in <span>{count}</span>seconds
          </div> */}

          <div>
            سيتم اغلاق النافذة خلال <span>{count}</span>ثانية
          </div>
        </div>
      )}

      <div className="lg:gap-x-8 w-full lg:px-12 lg:py-8">
        {/* title  */}
        {/* <h2 className="mb-6 text-[20px] uppercase font-extrabold text-center lg:text-left pt-6 lg:pt-0 ">
          Shipping & checkout
        </h2> */}
        <h2 className="mb-6 text-[20px] uppercase font-extrabold text-center lg:text-right pt-6 lg:pt-0 ">
          الدفع والتوصيل
        </h2>

        <form
          dir="rtl"
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
                  placeholder="الاسم الاول"
                  name="first_name"
                  id="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                />
                {formErrors.first_name && (
                  <p className="text-red-500">{formErrors.first_name}</p>
                )}

                <input
                  type="text"
                  className="w-full input"
                  placeholder="الاسم الاخير"
                  name="last_name"
                  id="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
                {formErrors.last_name && (
                  <p className="text-red-500">{formErrors.last_name}</p>
                )}
              </div>

              {/* phone &  email  */}
              <div className="flex flex-col lg:flex-row justify-between gap-4 lg:gap-0 lg:gap-x-4">
                <input
                  type="text"
                  className="w-full input"
                  placeholder="رقم الجوال "
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {formErrors.phone && (
                  <p className="text-red-500">{formErrors.phone}</p>
                )}
                <input
                  type="text"
                  className="w-full input"
                  placeholder="ايميلك"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {formErrors.email && (
                  <p className="text-red-500">{formErrors.email}</p>
                )}
              </div>

              {/* street name &  street no  */}
              <div className="flex flex-col lg:flex-row justify-between gap-4 lg:gap-0 lg:gap-x-4">
                <input
                  type="text"
                  className="w-full input"
                  placeholder="اسم الشارع"
                  name="street_name"
                  id="street_name"
                  value={formData.street_name}
                  onChange={handleChange}
                />
                {formErrors.street_name && (
                  <p className="text-red-500">{formErrors.street_name}</p>
                )}
                <input
                  type="text"
                  className="w-full input"
                  placeholder="رقم الشارع"
                  name="street_no"
                  id="street_no"
                  value={formData.street_no}
                  onChange={handleChange}
                />
                {formErrors.street_no && (
                  <p className="text-red-500">{formErrors.street_no}</p>
                )}
              </div>
              {/* block floor &  apartment  */}
              <div className="flex justify-between gap-x-4">
                <input
                  type="text"
                  className="w-full input"
                  placeholder="المبنى"
                  name="block"
                  id="block"
                  value={formData.block}
                  onChange={handleChange}
                />
                {formErrors.block && (
                  <p className="text-red-500">{formErrors.block}</p>
                )}
                <input
                  type="text"
                  className="w-full input"
                  placeholder="الطابق"
                  name="floor"
                  id="floor"
                  value={formData.floor}
                  onChange={handleChange}
                />
                {formErrors.floor && (
                  <p className="text-red-500">{formErrors.floor}</p>
                )}
                <input
                  type="text"
                  className="w-full input"
                  placeholder="رقم الشقة"
                  name="apt_no"
                  id="apt_no"
                  value={formData.apt_no}
                  onChange={handleChange}
                />
                {formErrors.apt_no && (
                  <p className="text-red-500">{formErrors.apt_no}</p>
                )}
              </div>
              {/* textarea  */}
              <div className="flex-1 h-full">
                <textarea
                  className="textarea w-full h-full"
                  placeholder="ملاحظة (اختياري)"
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
              {/* <h3 className="text-base font-extrabold uppercase mb-4 border-b pd-4 ">
                Your order
              </h3> */}

              <h3 className="text-base font-extrabold uppercase mb-4 border-b pd-4 ">
                طلبك
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
              {/* <span className=" font-extrabold text-black/90">
                total: ${parseFloat(cartTotal).toFixed(2)}
              </span> */}
              <span className=" font-extrabold text-black/90">
                المبلغ: ${parseFloat(cartTotal).toFixed(2)}
              </span>
            </div>
            {/* place order button  */}
            {/* <button type="submit" className="btn btn-lg gradient w-full">
              place order
            </button> */}
            <button type="submit" className="btn btn-lg gradient w-full">
              اكمل الطلب
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutDetails;
