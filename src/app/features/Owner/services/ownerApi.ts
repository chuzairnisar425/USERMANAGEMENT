import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ownerApi = createApi({
    reducerPath: 'ownerApi',
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
    tagTypes: ['Owner'],
    endpoints: (builder) => ({
        // ✅ Get all owners
        getOwners: builder.query<Owner[], void>({
            query: () => 'owners/list',
            transformResponse: (response: { owners: Owner[] }) => response.owners,
            providesTags: (result) => (result ? [...result.map(({ id }) => ({ type: 'Owner' as const, id })), { type: 'Owner', id: 'LIST' }] : [{ type: 'Owner', id: 'LIST' }]),
        }),

        // ✅ Get owner by ID
        getOwnerById: builder.query({
            query: (id) => `owners/edit/${id}`,
            providesTags: (result, error, id) => [{ type: 'Owner', id }],
        }),

        // ✅ Add owner
        addOwner: builder.mutation({
            query: (newOwner) => ({
                url: 'owners/store',
                method: 'POST',
                body: newOwner,
            }),
            invalidatesTags: [{ type: 'Owner', id: 'LIST' }],
        }),

        // ✅ Update owner
        updateOwner: builder.mutation({
            query: ({ id, ...updatedOwner }) => ({
                url: `owners/update/${id}`,
                method: 'POST',
                body: updatedOwner,
            }),
            invalidatesTags: ({ id }) => [
                { type: 'Owner', id },
                { type: 'Owner', id: 'LIST' },
            ],
        }),

        // ✅ Delete owner
        deleteOwner: builder.mutation({
            query: (id) => ({
                url: `owners/delete/${id}`,
                method: 'GET',
            }),
            invalidatesTags: (id) => [
                { type: 'Owner', id },
                { type: 'Owner', id: 'LIST' },
            ],
        }),
    }),
});

export const { useGetOwnersQuery, useGetOwnerByIdQuery, useAddOwnerMutation, useUpdateOwnerMutation, useDeleteOwnerMutation } = ownerApi;
