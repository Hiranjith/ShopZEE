import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { savePaymentMethod, saveShippingAddress } from '../../redux/features/cart/cartSlice';
import ProgressSteps from '../../components/ProgressSteps';



const Shipping = () => {

    const cart = useSelector((state) => state.cart)
    const {shippingAddress} = cart

    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    const [address, setAddress] = useState(shippingAddress.address || '')
    const [city, setCity] = useState(shippingAddress.city || '')
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
    const [country, setCountry] = useState(shippingAddress.country || '')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/checkout')
        }
    }, [shippingAddress.address, navigate])

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(savePaymentMethod(paymentMethod));
        dispatch(saveShippingAddress({address, city, postalCode, country}));

        navigate('/placeOrder')

    }

    return (
        <div className="container mx-auto ">
            <ProgressSteps step1 step2 />
            <div className="mt-[10rem] flex justify-around items-center flex-wrap">
                <form onSubmit={submitHandler} className="w-[40rem]">
                    <h1 className="text-2xl font-semibold mb-4">
                        Shipping
                    </h1>
                    <div className="mb-4">
                        <label htmlFor="text" className="block text-black mb-2">Address</label>
                        <input type="text" value={address} required 
                        className="w-full p-2 border rounded"
                        onChange={(e) => setAddress(e.target.value)}/>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="text" className="block text-black mb-2">City</label>
                        <input type="text" value={city} required 
                        className="w-full p-2 border rounded"
                        onChange={(e) => setCity(e.target.value)}/>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="text" className="block text-black mb-2">Pin Code</label>
                        <input type="text" value={postalCode} required 
                        className="w-full p-2 border rounded"
                        onChange={(e) => setPostalCode(e.target.value)}/>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="text" className="block text-black mb-2">Country</label>
                        <input type="text" value={country} required 
                        className="w-full p-2 border rounded"
                        onChange={(e) => setCountry(e.target.value)}/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="" className="block text-gray-600">
                            Select payment method
                        </label>
                        <div className="mt-2">
                            <label htmlFor="" className="inline-flex items-center">
                               <input type="radio" 
                               className="form-radio text-blue-500" 
                               name='payment' 
                               value='PayPal' 
                               checked = { paymentMethod === 'PayPal'}
                               onChange={(e) => setPaymentMethod(e.target.value)}/>
                               <span className="ml-2">
                               Paypal or Credit Card
                               </span>
                            </label>
                        </div>
                    </div>
                    <button className="bg-yellow-500 text-black py-2 px-4 rounded-full text-lg w-full"
                    type='submit'>
                        Continue
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Shipping;
