import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { CartContext } from "../contexts/CartContext";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cart, total, clearCart } = useContext(CartContext);
  const [deliveryOption, setDeliveryOption] = useState("standard");
  const [discount, setDiscount] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleCouponApply = () => {
    if (coupon === "SARAN") {
      setDiscount(10);
      setCouponApplied(true);
      setSnackbar({
        open: true,
        message: "Coupon applied successfully!",
        severity: "success",
      });
    } else {
      setSnackbar({
        open: true,
        message: "Invalid coupon code!",
        severity: "error",
      });
    }
  };

  const onSubmit = (data) => {
    // Clear the form fields
    reset();

    // Clear the cart
    clearCart();

    // Navigate to the order success page
    navigate("/order-success");
  };

  const handleSnackbarClose = () => {
    setSnackbar((prevState) => ({ ...prevState, open: false }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6 pt-32">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg flex flex-wrap">
        {/* Shipping Information Section */}
        <div className="w-full sm:w-2/3 p-3 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
            Checkout
          </h2>

          <h3 className="text-lg font-semibold mb-3">Shipping Information</h3>

          {/* Delivery or Pickup Toggle */}
          <div className="flex flex-wrap mb-4 sm:mb-6">
            <button
              onClick={() => setDeliveryOption("standard")}
              className={`flex-1 py-3 px-2 sm:px-4 text-center border ${
                deliveryOption === "standard"
                  ? "border-black"
                  : "border-gray-300"
              } rounded-md mr-3 mb-3 sm:mb-0`}
            >
              <i className="fas fa-truck mr-2"></i> Standard Shipping
            </button>
            <button
              onClick={() => setDeliveryOption("express")}
              className={`flex-1 py-3 px-2 sm:px-4 text-center border ${
                deliveryOption === "express"
                  ? "border-black"
                  : "border-gray-300"
              } rounded-md mr-3 mb-3 sm:mb-0`}
            >
              <i className="fas fa-shipping-fast mr-2"></i> Express Shipping
            </button>
            <button
              onClick={() => setDeliveryOption("store")}
              className={`flex-1 py-3 px-2 sm:px-4 text-center border ${
                deliveryOption === "store" ? "border-black" : "border-gray-300"
              } rounded-md`}
            >
              <i className="fas fa-store mr-2"></i> Store Collection
            </button>
          </div>

          {/* Shipping Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Full name *
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Full name is required" })}
                className="w-full border-gray-300 rounded-md shadow-sm p-3"
                placeholder="Enter full name"
              />
              {errors.name && (
                <p className="text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email address *
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full border-gray-300 rounded-md shadow-sm p-3"
                placeholder="Enter email address"
              />
              {errors.email && (
                <p className="text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="phone">
                Phone number *
              </label>
              <div className="flex">
                <span className="flex items-center justify-center px-4 border border-gray-300 bg-gray-50 text-sm">
                  🇮🇳
                </span>
                <input
                  type="tel"
                  id="phone"
                  {...register("phone", {
                    required: "Phone number is required",
                    minLength: {
                      value: 10,
                      message: "Minimum 10 digits required",
                    },
                  })}
                  className="w-full border-gray-300 rounded-r-md shadow-sm p-3"
                  placeholder="Enter phone number"
                />
              </div>
              {errors.phone && (
                <p className="text-red-600">{errors.phone.message}</p>
              )}
            </div>

            {/* Other fields */}
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="country"
              >
                Country *
              </label>
              <select
                id="country"
                {...register("country", { required: "Country is required" })}
                className="w-full border-gray-300 rounded-md shadow-sm p-3"
              >
                <option value="">Choose country</option>
                <option value="IND">India</option>
                {/* Add more countries as needed */}
              </select>
              {errors.country && (
                <p className="text-red-600">{errors.country.message}</p>
              )}
            </div>

            {/* Terms and conditions */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                {...register("terms", {
                  required: "You must accept the terms and conditions",
                })}
                className="h-4 w-4 text-black border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 text-sm">
                I have read and agree to the Terms and Conditions.
              </label>
              {errors.terms && (
                <p className="text-red-600">{errors.terms.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-black text-white rounded-md"
            >
              Pay Now
            </button>
          </form>
        </div>

        {/* Order Summary Section */}
        <div className="w-full sm:w-1/3 bg-gray-50 p-3 sm:p-6">
          <h3 className="text-lg font-semibold mb-3">Review your cart</h3>
          <div className="mb-4 h-64 overflow-y-auto">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center mb-3 p-3 bg-white rounded-md shadow-md"
              >
                <img
                  src={item.image}
                  alt=""
                  className="w-[70px] h-[70px] object-cover mr-4"
                />
                <div>
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-gray-500">
                    {item.amount}x ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Discount Code */}
          <div className="flex mb-6">
            <input
              type="text"
              className={`w-full border ${
                couponApplied
                  ? "border-gray-300 bg-gray-100 text-gray-500"
                  : "border-gray-300 bg-white"
              } rounded-l-md p-3`}
              placeholder="Discount code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              disabled={couponApplied}
            />
            <button
              className={`p-3 rounded-r-md ${
                couponApplied
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-black text-white"
              }`}
              onClick={handleCouponApply}
              disabled={couponApplied}
            >
              Apply
            </button>
          </div>

          {/* Price Summary */}
          <div className="text-sm mb-6">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${total}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>$5.00</span>
            </div>
            <div className="flex justify-between text-green-600 mb-2">
              <span>Discount</span>
              <span>- ${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${(total + 5.0 - discount).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Checkout;
