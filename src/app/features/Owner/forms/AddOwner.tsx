import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAddOwnerMutation } from '../services/ownerApi';
import { toast } from 'react-toastify';

type FormData = {
    name: string;
    email: string;
    company_name: string;
    address: string;
    phone_numbers: string;
};

const AddOwner = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormData>();

    const [addOwner] = useAddOwnerMutation();
    const navigate = useNavigate();

    const onSubmit = async (data: FormData) => {
        try {
            const payload = {
                ...data,
                phone_numbers: data.phone_numbers
                    .split(',')
                    .map((num) => num.trim())
                    .filter(Boolean),
            };
            await addOwner(payload).unwrap();
            toast.success('Owner added successfully!');
            navigate('/owners/list');
        } catch (error) {
            toast.error('Something went wrong while adding the owner!');
            console.error(error);
        }
    };

    return (
        <div className="min-h-screenbg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-2xl p-8 sm:p-12 rounded-3xl shadow-2xl backdrop-blur-lg border border-blue-100">
                <h2 className="text-3xl sm:text-4xl font-bold text-center text-blue-900 mb-8">Add New Owner 🧑‍💼</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Field Component */}
                    {[
                        {
                            id: 'name',
                            label: 'Name',
                            type: 'text',
                            placeholder: 'Enter full name',
                            validation: { required: 'Name is required' },
                        },
                        {
                            id: 'email',
                            label: 'Email',
                            type: 'email',
                            placeholder: 'Enter email address',
                            validation: {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Invalid email address',
                                },
                            },
                        },
                        {
                            id: 'company_name',
                            label: 'Company Name',
                            type: 'text',
                            placeholder: 'Enter company name',
                            validation: { required: 'Company name is required' },
                        },
                        {
                            id: 'address',
                            label: 'Address',
                            type: 'text',
                            placeholder: 'Enter address',
                            validation: { required: 'Address is required' },
                        },
                        {
                            id: 'phone_numbers',
                            label: 'Phone Numbers',
                            type: 'text',
                            placeholder: 'Separate numbers with commas',
                            validation: { required: 'Phone numbers are required' },
                        },
                    ].map(({ id, label, type, placeholder, validation }) => (
                        <div key={id}>
                            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                                {label} <span className="text-red-500">*</span>
                            </label>
                            <input
                                id={id}
                                type={type}
                                {...register(id as keyof FormData, validation)}
                                className={`w-full px-4 py-2 rounded-md border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                                    errors[id as keyof FormData] ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                                }`}
                                placeholder={placeholder}
                            />
                            {errors[id as keyof FormData] && <p className="text-red-500 text-sm mt-1">{errors[id as keyof FormData]?.message as string}</p>}
                        </div>
                    ))}

                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-md shadow-md font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 018 8z"></path>
                                    </svg>
                                    Adding...
                                </>
                            ) : (
                                'Add Owner'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddOwner;
