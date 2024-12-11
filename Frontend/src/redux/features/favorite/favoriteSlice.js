import { createSlice } from "@reduxjs/toolkit"


const favoriteSlice = createSlice(
    {
        name: 'favorites',
        initialState: [],
        reducers: {
            addProductToFavorites : (state, action) => {
                //check if product is not already added to favorite and then add
                if (!state.some((product) => product._id === action.payload._id)) {
                    state.push(action.payload)
                }
            },

            removeProductFromFavorites: (state, action) => {
                //remove product from favorite by checking if the id of product to remove is present in favorite and then remove
                return state.filter((product) => product._id !== action.payload._id)
            },

            setFavorites: (state, action) => {
                // Set the favorites from localStorage
                return action.payload
            }
        }
    }
)

export const {addProductToFavorites, removeProductFromFavorites, setFavorites} = favoriteSlice.actions
export default favoriteSlice.reducer
export const  selectFavoriteProduct = (state) => state.favorites