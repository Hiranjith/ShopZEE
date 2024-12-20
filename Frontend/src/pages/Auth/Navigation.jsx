import React from 'react';
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineShoppingCart,
  AiOutlineUserAdd
} from "react-icons/ai";
import { useState } from 'react';
import {FaHeart, FaReceipt } from "react-icons/fa"
import { Link, useNavigate  } from 'react-router-dom';
import "./Navigation.css"
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/features/auth/authSlice';
import { useLogoutMutation } from '../../redux/api/usersApiSlice';
import { toast } from 'react-toastify';
import FavouriteCounts from '../Products/FavouriteCounts';
import CartCount from '../user/CartCount';
import Logo from '../../components/Logo.svg'



function Navigation() {

  const {userInfo} = useSelector( state => state.auth)


  const [dropDownOpen, setDropDownOpen] = useState(false)
  const [showSideBar, setShowSideBar] = useState(false)

  
  const toggleDropDown = ()=>{
    setDropDownOpen(!dropDownOpen)
  }
  const  toggleSideBar = ()=>{
    setShowSideBar(!showSideBar)
  }
  const closeSideBar = ()=>{
    setShowSideBar(false)
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      
      await logoutApiCall().unwrap();
      dispatch(logout())
      navigate('/login')
      toast.success("Logged out")
    } catch (error) {
      console.error(error);
      
    }
  }

  return (
    <>
      {/* Top Navbar */}
      <div className="w-full bg-gray-800 text-white p-4 flex justify-between items-center fixed top-0 right-0 z-50">
          <div className="flex items-center ml-[6rem]">
              <Link to="/" className="text-2xl font-bold mr-4 flex items-center">
                  <img src='https://shopzee-storage.s3.eu-north-1.amazonaws.com/logos/Creative-removebg-preview.png' alt="Shopzee Logo" className="h-full w-12 mr-2" /> 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6FE3E3] via-[#4AB3E3] to-[#1A8FE3]">ShopZEE</span>
              </Link>
              {/* <Link to="/about" className="mr-4 hover:underline">
                  About
              </Link>
              <Link to="/contact" className="hover:underline">
                  Contact
              </Link> */}
          </div>


  <div className="flex items-center space-x-4 relative">
    {userInfo ? (
      <div className="relative">
        <button
          onClick={toggleDropDown}
          className="flex items-center text-white hover:underline focus:outline-none mr-[4rem]"
        >
          {userInfo.username}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 ml-1 ${
              dropDownOpen ? "transform rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                dropDownOpen
                  ? "M5 15l7-7 7 7"
                  : "M19 9l-7 7-7-7"
              }
            />
          </svg>
        </button>
        {dropDownOpen && (
          <ul className="absolute right-0 mt-2 bg-gray-800 text-white shadow-md rounded-lg w-48">
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/allproducts"
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    Category
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userslist"
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    Users
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-gray-700"
              >
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logoutHandler}
                className="block px-4 py-2 w-full text-left hover:bg-gray-700"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>
    ) : (
      <>
        <Link
          to="/login"
          className="hover:underline flex items-center"
        >
          <AiOutlineLogin className="mr-2" size={20} /> Login
        </Link>
        <Link
          to="/signup"
          className="hover:underline flex items-center"
        >
          <AiOutlineUserAdd className="mr-2" size={20} /> Register
        </Link>
      </>
    )}
  </div>
</div>


      {/* Sidebar */}
      <div
        style={{ zIndex: 999 }}
        className={`${
          showSideBar ? "hidden" : "flex"
        } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between 
        p-4 text-white bg-gray-800 w-[4%] hover:w-[15%] h-[100vh] fixed transition-all ease-in-out duration-300`}
        id="navigation-container"
      >
        <div className="flex flex-col justify-center space-y-2">
          <Link
            to="/"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">HOME</span>
          </Link>
          <Link
            to="/shopping"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">SHOPPING</span>
          </Link>
          <Link to="/cart" className="flex relative">
            <div className="flex items-center transition-transform transform hover:translate-x-2">
              <AiOutlineShoppingCart className="mr-2 mt-[3rem]" size={26} />
              <span className="hidden nav-item-name mt-[3rem]">CART</span>
            </div>
            <CartCount />
          </Link>
          <Link
            to="/favourite"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <FaHeart className="mr-2 mt-[3rem]" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">FAVOURITE</span>
            <FavouriteCounts />
          </Link>
          <Link
            to="/orders"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <FaReceipt className="mr-2 mt-[3rem]" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">My Orders</span>
          </Link>
        </div>
      </div>
    </>
  );

}

export default Navigation;


