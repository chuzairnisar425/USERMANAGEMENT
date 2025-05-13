import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteUserMutation, useGetUsersQuery } from '../../services/userApi';

const UserList = () => {
    const navigate = useNavigate();
    const { data: users, isLoading, error, refetch } = useGetUsersQuery();
    const [deleteUser] = useDeleteUserMutation();
    const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

    const handleDelete = async (id: string, name: string) => {
        if (window.confirm(`Are you sure you want to delete ${name}?`)) {
            try {
                setDeletingUserId(id); // Set the ID of the user being deleted
                await deleteUser(id).unwrap();
                refetch();
                setDeletingUserId(null); // Reset the deleting state after successful deletion
            } catch (err) {
                console.error('Error deleting user:', err);
                alert('Something went wrong!');
                setDeletingUserId(null); // Reset if there was an error
            }
        }
    };

    if (isLoading) return <p className="text-center text-lg text-gray-500">Loading users...</p>;
    if (error) return <p className="text-center text-red-500">Error loading users.</p>;

    return (
        <div className="overflow-x-auto px-6 pb-10">
            <div className="overflow-hidden rounded-lg shadow-lg bg-white">
                <table className="min-w-full border-collapse text-gray-700">
                    <thead className="bg-gradient-to-r from-blue-100 to-blue-300 text-left text-lg text-gray-800">
                        <tr>
                            <th className="py-3 px-6 text-center font-medium">#</th>
                            <th className="py-3 px-6 text-center font-medium">Name</th>
                            <th className="py-3 px-6 text-center font-medium">Email</th>
                            <th className="py-3 px-6 text-center font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user: any, index: number) => (
                            <tr key={user.id} className="hover:bg-gray-50 transition duration-200">
                                <td className="py-3 px-6 text-center">{index + 1}</td>
                                <td className="py-3 px-6 text-center font-medium">{user.name}</td>
                                <td className="py-3 px-6 text-center">{user.email}</td>
                                <td className="py-3 px-6 text-center space-x-2">
                                    <button onClick={() => navigate(`/users/edit/${user.id}`)} className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user.id, user.name)}
                                        className={`${
                                            deletingUserId === user.id ? 'opacity-50 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
                                        } text-white px-6 py-2 rounded-md transition duration-300`}
                                        disabled={deletingUserId === user.id}
                                    >
                                        {deletingUserId === user.id ? 'Deleting...' : 'Delete'}
                                    </button>
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
