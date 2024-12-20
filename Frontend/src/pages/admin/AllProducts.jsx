import React, { useEffect } from 'react';
import { useGetAllProductsQuery } from '../../redux/api/productApiSlice';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import moment from 'moment';
import AdminMenu from './AdminMenu';

const AllProducts = () => {
    const { data: products, isLoading, isError, } = useGetAllProductsQuery();

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <div className="text-red-500 text-center mt-5 text-lg">Error in loading products</div>;
    }



    return (
        <div className="min-h-screen p-6 flex flex-col items-center bg-gray-200 mt-9">
            <AdminMenu />
            {/* Heading */}
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
                All Products
            </h1>

            {/* Product List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="bg-black text-white shadow-xl rounded-lg overflow-hidden transition-transform hover:scale-105 p-4"
                    >
                        {/* Product Image with padding */}
                        {product.image && (
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-48 object-cover mb-4 rounded-lg"
                            />
                        )}

                        {/* Product Details */}
                        <div>
                            {/* Product Name */}
                            <h2 className="text-xl font-semibold text-center mb-2">
                                {product.name}
                            </h2>

                            {/* Price */}
                            <p className="text-lg font-bold text-green-500 mb-2 text-center">
                                ₹{product.price}
                            </p>

                            {/* Description */}
                            <p className="text-gray-300 text-sm mb-4 text-center">
                                {product.description.substring(0,80) }{"...."}
                            </p>

                            {/* Creation Time */}
                            <p className="text-xs text-gray-400 text-center">
                                Created on: {moment(product.creationTime).format('MMMM Do YYYY')}
                            </p>

                            {/* Update Button */}
                            <Link
                                to={`/admin/updateproduct/${product._id}`}
                                className="block text-center mt-4 bg-blue-600 text-white py-2 rounded-md shadow-md hover:bg-blue-700 transition-all"
                            >
                                Edit
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProducts;
