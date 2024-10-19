import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { doSignOut } from "../firebase/auth";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await doSignOut();
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="h-[800px] bg-hero bg-no-repeat bg-cover bg-center py-24 flex justify-center items-center relative">
      {/* Back Button */}
      <div className="absolute top-6 left-6">
        <Link to="/" className="text-gray-700">
          <IoMdArrowRoundBack size={30} />
        </Link>
      </div>

      {/* Profile Container */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md flex flex-col items-center relative">
        {/* Profile Picture */}
        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center mb-4">
          <span className="text-4xl text-white">{user.displayName ? user.displayName.charAt(0) : "A"}</span>
        </div>

        {/* User Information */}
        <h1 className="text-2xl font-bold mb-2 text-center">{user.displayName || "Anonymous"}</h1>
        <p className="text-gray-600 mb-4">{user.email}</p>

        {/* Order History */}
        <div className="w-full bg-gray-100 p-4 rounded-lg mb-4 text-center">
          <h2 className="text-lg font-semibold mb-2">Order History</h2>
          <p className="text-sm text-gray-500">You haven’t placed any orders yet.</p>
        </div>

        {/* Account Settings */}
        <div className="w-full bg-gray-100 p-4 rounded-lg text-center">
          <h2 className="text-lg font-semibold mb-2">Account Settings</h2>
          <p className="text-sm text-gray-500">Manage your account information and preferences.</p>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-6 bg-primary py-3 px-8 text-white rounded-lg hover:bg-primary-dark transition duration-300 w-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;




