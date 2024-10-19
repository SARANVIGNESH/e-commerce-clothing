import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/'); 
  };

  return (
    // <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
    <div className='h-[800px] bg-hero bg-no-repeat bg-cover bg-center py-24 flex justify-center items-center relative'>
      <div className="bg-white p-8 shadow-lg rounded-lg text-center">
        {/* Success message with animation */}
        <h1 className="text-4xl font-bold text-green-500 animate-bounce mb-4">
          Payment Successful!
        </h1>
        <p className="text-lg text-gray-700 animate-fadeInUp mb-6">
          Your order has been placed.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          Thank you for ordering!
        </p>
        {/* Button */}
        <button
          onClick={handleContinueShopping}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out animate-pulse"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
