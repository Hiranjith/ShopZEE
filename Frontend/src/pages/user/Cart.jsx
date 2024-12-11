import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/features/cart/cartSlice';
import { FaTrash, FaBox } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CartCount from './CartCount';



const Cart = () => {

    const {cartItems} = useSelector((state) => state.cart)  || [];

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const addToCartHandler = (item, qnty) => {
        dispatch(addToCart({...item, qnty}))
    }

    const removeCartItem = (item) => {
        dispatch(removeFromCart(item._id))
        toast.success(`${item.name} removed from your cart`)
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=/checkout')
    }
    


    return (
        <>
        <div className='container pt-16 flex justify-around items-start flex wrap mx-auto mt-8 '>
        {cartItems.length == 0 ? (
            <div>
                <span className='text-4xl text-bold'>Your cart is empty</span>    
                <Link className='text-blue-600 ml-4 font-semibold hover:underline ' to='/'>
                    Go back to home
                </Link>
            </div>
        ): (
            <>
                <div className="flex flex-col w-[80%]">
                <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
                {cartItems.map((item) => (
                    <div key={item._id} className="flex items-enter mb-[1rem] pb-2">
                        <div className="w-[5rem] h-[5rem]">
                            <img src={item.image} alt={item.name} 
                            className="w-full h-full object-cover rounded" />
                        </div>

                        <div className='flex-1 ml-4'>
                            <Link to={`/product/${item._id}`} className='text-black'>
                                {item.name}
                            </Link>
                        </div>

                        <div className="flex-1 ml-4 text-black">{item.brand}</div>
                        <div className="flex-1 ml-4 text-green-800 font-bold">₹{item.price}</div>

                        <div>
                        <label htmlFor="quantity" className="block font-bold mb-2">
                            <FaBox className="mr-2 text-gray-600 inline-block" /> 
                            Quantity:
                        </label>
                        <select
                            className="w-full p-1 border rounded text-black"
                            value={item.qnty}
                            onChange={(e) =>
                                addToCartHandler(item, Number(e.target.value))
                            }
                            >
                            {[...Array(item.stockCount).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                {x + 1}
                                </option>
                            ))}
                        </select>
                        </div>

                        <div className='flex-1 ml-4'>
                            <button className="text-red-500 mr-[5rem]" 
                            onClick={() => removeCartItem(item)}>
                                <FaTrash className="ml-[2rem] " />
                            </button>
                        </div>
                    </div>
                ))}
                <div className="mt-8 w-[40rem]">
                    <div className="p-4 rounded-lg">
                        <h1 className="text-xl font-semibold mb-2">
                            Items ({cartItems.reduce((acc, item) => acc+item.qnty, 0)})
                        </h1>
                    </div>

                    <div className="text-2xl font-bold">
                        ₹ {cartItems.reduce((acc, item) => acc+item.price*item.qnty, 0).toFixed(2)}
                    </div>

                    <div>
                        <button className="bg-yellow-500 mt-4 py-2 px-4 rounded-full text-lg w-full"
                        onClick={checkoutHandler}
                        disabled={cartItems.length === 0}>
                            Proceed to checkout
                        </button>
                    </div>
                </div>
                </div>
            </>
        )}
        </div>
        </>
    );
}

export default Cart;
