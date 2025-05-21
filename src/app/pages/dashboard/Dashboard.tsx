import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/authContext';
import RolesList from '../../features/Roles/RolesList';

const Dashboard = () => {
    const { user } = useAuth();
    const [showRolesModal, setShowRolesModal] = useState(false);

    useEffect(() => {
        document.body.style.overflow = showRolesModal ? 'hidden' : 'auto';
    }, [showRolesModal]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
            <div className="max-w-7xl mx-auto px-4 py-10">
                {/* Welcome Card */}
                <div className="bg-white/70 backdrop-blur-xl shadow-xl rounded-3xl p-10 text-center transition-all hover:shadow-2xl">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-900 mb-3 animate-fadeIn">Welcome, {user?.name || 'Admin'} 🎉</h1>
                    <p className="text-lg text-gray-700 mb-2">Your command center to manage users, roles, and insights!</p>
                </div>

                {/* Stat Cards */}
                {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
                    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                        <h3 className="text-xl font-semibold text-blue-800">Total Users</h3>
                        <p className="text-3xl mt-2 font-bold text-blue-600">1,250</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                        <h3 className="text-xl font-semibold text-purple-800">Active Roles</h3>
                        <p className="text-3xl mt-2 font-bold text-purple-600">12</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                        <h3 className="text-xl font-semibold text-green-800">Online Admins</h3>
                        <p className="text-3xl mt-2 font-bold text-green-600">4</p>
                    </div>
                </div> */}

                {/* Actions */}
                <div className="flex justify-end mt-10">
                    <button
                        onClick={() => setShowRolesModal(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white text-lg font-medium rounded-xl shadow-lg transition-all duration-300"
                    >
                        Manage Roles
                    </button>
                </div>

                {/* Modal */}
                {showRolesModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-md">
                        <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-8 overflow-y-auto max-h-[80vh] animate-fadeIn">
                            <button onClick={() => setShowRolesModal(false)} className="absolute top-4 right-4 text-gray-600 hover:text-red-600 transition text-3xl font-bold">
                                &times;
                            </button>
                            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Role Management</h2>
                            <RolesList />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
