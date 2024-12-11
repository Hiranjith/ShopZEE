import React, { useState } from 'react';
import { FaTimes, FaBars, FaThList, FaProductHunt, FaUsers, FaClipboardList, FaBox } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const onClickMenuButton = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={onClickMenuButton}
                className="text-white bg-blue-600 p-1.5 rounded-full fixed top-4 right-4 z-50 shadow-md hover:bg-blue-700"
            >
                {isMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
            </button>

            {/* Menu Section */}
            {isMenuOpen && (
                <section
                    className="bg-gradient-to-b from-gray-800 to-black text-white p-4 fixed right-4 top-16 w-52 
                    rounded-md shadow-lg z-40 transition-all duration-300 ease-in-out"
                >
                    <ul className="list-none space-y-3">
                        <li>
                            <NavLink
                                to="/admin/categorylist"
                                className={({ isActive }) =>
                                    `flex items-center space-x-2 py-2 px-3 rounded-md text-sm font-medium 
                                    transition-all duration-200 ${
                                        isActive
                                            ? 'bg-blue-600 text-white shadow-md'
                                            : 'hover:bg-gray-700 hover:shadow-md text-gray-300'
                                    }`
                                }
                            >
                                <FaThList />
                                <span>Create Category</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/admin/productlist"
                                className={({ isActive }) =>
                                    `flex items-center space-x-2 py-2 px-3 rounded-md text-sm font-medium 
                                    transition-all duration-200 ${
                                        isActive
                                            ? 'bg-blue-600 text-white shadow-md'
                                            : 'hover:bg-gray-700 hover:shadow-md text-gray-300'
                                    }`
                                }
                            >
                                <FaProductHunt />
                                <span>Create Product</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/admin/allproducts"
                                className={({ isActive }) =>
                                    `flex items-center space-x-2 py-2 px-3 rounded-md text-sm font-medium 
                                    transition-all duration-200 ${
                                        isActive
                                            ? 'bg-blue-600 text-white shadow-md'
                                            : 'hover:bg-gray-700 hover:shadow-md text-gray-300'
                                    }`
                                }
                            >
                                <FaBox />
                                <span>All Products</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/admin/userslist"
                                className={({ isActive }) =>
                                    `flex items-center space-x-2 py-2 px-3 rounded-md text-sm font-medium 
                                    transition-all duration-200 ${
                                        isActive
                                            ? 'bg-blue-600 text-white shadow-md'
                                            : 'hover:bg-gray-700 hover:shadow-md text-gray-300'
                                    }`
                                }
                            >
                                <FaUsers />
                                <span>Manage Users</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/admin/orderlist"
                                className={({ isActive }) =>
                                    `flex items-center space-x-2 py-2 px-3 rounded-md text-sm font-medium 
                                    transition-all duration-200 ${
                                        isActive
                                            ? 'bg-blue-600 text-white shadow-md'
                                            : 'hover:bg-gray-700 hover:shadow-md text-gray-300'
                                    }`
                                }
                            >
                                <FaClipboardList />
                                <span>Manage Orders</span>
                            </NavLink>
                        </li>
                    </ul>
                </section>
            )}
        </>
    );
};

export default AdminMenu;
