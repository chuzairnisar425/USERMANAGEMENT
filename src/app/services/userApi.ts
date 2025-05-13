import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api/',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        // ✅ Fetch all users
        getUsers: builder.query({
            query: () => 'users/list',
            transformResponse: (response) => response.users, // Update here to access 'users' key
            providesTags: ['User'],
        }),

        // ✅ Get single user by ID
        getUserById: builder.query({
            query: (id) => `users/edit/${id}`,
            providesTags: (result, error, id) => [{ type: 'User', id }],
        }),

        // ✅ Add new user
        addUser: builder.mutation({
            query: (newUser) => ({
                url: 'users/store',
                method: 'POST',
                body: newUser,
            }),
            invalidatesTags: ['User'],
        }),

        // ✅ Update existing user
        updateUser: builder.mutation({
            query: ({ id, ...updatedUser }) => ({
                url: `users/update/${id}`,
                method: 'POST', // using POST because of Laravel's setup
                body: updatedUser,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
        }),

        // ✅ Delete user
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `users/delete/${id}`,
                method: 'GET', // your Laravel route uses GET for deletion
            }),
            invalidatesTags: ['User'],
        }),

        // ✅ Login
        login: builder.mutation({
            query: (credentials) => ({
                url: 'auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});

// 👉 Export all hooks
export const { useGetUsersQuery, useGetUserByIdQuery, useAddUserMutation, useUpdateUserMutation, useDeleteUserMutation, useLoginMutation } = userApi;
