import { apiSlice } from "./apiSlice";
import { BASE_URL, USERS_URL } from "../constants";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) =>( {
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data,
            }),
        }),

        logout: builder.mutation({
            query: () =>({
                url: `${USERS_URL}/logout`,
                method: 'POST',
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
                //credentials: 'include',
            }),
        }),

        getUsers: builder.query({
            query:() => ({
                url: USERS_URL,
            }),
            providesTags: ['User'],
            keepUnusedDataFor: 5,
        }),

        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
                method: 'DELETE',
            }),
        }),

        updateUserDetails: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/${data.userId}`,
                method: 'PUT',
                body: data,
                //credentials: 'include',
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const {useLoginMutation, useLogoutMutation, useRegisterMutation, 
              useProfileMutation, useGetUsersQuery, useDeleteUserMutation,
              useUpdateUserDetailsMutation
} = userApiSlice;