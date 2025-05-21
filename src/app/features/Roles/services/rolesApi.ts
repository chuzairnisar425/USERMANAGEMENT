import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rolesApi = createApi({
    reducerPath: 'rolesApi',
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
    tagTypes: ['Roles'],
    endpoints: (builder) => ({
        // ✅ Get all roles
        getRoles: builder.query({
            query: () => 'roles/list',
            providesTags: (result) => (result ? [...result.roles.map(({ id }) => ({ type: 'Roles', id })), { type: 'Roles', id: 'LIST' }] : [{ type: 'Roles', id: 'LIST' }]),
        }),

        // ✅ Get role by ID
        getRoleById: builder.query({
            query: (id) => `roles/edit/${id}`,
            providesTags: (result, error, id) => [{ type: 'Roles', id }],
        }),

        // ✅ Delete role
        deleteRole: builder.mutation({
            query: (roleId) => ({
                url: `roles/delete/${roleId}`,
                method: 'GET',
            }),
            invalidatesTags: (result, error, roleId) => [
                { type: 'Roles', id: roleId },
                { type: 'Roles', id: 'LIST' },
            ],
        }),

        // ✅ Add role
        addRole: builder.mutation({
            query: (formData) => ({
                url: 'roles/store',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: [{ type: 'Roles', id: 'LIST' }],
        }),

        // ✅ Update role
        updateRole: builder.mutation({
            query: ({ roleId, formData }) => ({
                url: `roles/update/${roleId}`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: (result, error, { roleId }) => [
                { type: 'Roles', id: roleId },
                { type: 'Roles', id: 'LIST' },
            ],
        }),

        // ✅ Get available permissions
        getPermissions: builder.query({
            query: () => 'roles/permissions',
            providesTags: ['Roles'],
        }),
    }),
});

export const {
    useGetRolesQuery,
    useGetRoleByIdQuery, // ✅ Export the new hook here
    useDeleteRoleMutation,
    useAddRoleMutation,
    useUpdateRoleMutation,
    useGetPermissionsQuery,
} = rolesApi;

export default rolesApi;
