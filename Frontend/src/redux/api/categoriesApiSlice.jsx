import { BASE_URL, CATEGORY_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const categoriesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCategory: builder.mutation({
            query: (data) => ({
                url: `${CATEGORY_URL}`,
                method: 'POST',
                body: data,
            }),
        }),

        getAllCategories: builder.query({
            query: () => ({
                url: `${CATEGORY_URL}/listCategories`,
            }),
        }),

        updateCategory: builder.mutation({
            query: (data) => ({
                url: `${CATEGORY_URL}/${data._id}`,
                method: 'PUT',
                body: data,
            }),
        }),

        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `${CATEGORY_URL}/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const {useCreateCategoryMutation, 
    useGetAllCategoriesQuery, 
    useUpdateCategoryMutation, 
    useDeleteCategoryMutation, 
} = categoriesApiSlice;