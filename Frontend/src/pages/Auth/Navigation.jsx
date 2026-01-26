import React from 'react';
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineShoppingCart,
  AiOutlineUserAdd
} from "react-icons/ai";
import { useState } from 'react';
import { FaHeart, FaReceipt } from "react-icons/fa"
import { Link, useNavigate } from 'react-router-dom';
import "./Navigation.css"
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/features/auth/authSlice';
import { useLogoutMutation } from '../../redux/api/usersApiSlice';
import { toast } from 'react-toastify';
import FavouriteCounts from '../Products/FavouriteCounts';
import CartCount from '../user/CartCount';
import Logo from '../../components/Logo.svg'



function Navigation() {

  const { userInfo } = useSelector(state => state.auth)


  const [dropDownOpen, setDropDownOpen] = useState(false)
  const [showSideBar, setShowSideBar] = useState(false)


  const toggleDropDown = () => {
    setDropDownOpen(!dropDownOpen)
  }
  const toggleSideBar = () => {
    setShowSideBar(!showSideBar)
  }
  const closeSideBar = () => {
    setShowSideBar(false)
  }

  const closeDropDown = () => {
    setDropDownOpen(false)
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
      <div className="w-full bg-deep-slate text-white p-4 flex justify-between items-center fixed top-0 right-0 z-50">
        <div className="flex items-center">
          {/* Hamburger Menu for Mobile */}
          <button onClick={toggleSideBar} className="lg:hidden text-white mr-4 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <Link to="/" className="text-2xl font-bold mr-4 flex items-center">
            <img src='https://shopzee-storage.s3.eu-north-1.amazonaws.com/logos/Creative-removebg-preview.png' alt="Shopzee Logo" className="h-full w-12 mr-2" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6FE3E3] via-[#4AB3E3] to-[#1A8FE3]">ShopZEE</span>
          </Link>
        </div>


        {/* Desktop Navigation Links (Center) */}
        <div className="hidden lg:flex items-center gap-8">
          <Link to="/" className="flex items-center hover:text-gray-300 transition-colors" onClick={closeDropDown}>
            <AiOutlineHome size={20} className="mr-2" />
            <span className="font-medium">HOME</span>
          </Link>
          <Link to="/shopping" className="flex items-center hover:text-gray-300 transition-colors" onClick={closeDropDown}>
            <AiOutlineShopping size={20} className="mr-2" />
            <span className="font-medium">SHOPPING</span>
          </Link>
          <Link to="/cart" className="flex items-center hover:text-gray-300 transition-colors relative" onClick={closeDropDown}>
            <AiOutlineShoppingCart size={20} className="mr-2" />
            <span className="font-medium">CART</span>
            <div className="absolute -top-2 -right-2">
              <CartCount />
            </div>
          </Link>
          <Link to="/favourite" className="flex items-center hover:text-gray-300 transition-colors relative" onClick={closeDropDown}>
            <FaHeart size={20} className="mr-2" />
            <span className="font-medium">FAVOURITE</span>
            <div className="absolute -top-2 -right-2">
              <FavouriteCounts />
            </div>
          </Link>
          <Link to="/orders" className="flex items-center hover:text-gray-300 transition-colors" onClick={closeDropDown}>
            <FaReceipt size={20} className="mr-2" />
            <span className="font-medium">My Orders</span>
          </Link>
        </div>


        <div className="flex items-center space-x-4 relative">
          {userInfo ? (
            <div className={`relative ${userInfo.isAdmin ? "mr-14" : ""}`}>
              <button
                onClick={toggleDropDown}
                className="flex items-center text-white hover:underline focus:outline-none mr-4"
              >
                {userInfo.username}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ml-1 ${dropDownOpen ? "transform rotate-180" : ""
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
                <ul className="absolute right-0 mt-2 bg-deep-slate text-white shadow-md rounded-lg w-48">
                  {userInfo.isAdmin && (
                    <>
                      <li>
                        <Link
                          to="/admin/dashboard"
                          className="block px-4 py-2 hover:bg-slate-800"
                          onClick={closeDropDown}
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/allproducts"
                          className="block px-4 py-2 hover:bg-slate-800"
                          onClick={closeDropDown}
                        >
                          Products
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/categorylist"
                          className="block px-4 py-2 hover:bg-slate-800"
                          onClick={closeDropDown}
                        >
                          Category
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/orderlist"
                          className="block px-4 py-2 hover:bg-slate-800"
                          onClick={closeDropDown}
                        >
                          Orders
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/userslist"
                          className="block px-4 py-2 hover:bg-slate-800"
                          onClick={closeDropDown}
                        >
                          Users
                        </Link>
                      </li>
                    </>
                  )}
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-slate-800"
                      onClick={closeDropDown}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logoutHandler}
                      className="block px-4 py-2 w-full text-left hover:bg-slate-800"
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


      {/* Mobile Drawer (Hidden on Desktop) */}
      <div
        style={{ zIndex: 999 }}
        className={`${showSideBar ? "translate-x-0" : "-translate-x-full"
          } lg:hidden fixed left-0 top-0 bottom-0
        p-4 text-white bg-deep-slate w-64 h-screen transition-all ease-in-out duration-300 mt-[64px]`}
        id="navigation-container"
      >
        <div className="flex flex-col justify-start mt-10 gap-8">
          <Link
            to="/"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineHome size={26} />
            <span className="nav-item-name ml-4">HOME</span>
          </Link>
          <Link
            to="/shopping"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineShopping size={26} />
            <span className="nav-item-name ml-4">SHOPPING</span>
          </Link>
          <Link to="/cart" className="flex items-center transition-transform transform hover:translate-x-2 relative">
            <AiOutlineShoppingCart size={26} />
            <span className="nav-item-name ml-4">CART</span>
            <div className="absolute top-0 left-4">
              <CartCount />
            </div>
          </Link>
          <Link
            to="/favourite"
            className="flex items-center transition-transform transform hover:translate-x-2 relative"
          >
            <FaHeart size={26} />
            <span className="nav-item-name ml-4">FAVOURITE</span>
            <div className="absolute top-0 right-0">
              <FavouriteCounts />
            </div>
          </Link>
          <Link
            to="/orders"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <FaReceipt size={26} />
            <span className="nav-item-name ml-4">My Orders</span>
          </Link>
        </div>
      </div>
    </>
  );

}

export default Navigation;


