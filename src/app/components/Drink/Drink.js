"use client";
import { useState } from "react";

// image
import Image from "next/image";

//modal
import Modal from "react-modal";

//components
import DrinkDetails from "./DrinkDetails";

//icons
import { IoCloseOutline } from "react-icons/io5";

//bind modal to body
Modal.setAppElement("body");

//modal style
const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
};

const Drink = ({ drink }) => {
  // modal state
  const [modal, setModal] = useState(false);
  //open modal
  const openModal = () => {
    setModal(true);
  };
  //close modal
  const closeModal = () => {
    setModal(false);
  };
  return (
    <div
      dir="rtl"
      className="group py-2 px-4 xl:py-4 xl:px-2 rounded-xl font-Kufi-arabic"
    >
      <Image
        onClick={openModal}
        src={drink.image}
        alt="image"
        width={270}
        height={270}
        priority={1}
        className="lg:group-hover:translate-y-3 transition-all duration-300 mb-8 cursor-pointer"
        sizes="(max-width:768) 100vw, 700px"
      />

      {/* title */}
      <div className="text-xl font-bold mb-3 capitalize cursor-pointer">
        <div>{drink.name}</div>
      </div>

      {/* description */}
      {drink.description && (
        <div className="text-sm font-medium min-h-[60px] mb-6">
          {drink.description}
        </div>
      )}

      {/* price & button */}
      <div className="mb-6 flex items-center justify-between">
        {/* price hidden (sm)  - visible  (lg)  */}
        <div className="hidden lg:flex text-xl font-semibold items-center justify-center gap-1">
          {drink.priceSm} <span className="text-sm text-gray-700"> SAR</span>
        </div>
        {/* btn  hidden (sm)  - visible  (lg)  */}
        <button
          onClick={openModal}
          className="hidden xl:flex gradient text-white rounded-lg btn-sm font-semibold text-sm"
        >
          {/* Choose */}
          اختر
        </button>
        {/* btn  visible (sm)  - hidden  (lg)  */}
        <button
          onClick={openModal}
          className="btn btn-sm gradient text-sm lg:hidden px-3"
        >
          stats at {drink.priceSm}
        </button>
      </div>

      {/* Modal */}
      {modal && (
        <Modal
          isOpen={modal}
          style={modalStyles}
          onRequestClose={closeModal}
          contentLabel="Pizza Modal"
          className="bg-white w-full h-full lg:max-w-[950px] lg:max-h-[700px] lg:rounded-[30px] 
          lg:fixed lg:top-[50%] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[-50%] outline-none"
        >
          {/* close modal icon  */}
          <div className="absolute z-30 right-2 top-2">
            <IoCloseOutline
              onClick={closeModal}
              className="text-4xl text-orange hover:scale-110 duration-200 cursor-pointer"
            />
          </div>

          {/* pizza details  */}
          <DrinkDetails drink={drink} modal={modal} setModal={setModal} />
        </Modal>
      )}
    </div>
  );
};

export default Drink;
