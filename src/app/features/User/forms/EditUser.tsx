import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetUsersQuery, useUpdateUserMutation, useGetUserRolesQuery } from '../services/userApi';

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: users, isLoading, error } = useGetUsersQuery();
    const { data: rolesData, isLoading: rolesLoading } = useGetUserRolesQuery(undefined);
    const [updateUser] = useUpdateUserMutation();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role_id: '',
    });

    useEffect(() => {
        if (users && id) {
            const user = users.find((user: any) => user.id === parseInt(id));
            if (user) {
                setFormData({
                    name: user.name,
                    email: user.email,
                    role_id: user.roles[0]?.id || '', // pre-select current role
                });
            }
        }
    }, [users, id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const formPayload = new FormData();
            formPayload.append('name', formData.name);
            formPayload.append('email', formData.email);
            formPayload.append('role', formData.role_id); // match Postman field

            await updateUser({ formData: formPayload }).unwrap();
            navigate('/users/list');
        } catch (err) {
            console.error('Update failed:', err);
            alert('Error while updating user.');
        }
    };

    if (isLoading || rolesLoading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error loading user data</p>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300 p-6">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-8 border border-gray-200 animate-fadeIn">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Edit User</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter full name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter email address"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Role</label>
                        <select
                            name="role_id"
                            value={formData.role_id}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        >
                            <option value="" disabled>
                                Select Role
                            </option>
                            {rolesData?.roles?.map((role: any) => (
                                <option key={role.id} value={role.id}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-between mt-8">
                        <button
                            type="button"
                            onClick={() => navigate('/users/list')}
                            className="w-1/2 mr-3 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition duration-300"
                        >
                            Cancel
                        </button>
                        <button type="submit" className="w-1/2 ml-3 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-300">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUser;
