import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../../../Utils/cartUtils"; 

const initialState = localStorage.getItem('cart') ? 
JSON.parse(localStorage.getItem('cart')) :
{cartItems : [], shippingAddress: {}, paymentMethod: 'PayPal'}


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const {user, rating, reviews, numReviews, ...item} = action.payload;
            const existItem = state.cartItems.find((p) => p._id === item._id);
            
            if(existItem){
                state.cartItems = state.cartItems.map((p) => p._id === existItem._id ? 
            item : p)
            }else{
                state.cartItems = [...state.cartItems, item]
            }

            return updateCart(state, item)
        },

        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((c) => c._id !== action.payload)
            return updateCart(state)
        },

        clearCart : (state, action) => {
            state.cartItems = []
            localStorage.setItem('cart', JSON.stringify(state))
        },

        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload
            localStorage.setItem('cart', JSON.stringify(state))
        },

        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload
            localStorage.setItem('cart', JSON.stringify(state))
        },

        resetCart: (state) => (state = initialState)


    }
})

export const {addToCart, 
              removeFromCart, 
              clearCart, 
              saveShippingAddress,
              savePaymentMethod, 
              resetCart, 
} = cartSlice.actions

export default cartSlice.reducer