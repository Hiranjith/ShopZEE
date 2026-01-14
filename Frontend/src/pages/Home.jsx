import React from 'react';
import { useParams } from 'react-router';
import { useGetPageProductsQuery } from '../redux/api/productApiSlice';
import Loader from '../components/Loader';
import Header from '../components/Header';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import Product from './Products/Product';



const Home = () => {
    // const {keyword} = useParams();
    // {keyword: keyword || ''}
    const { data, isLoading, isError, error } = useGetPageProductsQuery()






    return (
        <>
            {
                <Header />
            }
            {
                isLoading ? (<Loader />) : isError ? (
                    <Message variant="danger">
                        {error?.data?.Message || error?.error}

                    </Message>
                ) : (
                    <>
                        <div className='bg-gray-400 flex justify-between items-center mt-10'>
                            <h1 className='font-Qfantasy ml-[15rem] mt-[1rem] text-[3rem]'>
                                Tops Picks
                            </h1>

                            <Link to='/shopping' className='bg-red-600 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[1rem]'>
                                Shop
                            </Link>
                        </div>

                        <div className="container mx-auto mt-8 px-4">
                            <div className="flex grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                                {data.products.map((product) => (
                                    <div key={product._id}>
                                        <Product product={product} />
                                    </div>
                                ))}
                            </div>
                        </div>


                    </>
                )
            }
        </>
    );
}
//{error?.data?.message || error?.message || 'Something went wrong'}

export default Home;
