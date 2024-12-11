import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDeliverOrderMutation, 
    usePayOrderMutation, 
    usePayPalClientIdQuery,
    useGetOrderDetailsQuery, 
    useCancelOrderMutation} from '../../redux/api/orderApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import moment from 'moment';



const Order = () => {

    const {id: orderId} = useParams();

    const {userInfo} = useSelector((state) => state.auth)

    const {data: order, isloading: loadingOrders, error, refetch} = useGetOrderDetailsQuery(orderId)
    
    const {data: paypal, isloading: loadingPayPal, error: errorPayPal} = usePayPalClientIdQuery()

    const [ deliverOrder, {isloading: loadingDeliver}] = useDeliverOrderMutation()

    const [ payOrder, {isLoading: loadingPayment}] = usePayOrderMutation()

    const [{isPending}, paypalDispatch] = usePayPalScriptReducer()

    const [cancelOrder] = useCancelOrderMutation()

    const navigate = useNavigate()

    const convertToUSD = async (totalPriceInINR) => {
        try {
          const response = await fetch('https://api.exchangerate-api.com/v4/latest/INR');
          const data = await response.json();
          const conversionRate = data.rates.USD;
      
          const totalPriceInUSD = (totalPriceInINR * conversionRate).toFixed(2);
          console.log(totalPriceInUSD);
          
          return totalPriceInUSD;
        } catch (error) {
          console.error('Error fetching conversion rate:', error);
          return null;
        }
      };


    useEffect(() => {
        if (!loadingPayPal && !errorPayPal && paypal?.clientId) {
            const loadingPayPalScript = async () => {
                paypalDispatch({
                    type: "resetOptions",
                    value: {
                      "client-id": paypal.clientId,
                      currency: "USD",
                    },
                  })

                paypalDispatch({ type: "setLoadingStatus", value: "pending" });
            }
            
            if (order && !order.isPaid) {
                if (!window.paypal) {
                    loadingPayPalScript();
                }
            }
        }  
    }, [errorPayPal, loadingPayPal, paypal, paypalDispatch, order])


    function onApprove (data, actions){
        return actions.order.capture().then(async function (details) {
            try {
                // Send payment details to the backend and capture the updated response
              const updatedOrder = await payOrder({ orderId, details }).unwrap();

                // Log the updated order response
              console.log("Updated Order:", updatedOrder);
              refetch();
              toast.success("Order is paid");
            } catch (error) {
              toast.error(error?.data?.message || error.message);
            }
          });
    }


    async function createOrder (data, actions){
        const totalPriceInUSD = await convertToUSD(order.totalPrice);
        console.log("Amount value being sent:", totalPriceInUSD);

        if (!totalPriceInUSD) {
            throw new Error("Conversion failed. Unable to fetch total price in USD.");
        }
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: totalPriceInUSD, // Ensure total price is in USD
                        currency_code: "USD", // Matches the SDK currency
                    },
                },
            ],        }).then((orderID) => {
            return orderID
        })
    }


    function onError (error){
        toast.error(error.message)
    }

    const deliverHandler = async() => {
        await deliverOrder(orderId);
        refetch();
    }

    const cancelOrderHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await cancelOrder(orderId).unwrap()

            if (res) {
                toast.success('Your order has been cancelled')
                navigate('/')
            }else{
                toast.error(res.error);
            }
        } catch (error) {
            console.log(error);
            
        }
    }


return loadingOrders ? (
    <Loader />
) : error ? (
    <Message variant='danger'>{error.data.message}</Message>
) : (
    <div className="container mx-auto p-6 bg-gray-100 pt-14">
        <div className="flex flex-col md:flex-row">
            <div className="md:w-2/3 pr-4">
                <div className="bg-white border shadow-md rounded-lg mt-5 pb-4 mb-5 p-4">
                    {order?.orderItems.length === 0 ? (
                        <Message>No orders to display</Message>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="p-2">Image</th>
                                        <th className="p-2">Product</th>
                                        <th className="p-2">Quantity</th>
                                        <th className="p-2">Unit Price</th>
                                        <th className="p-2">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order?.orderItems.map((item, index) => (
                                        <tr key={index} className="border-b">
                                            <td className="p-2">
                                                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover"/>
                                            </td>
                                            <td className="p-2">
                                                <Link to={`/product/${item.product}`} className="text-blue-500 hover:underline">{item.name}</Link>
                                            </td>
                                            <td className="p-2 text-center">{item.qnty}</td>
                                            <td className="p-2 text-center">₹{item.price}</td>
                                            <td className="p-2 text-center">₹{(item.qnty * item.price).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                        {/* Cancel Order Button */}

                {userInfo._id === order?.user._id && !order?.isDelivered && (
                    <div className="flex justify-end mt-4">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                        onClick={cancelOrderHandler}
                    >
                        Cancel Order
                    </button>
                </div>
                )}
                </div>
            </div>
            <div className="md:w-1/3">
                <div className="bg-white border shadow-md rounded-lg mt-5 pb-4 mb-4 p-4">
                    <h2 className="text-xl font-bold mb-2">Shipping</h2>
                    <p className="mb-2">
                        <strong className="text-pink-500">Order:</strong> {order ? order._id : " "}
                    </p>
                    <p className="mb-2">
                        <strong className="text-pink-500">Name:</strong> {order ? order.user.username : " "}
                    </p>
                    <p className="mb-2">
                        <strong className="text-pink-500">Email:</strong> {order ? order.user.email : ""}
                    </p>
                    {order && (
                        <div>
                            <p className="mb-2">
                                <strong className="text-pink-500">Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}-{order.shippingAddress.postalCode}, {order.shippingAddress.country}
                            </p>
                            <p className="mb-2">
                                <strong className="text-pink-500">Method:</strong> {order.paymentMethod}
                            </p>
                        </div>
                    )}
                    {order?.isPaid ? (
                        <div className='bg-green-400 p-2 rounded'>Paid on {moment(order.paidAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
                    ) : (
                        <div className='bg-red-400 p-2 rounded'>Not paid</div>
                    )}
                </div>
                <h2 className="text-xl font-bold mb-2 mt-[3rem]">Order Summary</h2>
                {order && (
                    <div className='bg-white border shadow-md rounded-lg p-4 mb-4'>
                        <div className="flex justify-between mb-2">
                            <span>Items</span>
                            <span>₹ {order.itemsPrice}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Shipping</span>
                            <span>₹ {order.shippingPrice}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>GST</span>
                            <span>₹ {order.taxPrice}</span>
                        </div>
                        <hr className='bg-gray-500 h-0.5 border-0'/>
                        <div className="flex justify-between mb-2">
                            <span className='text-bold text-2xl font-bold'>Total</span>
                            <span className='text-bold text-2xl font-bold'>₹ {order.totalPrice}</span>
                        </div>
                        {!order.isPaid && (
                            <div className='mt-[2rem]'>
                                {loadingPayment && <Loader />}{" "}
                                {isPending ? (<Loader />) : (
                                    <div>
                                        <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError}></PayPalButtons>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
                {loadingDeliver && <Loader />}
                {userInfo && userInfo.isAdmin && order?.isPaid && !order?.isDelivered && (
                    <div>
                        <button type="button" className="bg-pink-500 text-white w-full py-2 rounded-lg mt-4" onClick={deliverHandler}>
                            Mark As Delivered
                        </button>
                    </div>
                )}
            </div>
        </div>


    </div>
    
);

}

export default Order;