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
                        <div className='flex flex-col lg:flex-row justify-between items-center mt-10 px-4'>
                            <h1 className='font-Qfantasy text-[3rem] text-deep-slate lg:ml-[15rem] text-center lg:text-left'>
                                Tops Picks
                            </h1>

                            <Link to='/shopping' className='bg-deep-slate text-white font-bold rounded-full py-2 px-10 mt-4 lg:mt-[1rem] lg:mr-[18rem] hover:bg-slate-800 transition-colors'>
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
