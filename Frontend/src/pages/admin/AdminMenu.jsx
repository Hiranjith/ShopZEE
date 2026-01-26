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
                className={`flex items-center justify-center p-2 rounded-lg z-50 fixed right-7 top-5
                transition-all duration-300 transform 
                ${isMenuOpen ? 'bg-deep-slate rotate-180 text-white' : 'bg-gray-900 text-white hover:bg-gray-800'}`}
                style={{ top: '22px' }} /* Fine-tuned alignment */
            >
                {isMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
            </button>

            {/* Menu Section */}
            {isMenuOpen && (
                <section
                    className="bg-deep-slate text-white p-4 fixed right-7 top-16 w-64 
                    rounded-lg shadow-xl z-40 border border-gray-700
                    transition-all duration-300 ease-in-out transform origin-top-right scale-100"
                >
                    <ul className="list-none space-y-2">
                        <li>
                            <NavLink
                                to="/admin/categorylist"
                                className={({ isActive }) =>
                                    `flex items-center space-x-3 py-3 px-4 rounded-lg text-sm font-medium 
                                    transition-all duration-200 group ${isActive
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'hover:bg-slate-800 text-gray-300 hover:text-white'
                                    }`
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <FaThList className={({ isActive }) => isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'} />
                                <span>Create Category</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/admin/productlist"
                                className={({ isActive }) =>
                                    `flex items-center space-x-3 py-3 px-4 rounded-lg text-sm font-medium 
                                    transition-all duration-200 group ${isActive
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'hover:bg-slate-800 text-gray-300 hover:text-white'
                                    }`
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <FaProductHunt className={({ isActive }) => isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'} />
                                <span>Create Product</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/admin/allproducts"
                                className={({ isActive }) =>
                                    `flex items-center space-x-3 py-3 px-4 rounded-lg text-sm font-medium 
                                    transition-all duration-200 group ${isActive
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'hover:bg-slate-800 text-gray-300 hover:text-white'
                                    }`
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <FaBox className={({ isActive }) => isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'} />
                                <span>All Products</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/admin/userslist"
                                className={({ isActive }) =>
                                    `flex items-center space-x-3 py-3 px-4 rounded-lg text-sm font-medium 
                                    transition-all duration-200 group ${isActive
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'hover:bg-slate-800 text-gray-300 hover:text-white'
                                    }`
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <FaUsers className={({ isActive }) => isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'} />
                                <span>Manage Users</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/admin/orderlist"
                                className={({ isActive }) =>
                                    `flex items-center space-x-3 py-3 px-4 rounded-lg text-sm font-medium 
                                    transition-all duration-200 group ${isActive
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'hover:bg-slate-800 text-gray-300 hover:text-white'
                                    }`
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <FaClipboardList className={({ isActive }) => isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'} />
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
