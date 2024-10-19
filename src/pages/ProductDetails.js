import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { ProductContext } from '../contexts/ProductContext';

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState('S');
  const [selectedColor, setSelectedColor] = useState(270);

  const product = products.find(item => item.id === parseInt(id));

  if (!product) {
    return (
      <section className='h-screen flex justify-center items-center'>
        Loading...
      </section>
    );
  }

  const { title, price, description, image } = product;

  const handleAddToCart = () => {
    addToCart({ ...product, selectedSize }, product.id);
  };

  const handleColorSelect = (hueValue) => {
    setSelectedColor(hueValue);
  };

  return (
    <section className='pt-36 pb-16 lg:py-32 flex items-center min-h-[calc(100vh-160px)]'>
      {/* Adjust the padding to 36px top (to account for the header) and 16px bottom (for the footer). */}
      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row items-center'>
          <div className='flex flex-1 justify-center items-center mb-8 lg:mb-0'>
            <img
              className='max-w-[200px] sm:max-h-sm lg:max-w-sm w-72 filter'
              style={{ filter: `hue-rotate(${selectedColor}deg)` }}
              src={image}
              alt=''
            />
          </div>

          <div className='flex-1 text-center lg:text-left shadow-md p-4 lg:p-8 mr-8'>
            <h1 className='text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0'>
              {title}
            </h1>
            <div className='text-xl text-red-500 font-medium mb-6'>
              $ {price}
            </div>
            <p className='mb-8'>{description}</p>

            <div className='mb-8 flex items-center'>
              <p className='font-medium mr-4'>Select Color:</p>
              <button
                onClick={() => handleColorSelect(270)}
                className={`rounded-full w-8 h-8 bg-purple-500 mx-2 focus:outline-none ${
                  selectedColor === 270 ? 'border-2 border-black' : ''
                }`}
              />
              <button
                onClick={() => handleColorSelect(90)}
                className={`rounded-full w-8 h-8 bg-green-500 mx-2 focus:outline-none ${
                  selectedColor === 90 ? 'border-2 border-black' : ''
                }`}
              />
              <button
                onClick={() => handleColorSelect(180)}
                className={`rounded-full w-8 h-8 bg-blue-500 mx-2 focus:outline-none ${
                  selectedColor === 180 ? 'border-2 border-black' : ''
                }`}
              />
            </div>

            <div className='mb-8 flex items-center'>
              <p className='font-medium mr-4'>Select Size:</p>
              <select
                id='size'
                className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                <option value='S'>S</option>
                <option value='M'>M</option>
                <option value='L'>L</option>
                <option value='XL'>XL</option>
                <option value='XXL'>XXL</option>
              </select>
            </div>
            <button
              onClick={handleAddToCart}
              className='bg-primary py-4 px-8 text-white rounded-lg hover:bg-primary-dark transition duration-300'
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
