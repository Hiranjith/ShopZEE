import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCreateOrderMutation } from '../../redux/api/orderApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../redux/features/cart/cartSlice';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import ProgressSteps from '../../components/ProgressSteps';


const PlaceOrder = () => {

    const cart = useSelector((state) => state.cart)
    const [createOrder, {isLoading, error}] = useCreateOrderMutation()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    

    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate('/checkout')
        }
    }, [cart.shippingAddress.address, cart.paymentMethod, navigate])

    const handlePlaceOrder = async (e) => {
        try {
            e.preventDefault

            const res = await createOrder({
                orderItems: cart.cartItems, 
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                taxPrice: cart.itemGST, 
                shippingPrice: cart.shippingFee,
                totalPrice: cart.totalPrice
            }).unwrap();
            toast.success("Your order has been placed")
            dispatch(clearCart())
            console.log('hey from shipping', res);
            navigate(`/order/${res._id}`)
        } catch (error) {
            toast.error(error)
        }
    }


    return (
        <>
        
            <ProgressSteps step1 step2 step3 />

            <div  className="container mx-auto mt-8">
                {cart.cartItems.length === 0 ? (
                    <Message>Your cart is empty</Message>
                ) : (
                    <div className="overflow-x-auto ml-[5rem]">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <td className="px-1 py-2 text-left align-top">Image</td>
                                    <td className="px-1 py-2 text-left align-top">Product</td>
                                    <td className="px-1 py-2 text-left align-top">Quantity</td>
                                    <td className="px-1 py-2 text-left align-top">Price</td>
                                    <td className="px-1 py-2 text-left align-top">Total</td>
                                </tr>
                            </thead>

                            <tbody>
                                {cart.cartItems.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <img src={item.image} alt={item.name} 
                                            className="w-16 h-16 object-cover"/>
                                        </td>
                                        <td className="p-2">
                                            <Link to={`/product/${item._id}`}>
                                                {item.name}
                                            </Link>
                                        </td>
                                        <td className="p-2">{item.qnty}</td>
                                        <td className="p-2">₹{item.price}</td>
                                        <td className="p-2">₹{item.price * item.qnty}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-5">Order Summary</h2>
                    <div className="flex justify-between flex-wrap p-8 bg-gray-200 ml-[1rem]">
                    <ul className="font-semibold mb-4">
                        <li>
                            <span className="font-semibold mb-4">Items</span> ₹{cart.itemsPrice}
                        </li>
                        <li>
                            <span className="font-semibold mb-4">Shipping</span> ₹{cart.shippingFee}
                        </li>
                        <li>
                            <span className="font-semibold mb-4">Tax</span> ₹{cart.itemGST}
                        </li>
                        <li>
                            <span className="font-semibold mb-4">Total</span> ₹{cart.totalPrice}
                        </li>
                    </ul>

                    {error && <Message variant='danger'>{error.data.message}</Message>}

                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>
                        <p>
                            {cart.shippingAddress.address}, {" "}, {cart.shippingAddress.city}
                            {"-"}{cart.shippingAddress.postalCode},{' '} {cart.shippingAddress.country}
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Payment method</h2>
                        <strong>Method</strong>{": "}{cart.paymentMethod}
                    </div>
                    </div>

                    <button className="ml-[1rem] bg-yellow-500 text-black py-2 px-4 rounded-full text-lg w-full mt-4" 
                    type='buttom' 
                    disabled={cart.cartItems === 0} 
                    onClick={handlePlaceOrder}>
                        Place Order
                    </button>

                    {isLoading && <Loader />}
                </div>
            </div>
        </>
    );
}

export default PlaceOrder;
