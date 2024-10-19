import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link from React Router

const Footer = () => {
  return (
    <footer className="bg-primary py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Brand Info */}
          <div className="mb-6 md:mb-0">
            <p className="text-white text-center md:text-left">
              &copy; 2024 Ecommerce Shop. All rights reserved.
            </p>
          </div>
          
          {/* Social Media Links */}
          <div className="flex space-x-4 mb-6 md:mb-0">
            <Link to="#" >
              <FaFacebookF className="text-white hover:text-gray-400" />
            </Link>
            <Link to="#">
              <FaTwitter className="text-white hover:text-gray-400"/>
            </Link>
            <Link href="#">
              <FaInstagram className="text-white hover:text-gray-400" />
            </Link>
          </div>

          {/* Links Section */}
          <div className="flex flex-col md:flex-row space-x-0 md:space-x-4">
            <Link to="#" className="text-white text-center hover:text-gray-400">Privacy Policy</Link>
            <Link to="#" className="text-white text-center hover:text-gray-400">Terms of Service</Link>
            <Link to="#" className="text-white text-center hover:text-gray-400">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


