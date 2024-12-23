import  { useContext, useState } from "react";

//icons
import { IoCloseOutline } from "react-icons/io5";

//components
import CheckoutDetails from "./CheckoutDetails";

// modal
import Modal from "react-modal";

//context
import { CartContext } from "../context/CartContext";

// modal styles

const modaStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0,5)",
  },
};

// bind modal to body
Modal.setAppElement("Body");

const CartBottom = () => {
  const { setIsOpen, cart, cartTotal } = useContext(CartContext);
  // modal state
  const [modal, setModal] = useState(false);

  // open modal

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  return (
    <>
      {cart.length >= 1 ? (
        <div className="px-6 py-3 lg:py-6 mt-auto">
          {/* totla price  */}
          <div className="flex justify-between items-center mb-6 text-lg font-semibold font-robotoCondensed">
            <div>Totla:</div>
            <div>${parseFloat(cartTotal).toFixed(2)}</div>
          </div>
          {/* btn  */}
          <div className="flex flex-col gap-y-3 ">
          <button
            onClick={() => {
              setIsOpen(false);
              openModal();
            }}
            className="btn btn-lg gradient font-semibold flex justify-center"
          >
            Checkout
          </button>
          </div>
        </div>
      ) : (
        <div className="absolute top-0 w-full h-full flex justify-center items-center z-10">
          <div className="font-semibold"> Your cart is empty</div>
        </div>
      )}
      {/* checkout modal  */}
      {modal && (
        <Modal
          className="bg-white w-full h-full lg:max-w-[900px] lg:max-h-[600px] lg:rounded-[30px] lg:fixed lg:top-[50%] lg:left-[50%] lg:translate-x-[-50%] 
          lg:translate-y-[-50%] outline-none
          "
          isOpen={modal}
          style={modaStyles}
          onRequestClose={closeModal}
          contentLabel="checkout modal"
        >
          <div
            onClick={closeModal}
            className="absolute z-30 right-2 top-2 hover:scale-110 duration-200 cursor-pointer"
          >
            <IoCloseOutline className="text-4xl text-orange" />
          </div>
          <CheckoutDetails setModal={setModal} />
        </Modal>
      )}
    </>
  );
};

export default CartBottom;
