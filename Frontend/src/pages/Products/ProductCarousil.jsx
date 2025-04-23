import React from 'react';
import { useGetTopProductsQuery } from '../../redux/api/productApiSlice';
import Message from '../../components/Message';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import Loader from '../../components/Loader';



const ProductCarousil = () => {

    const {data : products, isLoading, error} = useGetTopProductsQuery();
    
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
              breakpoint: 640, // Small screens
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ],
      };

      return (
        <div className="mb-4 lg:block xl:block md:block">
          {isLoading ? null : error ? (
            <Message variant="danger">
              {error?.data?.message || error.error}
            </Message>
          ) : (
            <Slider
              {...settings}
              className="xl:w-[30rem] lg:w-[40rem] md:w-[34rem] sm:w-[28rem] "
            >
              {products.slice(0,4).map(({ image, _id, name, price, description, brand, createdAt, numReviews, rating, quantity, countInStock }) => (
                <div key={_id} className="flex flex-col">
                  <Link to={`/product/${_id}`} className='block'>
                  <img
                    src={image}
                    alt={name}
                    className="w-full rounded-lg object-cover h-[20.8rem]"
                  />
                  </Link>
                  <div className="mt-4 flex justify-between text-sm"> {/* Reduced font size */}
                    <div className="w-[12rem]"> 
                      <h2 className="text-base font-semibold">{name}</h2>
                      <p className="text-sm">₹ {price}</p>
                      <p className="mt-2">{description.substring(0, 60)}...</p> {/* Reduced description */}
                    </div>
                    <div className='text-xs '>
                      <p className="flex items-center ">
                        <FaStore className="mr-1" /> Brand: {brand}
                      </p>
                      <p className="flex items-center mt-2">
                        <FaClock className="mr-1" /> Added: {moment(createdAt).fromNow()}
                      </p>
                      <p className="flex items-center mt-2">
                        <FaStar className="mr-1" /> Reviews: {numReviews}
                      </p>
                    </div>
                    <div className="text-xs"> 
                      <p className="flex items-center">
                        <FaStar className="mr-1" /> Ratings: {Math.round(rating)}
                      </p>
                      <p className="flex items-center mt-2">
                        <FaShoppingCart className="mr-1" /> Quantity: {quantity}
                      </p>
                      <p className="flex items-center mt-2">
                        <FaBox className="mr-1" /> In Stock: {countInStock}
                      </p>
                    </div>
                    
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      );
      
}

export default ProductCarousil;
