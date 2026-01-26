import React from 'react';
import { useGetTopProductsQuery } from '../redux/api/productApiSlice';
import Loader from './Loader';
import SmallProducts from '../pages/Products/SmallProducts';
import ProductCarousil from '../pages/Products/ProductCarousil';


const Header = () => {

    const { data: products, isLoading, isError } = useGetTopProductsQuery();

    if (isLoading) {
        return <Loader />
    }

    if (isError) {
        return <h2>Error</h2>
    }

    return (
        <>
            <div className="flex justify-center items-start pt-20">
                <div className="xl:block lg:hidden md:hidden sm:hidden">
                    <div className="grid lg:w-[30rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                        {products.slice(0, 4).map((product) => (
                            <div key={product._id}>
                                <SmallProducts product={product} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='lg:ml-5 md:ml-5 w-full lg:w-auto md:w-auto px-4 lg:px-0'>
                    <ProductCarousil />

                </div>
            </div>
        </>
    );


}

export default Header;
