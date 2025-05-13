import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImage from '../../../../public/assets/images/login.png';
import IconMail from '../../../_theme/components/Icon/IconMail';
import IconLock from '../../../_theme/components/Icon/IconLock';
import { useAuth } from '../../context/authContext';
import { useLoginMutation } from '../../services/userApi';
// import { useLoginMutation } from '../../redux/api/userApi'; // Update the import path as needed

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const [loginUser, { isLoading }] = useLoginMutation();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await loginUser({ email, password }).unwrap(); // unwrap to handle errors
            const { user, token } = response.data; // Assuming response structure is { data: { user, token } }
            login({ user, token });
            localStorage.setItem('token', token); // Store token for future authenticated requests
            navigate('/');
        } catch (err) {
            if (err?.data?.message) {
                setError(err.data.message);
            } else {
                setError('Login failed. Please try again.');
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <div className="md:w-1/2 flex items-center justify-center p-10">
                <img src={loginImage} alt="Login Illustration" className="w-full max-w-md" />
            </div>

            <div className="md:w-1/2 flex items-center justify-center p-8">
                <form onSubmit={handleLogin} className="w-full max-w-md">
                    <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">Sign In to Your Account</h2>

                    {error && <p className="text-red-500 mb-4 text-center font-medium">{error}</p>}

                    {/* Email Input */}
                    <div className="mb-4 relative">
                        <label className="block text-gray-700 mb-1">Email</label>
                        <div className="flex items-center border rounded focus-within:ring-2 focus-within:ring-blue-500">
                            <span className="pl-3 text-gray-500">
                                <IconMail className="w-5 h-5" />
                            </span>
                            <input
                                type="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="you@email.com"
                                className="w-full px-3 py-2 focus:outline-none rounded-r"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="mb-4 relative">
                        <label className="block text-gray-700 mb-1">Password</label>
                        <div className="flex items-center border border-gray-300 rounded px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-blue-400">
                            <IconLock className="text-gray-500 mr-2 w-5 h-5" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                className="w-full focus:outline-none"
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-sm text-blue-600 hover:underline ml-2 focus:outline-none">
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>

                    <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300">
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
