import React from 'react';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { Link } from 'react-router-dom';
import { useGetUserOrderQuery } from '../../redux/api/orderApiSlice';



const MyOrders = () => {

    const {data: orders, isLoading, error} = useGetUserOrderQuery()
    console.log(orders);
    


    return (
        <div className="container mx-auto p-4 bg-gray-100">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">My Orders</h2>
    
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error?.data?.error || error.error}</Message>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="py-3 px-4">Item</th>
                                <th className="py-3 px-4">ID</th>
                                <th className="py-3 px-4">Date</th>
                                <th className="py-3 px-4">Total</th>
                                <th className="py-3 px-4">Payment Status</th>
                                <th className="py-3 px-4">Delivery</th>
                                <th className="py-3 px-4"></th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {orders?.map((order, index) => (
                                <tr key={index} className="border-t border-gray-200 hover:bg-gray-100">
                                    <td className="py-4 px-6">
                                        <img src={order.orderItems[0].image} alt={order.orderItems[0].name} 
                                             className="w-16 h-16 object-cover rounded-lg" />
                                    </td>
                                    <td className="py-4 px-6">{order._id.substring(14)}</td>
                                    <td className="py-4 px-6">{order.createdAt.substring(0, 10)}</td>
                                    <td className="py-4 px-6">₹ {order.totalPrice}</td>
                                    <td className="py-4 px-6">
                                        {order.isPaid ? (
                                            <span className="px-3 py-1 inline-block text-sm font-semibold bg-green-200 text-green-800 rounded-full">
                                                Completed
                                            </span>
                                        ) : (
                                            <span className="px-3 py-1 inline-block text-sm font-semibold bg-red-200 text-red-800 rounded-full">
                                                Pending
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-4 px-6">
                                        {order.isDelivered ? (
                                            <span className="px-3 py-1 inline-block text-sm font-semibold bg-green-200 text-green-800 rounded-full">
                                                Completed
                                            </span>
                                        ) : (
                                            <span className="px-3 py-1 inline-block text-sm font-semibold bg-red-200 text-red-800 rounded-full">
                                                Pending
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-4 px-6">
                                        <Link to={`/order/${order._id}`}>
                                            <button className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition duration-200">
                                                View Details
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
    
}

export default MyOrders;
