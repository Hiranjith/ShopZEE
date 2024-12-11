import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { toast } from "react-toastify";
import HeartIcon from './HeartIcon';
import { addToCart } from '../../redux/features/cart/cartSlice';



const ProductCards = ({product}) => {

    const dispatch = useDispatch()
    
    const addToCartHandler = () => {
        let qnty = 1
        dispatch(addToCart({...product, qnty}));
        toast.success(`${product.name} added to cart`)
    }
    return (
        <div className="max-w-sm relative bg-[#1A1A1A] rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl dark:bg-gray-800 dark:border-gray-700">
            <section className="relative overflow-hidden rounded-t-xl">
                <Link to={`/product/${product._id}`}>
                    <span className="absolute bottom-3 right-3 bg-pink-100 text-pink-800 text-sm 
                        font-medium px-3 py-1 rounded-full shadow-md dark:bg-pink-900 dark:text-pink-300">
                        {product.brand}
                    </span>
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        style={{ height: "200px", objectFit: "cover" }} 
                        className="cursor-pointer w-full rounded-t-xl transition-transform transform hover:scale-110 duration-300"
                    />
                </Link>
                <div className="absolute top-3 right-3">
                    <HeartIcon product={product} />
                </div>
            </section>
    
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h5 className="text-lg font-semibold text-white truncate">
                        {product.name}
                    </h5>
                    <p className="text-green-500 font-semibold">
                        {product.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "INR",
                        })}
                    </p>
                </div>
    
                <p className="mb-4 text-sm text-[#CFCFCF] leading-relaxed">
                    {product?.description?.substring(0, 60)} ...
                </p>
    
                <div className="flex items-center justify-between">
                    <Link
                        to={`/product/${product._id}`}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-black 
                        bg-[#292929] rounded-lg shadow-md hover:bg-[#292929] focus:ring-4 
                        focus:ring-[#292929] dark:bg-yellow-300 dark:hover:bg-yellow-500 
                        dark:focus:ring-yellow-500"
                    >
                        Read More
                        <svg
                            className="w-4 h-4 ml-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                        </svg>
                    </Link>
    
                    <button 
                        className="p-3 text-[#FFDF00] bg-[#292929] rounded-full shadow-md hover:bg-[#FFDF00] hover:text-black transition-all duration-300" 
                        onClick={addToCartHandler}
                    >
                        <AiOutlineShoppingCart size={22} />
                    </button>
                </div>
            </div>
        </div>
    );
    
}

export default ProductCards;