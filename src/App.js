import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";

const Layout = ({ children }) => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/profile";

  return (
    <>
      {!hideHeaderFooter && <Header />}
      {children}
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <div className="overflow-hidden">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
          </Routes>
        </Layout>
        <Sidebar />
      </Router>
    </div> 
  );
};

export default App;
