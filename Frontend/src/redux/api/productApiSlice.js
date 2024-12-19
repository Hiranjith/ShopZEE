import {apiSlice} from './apiSlice'
import { PRODUCT_URL, UPLOAD_URL } from '../constants'

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCT_URL}`,
                method: 'POST',
                body: data,
                credentials: 'include',
            }),
            invalidatesTags: ['CategoryProduct']
        }),

        updateProduct: builder.mutation({
            query: ({productId, formData}) => ({
                url: `${PRODUCT_URL}/${productId}`,
                method: 'PUT',
                body: formData,
                credentials: 'include',
            }),
        }),

        getProductById: builder.query({
            query: (productId) => ({
                url: `${PRODUCT_URL}/${productId}`,
            }),
            providesTags: (result, error, productId) => [
                {type: 'Product', id: productId},
            ]
        }),

        getAllProducts: builder.query({
            query: () => ({
                url: `${PRODUCT_URL}/fetchAllProducts`,
            }),
        }),

        getPageProducts: builder.query({
            query: (keyword) => ({
                url: `${PRODUCT_URL}/fetchProductsForPage`,
                params: {keyword},
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Products']
        }),

        deleteProduct: builder.mutation({
            query: (productId) =>  ({
                url: `${PRODUCT_URL}/${productId}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            providesTags: ['Product'],
        }),

        createReview: builder.mutation({
            query: (data) => ({
                url: `${PRODUCT_URL}/${data.productId}/addReview`,
                method: 'POST',
                body: data,
                credentials: 'include',
            }),
        }),

        getTopProducts: builder.query({
            query: () => `${PRODUCT_URL}/filterByTopProduct`,
            keepUnusedDataFor: 5,
        }),

        getNewProducts: builder.query({
            query: () => `${PRODUCT_URL}/filterByNewProduct`,
            keepUnusedDataFor: 5,
        }),

        uploadProductImaage: builder.mutation({
            query: (data) => ({
                url: `${UPLOAD_URL}`,
                method: 'POST',
                body: data,
            }),
        }),

        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCT_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5,
        }),

        getFilteredProducts: builder.query({
            query: ({checked, radio}) => ({
                url: `${PRODUCT_URL}/filterProducts`,
                method: 'POST',
                body: {checked, radio}
            })
        })
    }),
})

export const {
    useCreateProductMutation,
    useGetAllProductsQuery,
    useUpdateProductMutation,
    useGetProductByIdQuery,
    useGetPageProductsQuery,
    useDeleteProductMutation,
    useCreateReviewMutation,
    useGetTopProductsQuery,
    useGetNewProductsQuery,
    useUploadProductImaageMutation,
    useGetProductDetailsQuery,
    useGetFilteredProductsQuery,
} = productApiSlice;