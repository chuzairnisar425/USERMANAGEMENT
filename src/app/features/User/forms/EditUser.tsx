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
                    role_id: user.roles[0]?.id || '',
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
            formPayload.append('role', formData.role_id);

            await updateUser({ id, formData: formPayload }).unwrap(); // ✅ pass 'id'
            navigate('/users/list');
        } catch (err) {
            console.error('Update failed:', err);
            alert('Error while updating user.');
        }
    };

    if (isLoading || rolesLoading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error loading user data</p>;

    return (
        <div className="min-h-screen flex items-center justify-center  p-6">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-10 transition-all duration-500 animate-fade-in border border-blue-100">
                <h2 className="text-3xl font-extrabold text-center text-blue-500 mb-10">Edit User</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter user's full name"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter user's email"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300"
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">User Role</label>
                        <select
                            name="role_id"
                            value={formData.role_id}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300"
                        >
                            <option value="" disabled>
                                Select a role
                            </option>
                            {rolesData?.roles?.map((role: any) => (
                                <option key={role.id} value={role.id}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between pt-4">
                        <button
                            type="button"
                            onClick={() => navigate('/users/list')}
                            className="w-1/2 mr-3 py-3 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition duration-300 font-semibold"
                        >
                            Cancel
                        </button>
                        <button type="submit" className="w-1/2 ml-3 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUser;
