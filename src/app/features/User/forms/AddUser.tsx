import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddUserMutation, useGetUserRolesQuery } from '../services/userApi';

const AddUser = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role_id: '',
    });
    const [errorMsg, setErrorMsg] = useState('');
    const [validationErrors, setValidationErrors] = useState({});

    const [addUser, { isLoading, isSuccess }] = useAddUserMutation();
    const { data: roleData, isLoading: rolesLoading, isError: rolesError } = useGetUserRolesQuery();

    useEffect(() => {
        if (isSuccess) navigate('/users/list');
    }, [isSuccess, navigate]);

    const validate = () => {
        const errors = {};
        if (!formData.name.trim()) errors.name = 'Name is required';
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
        }
        if (!formData.password.trim()) errors.password = 'Password is required';
        if (!formData.role_id) errors.role_id = 'Please select a role';
        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setValidationErrors((prev) => ({ ...prev, [name]: null }));
        setErrorMsg('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('email', formData.email);
            data.append('password', formData.password);
            data.append('role', formData.role_id);

            await addUser(data).unwrap();
        } catch (err) {
            setErrorMsg(err?.data?.message || 'User creation failed.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add New User</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                validationErrors.name ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500'
                            }`}
                        />
                        {validationErrors.name && <p className="text-red-600 text-sm mt-1">{validationErrors.name}</p>}
                    </div>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="example@mail.com"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                validationErrors.email ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500'
                            }`}
                        />
                        {validationErrors.email && <p className="text-red-600 text-sm mt-1">{validationErrors.email}</p>}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter secure password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                validationErrors.password ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500'
                            }`}
                        />
                        {validationErrors.password && <p className="text-red-600 text-sm mt-1">{validationErrors.password}</p>}
                    </div>

                    {/* Role Dropdown */}
                    <div>
                        <label htmlFor="role_id" className="block text-sm font-medium text-gray-700 mb-1">
                            Select Role
                        </label>
                        <select
                            id="role_id"
                            name="role_id"
                            value={formData.role_id}
                            onChange={handleChange}
                            disabled={rolesLoading || rolesError}
                            className={`w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 transition-all ${
                                validationErrors.role_id ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500'
                            }`}
                        >
                            <option value="">{rolesLoading ? 'Loading roles...' : rolesError ? 'Failed to load roles' : 'Select Role'}</option>
                            {roleData?.roles?.map((role) => (
                                <option key={role.id} value={role.id}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
                        {validationErrors.role_id && <p className="text-red-600 text-sm mt-1">{validationErrors.role_id}</p>}
                    </div>

                    {/* Error Message */}
                    {errorMsg && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{errorMsg}</div>}

                    {/* Submit Button */}
                    <button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-60">
                        {isLoading ? 'Adding User...' : 'Add User'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddUser;
