import { apiSlice } from "./apiSlice";
import { BASE_URL, USERS_URL } from "../constants";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) =>( {
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data,
                credentials: 'include'
            }),
        }),

        logout: builder.mutation({
            query: () =>({
                url: `${USERS_URL}/logout`,
                method: 'POST',
                credentials: 'include'
            }),
        }),

        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data,
            }),
        }),

        profile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data,
                credentials: 'include',
            }),
        }),

        getUsers: builder.query({
            query:() => ({
                url: USERS_URL,
                credentials: 'include',
            }),
            providesTags: ['User'],
            keepUnusedDataFor: 5,
        }),

        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
                method: 'DELETE',
                credentials: 'include',
            }),
        }),

        updateUserDetails: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/${data.userId}`,
                method: 'PUT',
                body: data,
                credentials: 'include',
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const {useLoginMutation, useLogoutMutation, useRegisterMutation, 
              useProfileMutation, useGetUsersQuery, useDeleteUserMutation,
              useUpdateUserDetailsMutation
} = userApiSlice;