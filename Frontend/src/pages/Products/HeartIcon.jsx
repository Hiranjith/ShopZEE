import React, { useEffect } from 'react';
 import { useDispatch, useSelector } from 'react-redux';
import { addFavoritesToLocalStorage, 
    getFavoritesFromLocalStorage, 
    removeFavoritesFromLocalStorage} from '../../Utils/localStorage';
import { addProductToFavorites, 
    removeProductFromFavorites, 
    setFavorites} from '../../redux/features/favorite/favoriteSlice';
 import { FaHeart, FaRegHeart, FaVaadin } from "react-icons/fa";


 const HeartIcon = ({ product }) => {
    const favorites = useSelector((state) => state.favorites) || [];
    const dispatch = useDispatch();
    const isFavorite = favorites.some((p) => p._id === product._id);

    useEffect(() => {
        const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
        if (favoritesFromLocalStorage) {
            dispatch(setFavorites(favoritesFromLocalStorage))
        }
    }, [])

    const toggleFavorite = () => {
        if (isFavorite) {
            //redux function
            dispatch(removeProductFromFavorites(product))
            //remove from local storage
            removeFavoritesFromLocalStorage(product._id)
        }else{
            dispatch(addProductToFavorites(product))
            addFavoritesToLocalStorage(product)
        }
    }
        


    return (
        <div  className="absolute top-2 right-5 cursor-pointer" 
        onClick={toggleFavorite}>
            {isFavorite ? (
                <FaHeart className="text-pink-500" />
            ) : (
                <FaRegHeart className='text-black' />
            )}
        </div>
    );

};

export default HeartIcon;
