"use client";
import react, { useState } from "react";

// image
import Image from "next/image";

//modal
import Modal from "react-modal";

//components
import PizzaDetails from "./PizzaDetails";

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

const Pizza = ({ pizza }) => {
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
    <div className="group py-2 px-4 xl:py-4 xl:px-2 rounded-xl">
      <Image
        onClick={openModal}
        src={pizza.image}
        alt="image"
        width={270}
        height={270}
        priority={1}
        className="lg:group-hover:translate-y-3 transition-all duration-300 mb-8 cursor-pointer"
        sizes="(max-width:768) 100vw, 700px"
      />

      {/* title */}
      <div className="text-xl font-bold mb-3 capitalize cursor-pointer">
        <div>{pizza.name}</div>
      </div>

      {/* description */}
      <div className="text-sm font-medium min-h-[60px] mb-6">
        {pizza.description}
      </div>
      {/* price & button */}
      <div className="mb-6 flex items-center justify-between">
        {/* price hidden (sm)  - visible  (lg)  */}
        <div className="hidden lg:flex text-xl font-semibold">
          {pizza.priceSm}
        </div>
        {/* btn  hidden (sm)  - visible  (lg)  */}
        <button
          onClick={openModal}
          className="hidden xl:flex gradient text-white rounded-lg btn-sm font-semibold text-sm"
        >
          Choose
        </button>
        {/* btn  visible (sm)  - hidden  (lg)  */}
        <button
          onClick={openModal}
          className="btn btn-sm gradient text-sm lg:hidden px-3"
        >
          stats at {pizza.priceSm}
        </button>
      </div>
      {/* Modal */}
      {modal && (
        <Modal
          isOpen={modal}
          style={modalStyles}
          onRequestClose={closeModal}
          contentLabel="Pizza Modal"
          className="bg-white w-full h-full lg:max-w-[900px] lg:max-h-[600px] lg:rounded-[30px] 
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
          <PizzaDetails pizza={pizza} modal={modal} setModal={setModal} />
        </Modal>
      )}
    </div>
  );
};

export default Pizza;
