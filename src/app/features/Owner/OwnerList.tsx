import React from 'react';
import { Link } from 'react-router-dom';
import { useDeleteOwnerMutation, useGetOwnersQuery } from './services/ownerApi';
import { toast } from 'react-toastify';
import IconEdit from '../../../_theme/components/Icon/IconEdit';
import IconTrash from '../../../_theme/components/Icon/IconTrash';
import IconPlus from '../../../_theme/components/Icon/IconPlus';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const OwnerList = () => {
    const { data: owners, isLoading, error } = useGetOwnersQuery();
    const [deleteOwner] = useDeleteOwnerMutation();

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this owner?')) {
            try {
                await deleteOwner(id).unwrap();
                toast.success('Owner deleted successfully!');
            } catch (err) {
                toast.error('Failed to delete owner.');
            }
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto p-6 mt-10 bg-white shadow-md rounded-lg">
                <div className="flex justify-between items-center mb-6">
                    <Skeleton width={200} height={32} />
                    <Skeleton width={120} height={40} />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse">
                        <thead className="bg-gray-100">
                            <tr className="text-left">
                                <th className="px-4 py-3 border-b">#</th>
                                <th className="px-4 py-3 border-b">Name</th>
                                <th className="px-4 py-3 border-b">Email</th>
                                <th className="px-4 py-3 border-b">Address</th>
                                <th className="px-4 py-3 border-b">Company Name</th>
                                <th className="px-4 py-3 border-b">Phone</th>
                                <th className="px-4 py-3 border-b text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(2)].map((_, i) => (
                                <tr key={i} className="hover:bg-gray-50 transition">
                                    <td className="px-4 py-2 border-b">
                                        <Skeleton width={20} />
                                    </td>
                                    <td className="px-4 py-2 border-b">
                                        <Skeleton width={100} />
                                    </td>
                                    <td className="px-4 py-2 border-b">
                                        <Skeleton width={150} />
                                    </td>
                                    <td className="px-4 py-2 border-b">
                                        <Skeleton width={180} />
                                    </td>
                                    <td className="px-4 py-2 border-b">
                                        <Skeleton width={120} />
                                    </td>
                                    <td className="px-4 py-2 border-b">
                                        <Skeleton width={100} />
                                    </td>
                                    <td className="px-4 py-2 border-b text-center">
                                        <div className="flex justify-center gap-2">
                                            <Skeleton width={60} height={32} />
                                            <Skeleton width={60} height={32} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="text-center py-10 text-red-600">Error loading owners.</div>;
    }

    return (
        <div className="max-w-7xl mx-auto p-6  bg-white shadow-md rounded-lg">
            <div className="flex justify-between items-center ">
                <h2 className="text-2xl font-semibold text-gray-800">Owners List</h2>
                <Link to="/owners/add" className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                    <IconPlus className="mr-2" />
                    Add Owner
                </Link>
            </div>
            <p>Manage owners and their privileges</p>
            <div className="overflow-x-auto mt-4">
                <table className="w-full table-auto border-collapse">
                    <thead className="bg-gray-100">
                        <tr className="text-left">
                            <th className="px-4 py-3 border-b">#</th>
                            <th className="px-4 py-3 border-b">Name</th>
                            <th className="px-4 py-3 border-b">Email</th>
                            <th className="px-4 py-3 border-b">Address</th>
                            <th className="px-4 py-3 border-b">Company Name</th>
                            <th className="px-4 py-3 border-b">Phone</th>
                            <th className="px-4 py-3 border-b text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {owners?.map((owner, index) => (
                            <tr key={owner.id} className="hover:bg-gray-50 transition">
                                <td className="px-4 py-2 border-b">{index + 1}</td>
                                <td className="px-4 py-2 border-b">{owner.name}</td>
                                <td className="px-4 py-2 border-b">{owner.email}</td>
                                <td className="px-4 py-2 border-b">{owner.address}</td>
                                <td className="px-4 py-2 border-b">{owner.company_name}</td>
                                <td className="px-4 py-2 border-b">{owner.phone_numbers[0]?.number}</td>
                                <td className="px-4 py-2 border-b text-center">
                                    <div className="flex justify-center ">
                                        <Link to={`/owners/edit/${owner.id}`} className=" text-blue-500  hover:text-blue-600  rounded-md flex items-center gap-1 transition">
                                            <IconEdit />
                                            {/* <span className="hidden sm:inline">Edit</span> */}
                                        </Link>
                                        <button onClick={() => handleDelete(owner.id)} className=" text-red-500 hover:text-red-600 px-3 py-1 rounded-md flex items-center gap-1 transition">
                                            <IconTrash />
                                            {/* <span className="hidden sm:inline">Delete</span> */}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OwnerList;
