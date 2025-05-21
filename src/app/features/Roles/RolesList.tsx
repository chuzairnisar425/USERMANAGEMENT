import React, { useState } from 'react';
import { useGetRolesQuery, useGetPermissionsQuery, useAddRoleMutation, useUpdateRoleMutation, useDeleteRoleMutation } from './services/rolesApi';
import { toast } from 'react-toastify';

const RolesList = () => {
    const { data: rolesData, isLoading: rolesLoading, refetch } = useGetRolesQuery(null);
    const { data: permissionsData, isLoading: permsLoading } = useGetPermissionsQuery(null);

    const [addRole] = useAddRoleMutation();
    const [updateRole] = useUpdateRoleMutation();
    const [deleteRole] = useDeleteRoleMutation();

    const [roleName, setRoleName] = useState('');
    const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
    const [editMode, setEditMode] = useState(false);
    const [editRoleId, setEditRoleId] = useState<number | null>(null);

    const handlePermissionToggle = (id: number) => {
        setSelectedPermissions((prev) => (prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = { name: roleName, permissions: selectedPermissions };

        try {
            if (editMode && editRoleId !== null) {
                await updateRole({ roleId: editRoleId, formData }).unwrap();
                toast.success('Role updated successfully!');
            } else {
                await addRole(formData).unwrap();
                toast.success('Role added successfully!');
            }

            setRoleName('');
            setSelectedPermissions([]);
            setEditMode(false);
            setEditRoleId(null);
            refetch();
        } catch (error: any) {
            toast.error(error?.data?.message || 'Something went wrong');
        }
    };

    const handleEdit = (role: any) => {
        setRoleName(role.name);
        setSelectedPermissions(role.permissions.map((perm: any) => perm.id));
        setEditMode(true);
        setEditRoleId(role.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: number) => {
        const confirm = window.confirm('Are you sure you want to delete this role?');
        if (!confirm) return;

        try {
            await deleteRole(id).unwrap();
            toast.success('Role deleted successfully!');
            refetch();
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to delete role');
        }
    };

    if (rolesLoading || permsLoading) {
        return (
            <div className="flex justify-center items-center min-h-[300px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b pb-2">{editMode ? 'Edit Role' : 'Create New Role'}</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                <input
                    type="text"
                    placeholder="Role Name"
                    className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    required
                />

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {permissionsData?.permissions?.map((perm: any) => (
                        <label key={perm.id} className="flex items-center space-x-2 text-sm bg-gray-50 border p-2 rounded">
                            <input type="checkbox" checked={selectedPermissions.includes(perm.id)} onChange={() => handlePermissionToggle(perm.id)} />
                            <span>{perm.name}</span>
                        </label>
                    ))}
                </div>

                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
                    {editMode ? 'Update Role' : 'Add Role'}
                </button>
            </form>

            <div className="mt-10">
                <h3 className="text-2xl font-semibold mb-4 text-gray-700">Roles List</h3>
                {rolesData?.roles?.length === 0 ? (
                    <p>No roles found.</p>
                ) : (
                    <div className="grid md:grid-cols-2 gap-5">
                        {rolesData?.roles?.map((role: any) => (
                            <div key={role.id} className="border border-gray-200 p-5 rounded-lg bg-gradient-to-r from-blue-50 to-white shadow hover:shadow-lg transition-all duration-300">
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="text-xl font-bold text-gray-800">{role.name}</h4>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleEdit(role)} className="px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600 transition">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(role.id)} className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Permissions:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {role.permissions.length > 0 ? (
                                            role.permissions.map((perm: any) => (
                                                <span key={perm.id} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                                    {perm.name}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-sm text-gray-500 italic">No permissions assigned</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RolesList;
