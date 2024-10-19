// import React, { useContext, useEffect, useState } from "react";
// import { SidebarContext } from "../contexts/SidebarContext";
// import { BsBag } from "react-icons/bs";
// import { CartContext } from "../contexts/CartContext";
// import Logo from "../img/logo.svg";
// import { Link, useNavigate, useLocation } from "react-router-dom"; 
// import { AuthContext } from "../contexts/AuthContext";
// import { IoSearch } from "react-icons/io5";

// const Header = () => {
//   const [isActive, setIsActive] = useState(false);
//   const { isOpen, setIsOpen } = useContext(SidebarContext);
//   const { itemAmount } = useContext(CartContext);
//   const { user } = useContext(AuthContext);
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation(); 

//   useEffect(() => {
//     const handleScroll = () => {
//       window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const handleAccount = async () => {
//     navigate("/profile")
//   };

//   const handleSearch = (e) => {
//     if (e.key === "Enter") {
//       navigate(`/?search=${searchQuery}`);
//     }
//   };

//   // Check if the current path is /product/:id
//   const isProductPage = location.pathname.startsWith("/product/");

//   return (
//     <header
//       className={`${
//         isActive ? "bg-white py-4 shadow-md" : "bg-none py-6"
//       } fixed w-full z-10 transition-all`}
//     >
//       <div className="container mx-auto px-10 flex items-center justify-between h-full">
//         <Link to={"/"} className="flex items-center space-x-2">
//           <div>
//             <img className="w-[40px]" src={Logo} alt="Logo" />
//             <p className="text-red-500 hover:text-red-700 text-lg">
//               HOME
//             </p>
//           </div>
//         </Link>

//         {/* Conditionally render the search bar */}
//         {!isProductPage && (
//           <div className="flex-grow mx-4 md:mx-10">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search for clothes"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 onKeyDown={handleSearch}
//                 className="w-full border border-gray-300 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-red-500"
//               />
//               <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                 <IoSearch className="text-xl" />
//               </div>
//             </div>
//           </div>
//         )}

//         {/* User and cart icons */}
//         <div className="flex items-center space-x-8">
//           {user ? (
//             <button
//               onClick={handleAccount}
//               className="text-red-500 hover:text-red-700 text-lg"
//             >
//               My Account
//             </button>
//           ) : (
//             <Link to={"/login"}>
//               <button className="text-red-500 hover:text-red-700 text-lg">
//                 Login
//               </button>
//             </Link>
//           )}
//           <div
//             onClick={() => setIsOpen(!isOpen)}
//             className="cursor-pointer flex relative"
//           >
//             <BsBag className="text-2xl" />
//             <div
//               className="bg-red-500 absolute -right-2 -bottom-2 
//                 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center"
//             >
//               {itemAmount}
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;


import React, { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../contexts/SidebarContext";
import { BsBag } from "react-icons/bs";
import { CartContext } from "../contexts/CartContext";
import Logo from "../img/logo.svg";
import { Link, useNavigate, useLocation } from "react-router-dom"; 
import { AuthContext } from "../contexts/AuthContext";
import { IoSearch } from "react-icons/io5";

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleAccount = async () => {
    navigate("/profile");
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/?search=${searchQuery}`);
    }
  };

  // Check if the current path is /checkout or /order-success
  const isCheckoutOrOrderSuccess = 
    location.pathname === "/checkout" || 
    location.pathname === "/order-success";

  // Check if the current path starts with /product/
  const isProductPage = location.pathname.startsWith("/product/");

  return (
    <header
      className={`${
        isActive ? "bg-white py-4 shadow-md" : "bg-none py-6"
      } fixed w-full z-10 transition-all`}
    >
      <div className="container mx-auto px-10 flex items-center justify-between h-full">
        <Link to={"/"} className="flex items-center space-x-2">
          <div>
            <img className="w-[40px]" src={Logo} alt="Logo" />
            <p className="text-red-500 hover:text-red-700 text-lg">HOME</p>
          </div>
        </Link>

        {/* Conditionally render the search bar */}
        {!isProductPage && !isCheckoutOrOrderSuccess && (
          <div className="flex-grow mx-4 md:mx-10">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for clothes"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                className="w-full border border-gray-300 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-red-500"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <IoSearch className="text-xl" />
              </div>
            </div>
          </div>
        )}

        {/* User and cart icons */}
        {!isCheckoutOrOrderSuccess && (
          <div className="flex items-center space-x-8">
            {user ? (
              <button
                onClick={handleAccount}
                className="text-red-500 hover:text-red-700 text-lg"
              >
                My Account
              </button>
            ) : (
              <Link to={"/login"}>
                <button className="text-red-500 hover:text-red-700 text-lg">
                  Login
                </button>
              </Link>
            )}
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer flex relative"
            >
              <BsBag className="text-2xl" />
              <div
                className="bg-red-500 absolute -right-2 -bottom-2 
                  text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center"
              >
                {itemAmount}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

