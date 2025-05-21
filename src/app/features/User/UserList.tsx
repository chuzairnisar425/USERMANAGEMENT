import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteUserMutation, useGetUsersQuery } from './services/userApi';
import { useAuth } from '../../context/authContext';
import IconTrash from '../../../_theme/components/Icon/IconTrash';
import IconEdit from '../../../_theme/components/Icon/IconEdit';
import IconPlusCircle from '../../../_theme/components/Icon/IconPlusCircle';
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
                refetch();
            } catch (err) {
                console.error('Error deleting user:', err);
                alert('Something went wrong!');
            } finally {
                setDeletingUserId(null);
            }
        }
    };

    if (isLoading) {
        return (
            <div className="w-full px-2 sm:px-4 md:px-6 pb-10">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                    <Skeleton height={32} width={200} />
                    <Skeleton height={40} width={120} />
                </div>
                <div className="overflow-x-auto">
                    <div className="min-w-[600px] overflow-auto rounded-xl shadow-md border border-gray-200 bg-white">
                        <table className="w-full text-xs sm:text-sm md:text-base">
                            <thead className="bg-gradient-to-r from-blue-200 to-blue-500 text-gray-800">
                                <tr>
                                    <th className="py-4 px-6 text-center font-semibold">#</th>
                                    <th className="py-4 px-6 text-center font-semibold">Name</th>
                                    <th className="py-4 px-6 text-center font-semibold">Email</th>
                                    <th className="py-4 px-6 text-center font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[...Array(2)].map((_, i) => (
                                    <tr key={i} className="border-b border-gray-100">
                                        <td className="py-2 px-2 sm:py-4 sm:px-6 text-center">
                                            <Skeleton width={20} />
                                        </td>
                                        <td className="py-2 px-2 sm:py-4 sm:px-6 text-center">
                                            <Skeleton width={100} />
                                        </td>
                                        <td className="py-2 px-2 sm:py-4 sm:px-6 text-center">
                                            <Skeleton width={180} />
                                        </td>
                                        <td className="py-2 px-2 sm:py-4 sm:px-6 text-center">
                                            <div className="flex justify-center gap-2 sm:gap-3">
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
            </div>
        );
    }

    if (error) {
        return <p className="text-center text-red-500 font-semibold">Error loading users. Please try again.</p>;
    }

    return (
        <div className="w-full px-2 sm:px-4 md:px-6 pb-10">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700">User Management</h2>
                {hasPermission('user:create') && (
                    <button
                        onClick={() => navigate('/users/add')}
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg shadow transition duration-300 whitespace-nowrap"
                    >
                        <IconPlusCircle />
                        <span className="hidden sm:inline">Add User</span>
                    </button>
                )}
            </div>

            <div className="overflow-x-auto">
                <div className="min-w-[600px] overflow-auto rounded-xl shadow-md border border-gray-200 bg-white">
                    <table className="w-full text-xs sm:text-sm md:text-base">
                        <thead className="bg-gradient-to-r from-blue-200 to-blue-500 text-gray-800">
                            <tr>
                                <th className="py-4 px-6 text-center font-semibold">#</th>
                                <th className="py-4 px-6 text-center font-semibold">Name</th>
                                <th className="py-4 px-6 text-center font-semibold">Email</th>
                                {(hasPermission('edit user') || hasPermission('delete user')) && <th className="py-4 px-6 text-center font-semibold">Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {users?.map((user: any, index: number) => (
                                <tr key={user.id} className="border-b border-gray-100 hover:bg-blue-50 transition duration-150">
                                    <td className="py-2 px-2 sm:py-4 sm:px-6 text-center text-gray-600">{index + 1}</td>
                                    <td className="py-2 px-2 sm:py-4 sm:px-6 text-center font-medium text-gray-700">{user.name}</td>
                                    <td className="py-2 px-2 sm:py-4 sm:px-6 text-center text-gray-600">{user.email}</td>
                                    {(hasPermission('edit user') || hasPermission('delete user')) && (
                                        <td className="py-2 px-2 sm:py-4 sm:px-6 text-center">
                                            <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
                                                {hasPermission('edit user') && (
                                                    <button
                                                        onClick={() => navigate(`/users/edit/${user.id}`)}
                                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md flex items-center gap-1 transition whitespace-nowrap"
                                                        title="Edit User"
                                                    >
                                                        <IconEdit />
                                                        <span className="hidden sm:inline">Edit</span>
                                                    </button>
                                                )}
                                                {hasPermission('delete user') && (
                                                    <button
                                                        onClick={() => handleDelete(user.id, user.name)}
                                                        className={`${
                                                            deletingUserId === user.id ? 'bg-red-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
                                                        } text-white px-3 py-1 rounded-md flex items-center gap-1 transition whitespace-nowrap`}
                                                        disabled={deletingUserId === user.id}
                                                        title="Delete User"
                                                    >
                                                        <IconTrash />
                                                        <span className="hidden sm:inline">{deletingUserId === user.id ? 'Deleting...' : 'Delete'}</span>
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserList;
