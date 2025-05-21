import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImage from '../../../../public/assets/images/login.png';
import IconMail from '../../../_theme/components/Icon/IconMail';
import IconLock from '../../../_theme/components/Icon/IconLock';
import { useAuth } from '../../context/authContext';
import { useLoginMutation } from '../../features/User/services/userApi';

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
            const response = await loginUser({ email, password }).unwrap();
            const { user, token } = response.data;

            // Set auth context
            login(token, user);

            // Delay navigation slightly to allow context state to propagate
            setTimeout(() => {
                navigate('/');
            }, 50); // even 10ms is enough, 50ms is safe
        } catch (err) {
            setError(err?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="w-full min-h-screen flex flex-col md:flex-row shadow-lg overflow-hidden bg-white">
                {/* Left Side Image */}
                <div className="md:w-1/2 hidden md:flex items-center justify-center bg-blue-400 relative">
                    <img src={loginImage} alt="Login" className="w-full h-full object-contain opacity-90" />
                    <div className="absolute inset-0 bg-blue-500 bg-opacity-60 flex flex-col items-center justify-center text-white p-10">
                        <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
                        <p className="text-lg text-center max-w-sm">Access your account to manage preferences and explore new features.</p>
                    </div>
                </div>

                {/* Right Side Login Form */}
                <div className="md:w-1/2 w-full p-8 sm:p-12 bg-white flex flex-col justify-center">
                    <h2 className="text-3xl font-extrabold text-blue-700 mb-6 text-center">Sign In to Your Account</h2>

                    {error && <p className="text-red-500 mb-4 text-center font-medium">{error}</p>}

                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Email Field */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
                                <IconMail className="text-gray-500 mr-2 w-5 h-5" />
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" required className="w-full outline-none text-gray-800" />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
                                <IconLock className="text-gray-500 mr-2 w-5 h-5" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="w-full outline-none text-gray-800"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-sm text-blue-600 hover:underline ml-2 focus:outline-none">
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>

                        {/* Login Button */}
                        <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md">
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="mt-6 text-center text-sm text-gray-600">
                        Don’t have an account?{' '}
                        <a href="/register" className="text-blue-600 hover:underline font-medium">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
