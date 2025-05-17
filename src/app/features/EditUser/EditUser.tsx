import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetRoleByIdQuery, useUpdateUserMutation } from '../../services/userApi';

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: user, isLoading, error } = useGetRoleByIdQuery(id);
    const [updateUser] = useUpdateUserMutation();

    const [formData, setFormData] = useState({ name: '', email: '' });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user?.name || '',
                email: user?.email || '',
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateUser({ id: parseInt(id!), ...formData }).unwrap();
            navigate('/');
        } catch (err) {
            console.error('Update failed:', err);
            alert('Update failed. Please check your inputs.');
        }
    };

    if (isLoading) return <p className="text-center text-gray-500">Loading user data...</p>;
    if (error) return <p className="text-center text-red-500">Error fetching user data.</p>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-200 p-6">
            <div className="bg-white w-full max-w-2xl p-10 rounded-xl shadow-lg border border-blue-100 animate-fadeIn">
                <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-8">Update User Info</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Full name"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email address"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div className="flex justify-between gap-4 mt-8">
                        <button type="button" onClick={() => navigate('/')} className="w-1/2 py-3 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300 transition duration-300">
                            Cancel
                        </button>
                        <button type="submit" className="w-1/2 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUser;
