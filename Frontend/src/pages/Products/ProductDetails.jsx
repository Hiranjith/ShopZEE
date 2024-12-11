import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetProductDetailsQuery,
    useCreateReviewMutation,
    useGetAllProductsQuery
 } from '../../redux/api/productApiSlice';
import { toast } from 'react-toastify';
import {
    FaBox,
    FaClock,
    FaShoppingCart,
    FaStar,
    FaStore,
    FaArrowLeft,
  } from "react-icons/fa";
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import moment from 'moment';
import SmallProducts from './SmallProducts';
import HeartIcon from './HeartIcon'
import { addToCart } from '../../redux/features/cart/cartSlice';
import ReviewModal from '../../components/ReviewModal';



const ProductDetails = () => {

    const {id: productId} = useParams()
    const {userInfo} = useSelector((state) => state.auth)
    const {data: product, isLoading, refetch, error} = useGetProductDetailsQuery(productId)
    const {data: products, isLoading: loadsimilarProducts} = useGetAllProductsQuery()
    const [createReview, {isLoading: loadingReview}] = useCreateReviewMutation()

    const dispatch = useDispatch();
    const navigate =useNavigate();

    const [qnty, setQnty] = useState(1);
    const [similarProductDiv, setSimilarProductDiv] = useState(false)

    const [showReviewForm, setShowReviewForm] = useState(false)
    const [loadingSubmitReview, setLoadingSubmitReview] = useState(false);

    let matchingProducts =  []
    let similarProducts = []
    if (product && products && Array.isArray(products)) {
        matchingProducts = products.filter((p) => p.category._id === product.category);
        similarProducts = matchingProducts.filter((p) =>  p._id !== product._id)
        
    }

    const handleReviewSubmit = async ({ rating, comment }) => {
        setLoadingSubmitReview(true);
        try {
            // Replace with your review submission logic            
            await createReview({ productId, rating, comment }).unwrap();
            refetch()
            toast.success('Review submitted successfully!');
            setShowReviewForm(false);
            refetch(); // Refetch the product details to update reviews
        } catch (error) {
            toast.error(error?.data?.message || 'Failed to submit the review.');
        } finally {
            setLoadingSubmitReview(false);
        }
    };

    const addToCartHandler = () => {
        dispatch(addToCart({...product, qnty}));
        navigate('/cart')
    }

    return (
        <>
            <div className="container mx-auto mt-8 px-4">
                <Link to="/" className="text-blue-600 ml-4 font-semibold hover:underline flex items-center mb-4">
                    <FaArrowLeft className="mr-2" /> Go Back
                </Link>
    
                {isLoading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error?.data?.message || error.message}</Message>
                ) : (
                    <div>
                        <div className="grid md:grid-cols-2 gap-6 ml-3.5">
                            {/* Product Image */}
                            <div>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-auto object-cover rounded-lg shadow-lg"
                                />
                                <HeartIcon product={product} />
                            </div>
    
                            {/* Product Details */}
                            <div>
                                <h2 className="text-3xl font-bold mb-2 text-gray-900">{product.name}</h2>
    
                                <p className="text-gray-800 mb-2 flex items-center">
                                    <FaStore className="mr-2 text-gray-700" />
                                    <span className="text-lg">Brand: {product.brand}</span>
                                </p>
    
                                <p className="text-gray-700 text-sm flex items-center mb-2">
                                    <FaClock className="mr-2 text-gray-600" />
                                    Added {moment(product.createdAt).fromNow()}
                                </p>
    
                                <div className="my-4 flex items-center">
                                    <span className="text-yellow-500 flex items-center">
                                        {Array(Math.round(product.rating))
                                            .fill()
                                            .map((_, i) => (
                                                <FaStar key={i} />
                                            ))}
                                        <span className="ml-2 text-gray-700">
                                            {product.rating.toFixed(1)} ({product.numReviews} reviews)
                                        </span>
                                    </span>
                                </div>
    
                                <p className="text-2xl font-bold text-green-600">₹{product.price}</p>
    
                                <p className="text-gray-800 mt-4">{product.description}</p>
    
                                <p className="mt-4 flex items-center text-lg">
                                    <FaShoppingCart className="mr-2 text-gray-600" />
                                    <span className="font-bold">Quantity:</span> {product.quantity}
                                </p>
    
                                <p className="mt-2 flex items-center text-lg">
                                    <FaBox className="mr-2 text-gray-600" />
                                    <span className="font-bold">In Stock: </span>
                                    {product.stockCount ? (
                                        <span className="text-green-600">Yes ({product.stockCount} available)</span>
                                    ) : (
                                        <span className="text-red-600">Out of Stock</span>
                                    )}
                                </p>
    
                                {product.stockCount && (
                                    <div className="mt-6">
                                        <label htmlFor="quantity" className="block font-bold mb-2 text-lg">
                                            <FaBox className="mr-2 text-gray-600 inline-block" />
                                            Quantity:
                                        </label>
                                        <input
                                            type="number"
                                            id="quantity"
                                            value={qnty}
                                            onChange={(e) =>
                                                setQnty(Math.min(Math.max(1, e.target.value), product.stockCount))
                                            }
                                            className="w-16 text-center border rounded-md"
                                            min="1"
                                            max={product.stockCount}
                                        />
                                        <button
                                            onClick={addToCartHandler}
                                            className="ml-4 bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500"
                                        >
                                            <FaShoppingCart className="inline-block mr-2 text-black" />
                                            <Link to='/cart'>Add to Cart</Link>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
    
                        {/* Reviews section */}
                        <div className="mt-8 ml-4 bg-gray-50 p-6 rounded-lg shadow-lg">
                            <div className='flex justify-between'>
                                <h1 className="text-3xl font-bold mb-6 text-gray-800">Reviews ({product.numReviews})</h1>
                                <button
                                    className="mb-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                    onClick={() => setShowReviewForm(true)}
                                >
                                    Add your Review
                                </button>
                            </div>
    
                            {/* Render ReviewForm as a Modal */}
                            {showReviewForm && (
                                <ReviewModal
                                    onClose={() => setShowReviewForm(false)}
                                    onSubmit={handleReviewSubmit}
                                    isLoading={loadingSubmitReview}
                                />
                            )}
    
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {product.reviews.map((review, index) => (
                                    <div
                                        key={index}
                                        className="bg-white p-4 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300"
                                    >
                                        <h2 className="text-lg font-semibold text-gray-900 mb-2">{review.name}</h2>
    
                                        <div className="flex items-center mb-2">
                                            {Array.from({ length: 5 }).map((_, i) => {
                                                const fillType = i < Math.floor(review.rating) ? "text-yellow-500" : i < review.rating ? "text-yellow-300" : "text-gray-300";
                                                return (
                                                    <FaStar
                                                        key={i}
                                                        className={`${fillType} w-5 h-5`}
                                                    />
                                                );
                                            })}
                                            <span className="ml-2 text-gray-700 text-sm">
                                                {review.rating.toFixed(1)}
                                            </span>
                                        </div>
    
                                        <p className="text-gray-700 text-sm mb-4">
                                            {review.comment || "No comment provided."}
                                        </p>
    
                                        <p className="text-gray-600 text-xs flex items-center">
                                            <FaClock className="mr-2 text-gray-500" />
                                            Reviewed {moment(review.createdAt).fromNow()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
    
                        {/* Similar products section */}
                        <div className="mt-8 ml-4 bg-gray-50 p-6 rounded-lg shadow-lg">
                            <div>
                                <p onClick={() => setSimilarProductDiv(!similarProductDiv)}
                                    className="text-3xl font-bold mb-6 text-gray-800 hover:underline cursor-pointer">
                                    View more similar Products
                                </p>
                            </div>
                            {similarProductDiv && (
                                <div className={`transition-all duration-500 ease-in-out ${
                                    similarProductDiv ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                                } overflow-hidden bg-white p-4 rounded-lg shadow-md`}>
                                    <h2 className="text-2xl font-semibold mb-4">Here are some similar products:</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {similarProducts.map((p) => (
                                            <div
                                                key={p._id}
                                                className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
                                            >
                                                <SmallProducts product={p} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
    
}

export default ProductDetails;
