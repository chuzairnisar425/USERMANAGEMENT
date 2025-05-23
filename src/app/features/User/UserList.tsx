import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteUserMutation, useGetUsersQuery } from './services/userApi';
import { useAuth } from '../../context/authContext';
import { toast } from 'react-toastify';
import IconTrash from '../../../_theme/components/Icon/IconTrash';
import IconEdit from '../../../_theme/components/Icon/IconEdit';
import IconPlus from '../../../_theme/components/Icon/IconPlus';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const UserList = () => {
    const navigate = useNavigate();
    const { data: users, isLoading, error, refetch } = useGetUsersQuery();
    const [deleteUser] = useDeleteUserMutation();
    const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
    const { hasPermission } = useAuth();

    const handleDelete = async (id: string, name: string) => {
        if (window.confirm(`Are you sure you want to delete ${name}?`)) {
            try {
                setDeletingUserId(id);
                await deleteUser(id).unwrap();
                toast.success('User deleted successfully!');
                refetch();
            } catch (err) {
                console.error('Error deleting user:', err);
                toast.error('Failed to delete user.');
            } finally {
                setDeletingUserId(null);
            }
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto p-6 mt-10 bg-white shadow-md rounded-lg">
                <div className="flex justify-between items-center mb-6">
                    <Skeleton width={200} height={32} />
                    <Skeleton width={120} height={40} />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse">
                        <thead className="bg-gray-100">
                            <tr className="text-left">
                                <th className="px-4 py-3 border-b">#</th>
                                <th className="px-4 py-3 border-b">Name</th>
                                <th className="px-4 py-3 border-b">Email</th>
                                <th className="px-4 py-3 border-b text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(2)].map((_, i) => (
                                <tr key={i} className="hover:bg-gray-50 transition">
                                    <td className="px-4 py-2 border-b">
                                        <Skeleton width={20} />
                                    </td>
                                    <td className="px-4 py-2 border-b">
                                        <Skeleton width={100} />
                                    </td>
                                    <td className="px-4 py-2 border-b">
                                        <Skeleton width={180} />
                                    </td>
                                    <td className="px-4 py-2 border-b text-center">
                                        <div className="flex justify-center gap-2">
                                            <Skeleton width={60} height={32} />
                                            <Skeleton width={60} height={32} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="text-center py-10 text-red-600">Error loading users.</div>;
    }

    return (
        <div className="max-w-7xl mx-auto p-6  bg-white shadow-md rounded-lg">
            <div className="flex justify-between items-center ">
                <h2 className="text-2xl font-semibold text-gray-800">Users List</h2>
                {hasPermission('add user') && (
                    <button onClick={() => navigate('/users/add')} className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                        <IconPlus className="mr-2" />
                        Add User
                    </button>
                )}
            </div>
            <p>Manage all application users</p>
            <div className="overflow-x-auto mt-4">
                <table className="w-full table-auto border-collapse">
                    <thead className="bg-gray-100">
                        <tr className="text-left">
                            <th className="px-4 py-3 border-b">#</th>
                            <th className="px-4 py-3 border-b">Name</th>
                            <th className="px-4 py-3 border-b">Email</th>
                            <th className="px-4 py-3 border-b">Role</th>
                            <th className="px-4 py-3 border-b text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user, index) => (
                            <tr key={user.id} className="hover:bg-gray-50 transition">
                                <td className="px-4 py-2 border-b">{index + 1}</td>
                                <td className="px-4 py-2 border-b">{user.name}</td>
                                <td className="px-4 py-2 border-b">{user.email}</td>
                                <td className="px-4 py-2 border-b ">
                                    {' '}
                                    <span className="bg-blue-200 text-blue-600 p-1 rounded-md font-bold">{user.roles[0]?.name}</span>
                                </td>
                                <td className="px-4 py-2 border-b text-center">
                                    <div className="flex justify-center ">
                                        <button
                                            onClick={() => navigate(`/users/edit/${user.id}`)}
                                            className=" text-blue-500 text-bold hover:text-blue-600  rounded-md flex items-center gap-1 transition"
                                        >
                                            <IconEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.id, user.name)}
                                            disabled={deletingUserId === user.id}
                                            className=" text-red-500 hover:text-red-600 px-3 py-1 rounded-md flex items-center gap-1 transition"
                                        >
                                            <IconTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;
