import React from 'react';
import { Link } from 'react-router-dom';
import HeartIcon from './HeartIcon';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { useDispatch } from 'react-redux';



const Product = ({ product }) => {

  const dispatch = useDispatch()
  const addToCartHandler = () => {
    let qnty =1
    dispatch(addToCart({...product,qnty}))

  }
    return (
        <div className="w-[18rem] mx-auto bg-white shadow-md rounded-lg border border-gray-200">
            {/* Image Section */}
            <div className="relative w-full h-48">
                <Link to={`/product/${product._id}`} className="block">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-t-lg"
                    />
                </Link>
                <div className="absolute top-3 right-3">
                    <HeartIcon product={product} />
                </div>
            </div>

            {/* Product Details */}
            <div className="p-4 space-y-4">
                {/* Name and Price */}
                <Link to={`/product/${product._id}`} className="block">
                    <h2 className="flex justify-between items-center text-lg font-semibold text-gray-800">
                        <span className="truncate w-36">{product.name}</span>
                        <span className="bg-pink-100 text-pink-800 text-sm font-medium px-3 py-1 rounded-full">
                            ₹{product.price}
                        </span>
                    </h2>
                </Link>

                {/* Description or Tagline */}
                <p className="text-sm text-gray-600 line-clamp-2">
                    {product.description || "No description available"}
                </p>

                {/* CTA Buttons */}
                <div className="flex justify-between items-center">
                    <Link
                        to={`/product/${product._id}`}
                        className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm font-medium"
                    >
                        View Details
                    </Link>
                    <button onClick={addToCartHandler} 
                    className="bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-lg text-sm font-medium">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Product;
