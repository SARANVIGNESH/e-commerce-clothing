import React, { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";
import Product from "../components/Product";
import Hero from "../components/Hero";
import { useLocation } from "react-router-dom";
import { SlBasket } from "react-icons/sl"; 

const Home = () => {
  const { products } = useContext(ProductContext);
  const location = useLocation();

  // Get search query from URL parameters
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";

  // Filter products based on search query or category
  const filteredProducts = products.filter((item) => {
    const matchesCategory =
      item.category === "men's clothing" || item.category === "women's clothing";
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  

  return (
    <div>
      <Hero />
      <section className="py-16">
        <div className="container mx-auto">
          {filteredProducts.length > 0 ? (
            <>
             <h1 className="text-4xl text-center text-gray-500 lg:text-left mb-4 px-10">
             Products For You
           </h1>
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] 
              max-w-sm mx-auto md:max-w-none md:mx-10"
            >
              {filteredProducts.map((product) => {
                return <Product product={product} key={product.id} />;
              })}
            </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
                <SlBasket className="h-24 w-24 text-gray-400 mb-4" />
                <h2 className="text-lg font-semibold mb-2">Sorry, no results found!</h2>
                <p className="text-gray-500 mb-4">Please check the spelling or try searching for something else.</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
