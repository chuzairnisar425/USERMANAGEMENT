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
    tagTypes: ['User', 'Roles'],
    endpoints: (builder) => ({
        // ✅ Get all users
        getUsers: builder.query<User[], void>({
            query: () => 'users/list',
            transformResponse: (response: { users: User[] }) => response.users,
            providesTags: (result) => (result ? [...result.map(({ id }) => ({ type: 'User' as const, id })), { type: 'User' as const, id: 'LIST' }] : [{ type: 'User' as const, id: 'LIST' }]),
        }),

        // ✅ Get user by ID
        getUserById: builder.query({
            query: (id) => `users/edit/${id}`,
            providesTags: (result, error, id) => [{ type: 'User', id }],
        }),

        // ✅ Add user
        addUser: builder.mutation({
            query: (newUser) => ({
                url: 'users/store',
                method: 'POST',
                body: newUser,
            }),
            invalidatesTags: [{ type: 'User', id: 'LIST' }],
        }),

        // ✅ Update user
        updateUser: builder.mutation({
            query: ({ id, ...updatedUser }) => ({
                url: `users/update/${id}`,
                method: 'POST',
                body: updatedUser,
            }),
            invalidatesTags: ({ id }) => [
                { type: 'User', id },
                { type: 'User', id: 'LIST' },
            ],
        }),

        // ✅ Delete user
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `users/delete/${id}`,
                method: 'GET',
            }),
            invalidatesTags: (id) => [
                { type: 'User', id },
                { type: 'User', id: 'LIST' },
            ],
        }),

        // ✅ Login
        login: builder.mutation({
            query: (credentials) => ({
                url: 'auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),

        // ✅ Get User Roles
        getUserRoles: builder.query({
            query: () => 'user/add',
            providesTags: ['Roles'], // if you want caching/invalidation by Roles tag
        }),
    }),
});

export const { useGetUsersQuery, useGetUserByIdQuery, useAddUserMutation, useUpdateUserMutation, useDeleteUserMutation, useLoginMutation, useGetUserRolesQuery } = userApi;
