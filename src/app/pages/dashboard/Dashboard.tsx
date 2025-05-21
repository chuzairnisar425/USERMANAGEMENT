import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/authContext';
import UserList from '../../features/User/UserList';
import RolesList from '../../features/Roles/RolesList';

const Dashboard = () => {
    const { user } = useAuth();
    const [showRolesModal, setShowRolesModal] = useState(false);

    // Prevent background scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = showRolesModal ? 'hidden' : 'auto';
    }, [showRolesModal]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
                {/* Welcome Banner */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-10 text-center">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-800 mb-2">Welcome, {user?.name || 'Admin'} 🎉</h1>
                    <p className="text-lg text-gray-600">Easily manage your users and their roles with a few clicks.</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-end gap-4 mb-8">
                    <button
                        onClick={() => setShowRolesModal(true)}
                        className="inline-flex items-center justify-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow-lg transition duration-300"
                    >
                        <span className="material-icons mr-2"> Manage Roles</span>
                    </button>
                </div>

                {/* User List */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                    <UserList />
                </div>

                {/* Roles Modal */}
                {showRolesModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
                        <div className="relative w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 animate-fadeIn overflow-y-auto max-h-[80vh]">
                            {/* Close Button */}
                            <button onClick={() => setShowRolesModal(false)} className="absolute top-4 right-4 text-gray-600 hover:text-red-600 transition text-3xl font-bold">
                                &times;
                            </button>

                            {/* Title */}
                            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Role Management</h2>

                            {/* Roles Component */}
                            <RolesList />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
