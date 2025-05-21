import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useGetOwnerByIdQuery, useUpdateOwnerMutation } from '../services/ownerApi';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type FormData = {
    name: string;
    email: string;
    company_name: string;
    address: string;
    phone_numbers: string; // comma separated string in form
};

const EditOwner = () => {
    const { id } = useParams<{ id: string }>();
    const { data: owner, isLoading } = useGetOwnerByIdQuery(id!);
    const [updateOwner] = useUpdateOwnerMutation();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormData>();
    const navigate = useNavigate();

    useEffect(() => {
        if (owner) {
            // Convert phone_numbers array to comma separated string for input field
            reset({
                ...owner,
                phone_numbers: Array.isArray(owner.phone_numbers) ? owner.phone_numbers.join(', ') : '',
            });
        }
    }, [owner, reset]);

    const onSubmit = async (data: FormData) => {
        try {
            const payload = {
                id,
                ...data,
                phone_numbers: data.phone_numbers
                    .split(',')
                    .map((num) => num.trim())
                    .filter(Boolean),
            };

            await updateOwner(payload).unwrap();
            toast.success('Owner updated successfully!');
            navigate('/owners/list');
        } catch (error) {
            toast.error('Failed to update owner!');
            console.error(error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg text-gray-600">Loading owner data...</p>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto mt-10 p-8 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Edit Owner</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="name"
                        {...register('name', { required: 'Name is required' })}
                        className={`w-full mt-1 px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="Enter full name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="email"
                        type="email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Invalid email address',
                            },
                        })}
                        className={`w-full mt-1 px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="Enter email address"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                {/* Company Name */}
                <div>
                    <label htmlFor="company_name" className="block text-sm font-medium text-gray-700">
                        Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="company_name"
                        {...register('company_name', { required: 'Company name is required' })}
                        className={`w-full mt-1 px-4 py-2 border ${errors.company_name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="Enter company name"
                    />
                    {errors.company_name && <p className="text-red-500 text-sm mt-1">{errors.company_name.message}</p>}
                </div>

                {/* Address */}
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Address <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="address"
                        {...register('address', { required: 'Address is required' })}
                        className={`w-full mt-1 px-4 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="Enter address"
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                </div>

                {/* Phone Numbers */}
                <div>
                    <label htmlFor="phone_numbers" className="block text-sm font-medium text-gray-700">
                        Phone Numbers <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="phone_numbers"
                        {...register('phone_numbers', { required: 'Phone numbers are required' })}
                        className={`w-full mt-1 px-4 py-2 border ${errors.phone_numbers ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="Enter phone numbers separated by commas"
                    />
                    {errors.phone_numbers && <p className="text-red-500 text-sm mt-1">{errors.phone_numbers.message}</p>}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button type="submit" disabled={isSubmitting} className="px-6 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-300">
                        {isSubmitting ? 'Updating...' : 'Update Owner'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditOwner;
