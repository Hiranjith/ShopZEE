import React from 'react';
import { useSelector} from 'react-redux';
import { selectFavoriteProduct} from '../../redux/features/favorite/favoriteSlice';
import Product from './Product';
    

const Favourites = () => {

    // const favorites = getFavoritesFromLocalStorage();
    const favorites = useSelector(selectFavoriteProduct)
    // const favorites = useSelector((state) => state.favorites) || [];
    return (
        <>
            <div  className="ml-[10rem] pt-16">
                <h1 className="text-lg font-bold ml-[3rem] mt-[3rem]">
                    FAVORITE PRODUCTS
                </h1>

                <div className="flex flex-wrap">
                    {
                       favorites.length === 0 ? (
                        <p className='text-lg font-bold ml-[3rem] mt-[3rem]'>
                            No favourites items found
                        </p>
                       ) : (
                        favorites.map((product) => (
                            <Product key={product._id} product={product}/>
                        ))
                       )
                    }
                </div>
            </div>
        </>
    );
}

export default Favourites;
