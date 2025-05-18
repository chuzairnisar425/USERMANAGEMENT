import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddUserMutation } from '../../services/userApi';

const AddUser = () => {
    const [userData, setUserData] = useState({ name: '', email: '', password: '' });
    const [addUser, { isLoading, isError, error }] = useAddUserMutation();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = userData;
        if (!name || !email || !password) {
            alert('Please fill all fields');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('role', '1');

        try {
            await addUser(formData).unwrap();
            navigate('/');
        } catch (err) {
            console.error('Add user failed:', err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300">
            <div className="max-w-xl mx-auto p-10  ">
                <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100 transition-transform hover:scale-[1.01] duration-300 ease-in-out">
                    <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">🚀 Add New User</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-2">Full Name</label>
                            <input
                                name="name"
                                type="text"
                                value={userData.name}
                                onChange={handleChange}
                                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                placeholder="e.g. John Doe"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-2">Email Address</label>
                            <input
                                name="email"
                                type="email"
                                value={userData.email}
                                onChange={handleChange}
                                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                placeholder="e.g. john@example.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-2">Password</label>
                            <input
                                name="password"
                                type="password"
                                value={userData.password}
                                onChange={handleChange}
                                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                placeholder="********"
                                required
                            />
                        </div>

                        {isError && <p className="text-red-500 text-sm animate-pulse">⚠️ Error: {error?.data?.message || 'Something went wrong while adding user.'}</p>}

                        <div className="flex justify-between items-center mt-6">
                            <button type="button" onClick={() => navigate('/')} className="px-5 py-2.5 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition">
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`px-6 py-3 text-white rounded-xl font-medium shadow-md transition duration-300 ${
                                    isLoading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                                }`}
                            >
                                {isLoading ? 'Adding...' : 'Add User'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddUser;
