import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice"
import favoriteReducer from "./features/favorite/favoriteSlice"
import { getFavoritesFromLocalStorage } from "../Utils/localStorage";
import cartReducer from './features/cart/cartSlice'
import shopSliceReducer from './features/shop/shopSlice'


const initialFavourites = getFavoritesFromLocalStorage() || []

const store = configureStore({

    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        favorites: favoriteReducer,
        cart: cartReducer,
        shop: shopSliceReducer,
    },

    preloadedState: {
        favorites: initialFavourites,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

setupListeners(store.dispatch)
export default store;