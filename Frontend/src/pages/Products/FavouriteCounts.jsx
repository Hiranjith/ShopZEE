import React from 'react';
import { useSelector } from 'react-redux';
import { selectFavoriteProduct } from '../../redux/features/favorite/favoriteSlice';
selectFavoriteProduct


const FavouriteCounts = () => {

    const favorite = useSelector(selectFavoriteProduct)
    const fCount = favorite.length
    console.log("count is ", fCount);
    
    return (
        <div className="absolute left-2 top-8">
            {fCount > 0 && (
                <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                    {fCount}
                </span>
            )}
        </div>
    );
}

export default FavouriteCounts;
