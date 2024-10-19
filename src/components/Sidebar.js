import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowForward } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import CartItem from "../components/CartItem";
import { SidebarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";
import { SlBasket } from "react-icons/sl";

const Sidebar = () => {
  const { isOpen, handleClose } = useContext(SidebarContext);
  const { cart, clearCart, total, itemAmount } = useContext(CartContext);

  return (
    <div
      className={`${
        isOpen ? 'right-0' : '-right-full'
      } w-full bg-white fixed top-0 h-full shadow-2xl 
      md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}
    >
      {/* Header */}
      <div className="flex items-center justify-between py-6 border-b">
        <div className="uppercase text-sm font-semibold">
          Shopping Bag ({itemAmount})
        </div>
        <div
          onClick={handleClose}
          className="cursor-pointer w-8 h-8 flex justify-center items-center"
        >
          <IoMdArrowForward className="text-2xl" />
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex flex-col gap-y-2 overflow-y-auto overflow-x-hidden h-[calc(100vh-300px)] border-b mb-5">
        {cart.length > 0 ? (
          cart.map((item) => <CartItem item={item} key={item.id} />)
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
              <SlBasket className="h-24 w-24 text-gray-400 mb-4" />
              <h2 className="text-lg font-semibold mb-2">Your Cart is Empty</h2>
              <p className="text-gray-500 mb-4">Looks like you haven't added anything to your cart yet.</p>
              <Link to={"/"} onClick={handleClose} className='bg-primary py-4 px-8 text-white'>Continue Shopping</Link>
            </div>
          </div>
        )}
      </div>

      {/* Total and Checkout */}
      {cart.length > 0 && (
        <div className="flex flex-col gap-y-3 py-4 bg-white absolute bottom-0 left-0 w-full px-4">
          <div className="flex w-full justify-between items-center">
            <div className="uppercase font-semibold">
              <span className="mr-2">Total:</span>$ {parseFloat(total).toFixed(2)}
            </div>
            <div
              onClick={clearCart}
              className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 
                flex justify-center items-center text-xl"
            >
              <FiTrash2 />
            </div>
          </div>
          <Link
            to="/"
            className="bg-gray-200 flex p-4 items-center justify-center text-primary w-full font-medium"
          >
            View Cart
          </Link>
          <Link
            to="/checkout"
            className="bg-primary flex p-4 items-center justify-center text-white w-full font-medium"
          >
            Checkout
          </Link>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
