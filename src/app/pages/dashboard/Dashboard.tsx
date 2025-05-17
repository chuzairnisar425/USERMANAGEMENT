import React from 'react';
import Header from '../../../_theme/components/Layouts/Header/Header';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import UserList from '../../features/components/UserList';

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300">
            <Header />
            <div className="max-w-screen-xl mx-auto px-6 py-10">
                {/* Welcome Section */}
                <div className=" p-6 rounded-xl shadow-lg    mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome, {user?.name}! 🎉</h1>
                    <p className="text-lg text-gray-600">Manage users — Add, Edit, or Remove users from your list with ease!</p>
                </div>

                {/* Add User Button */}
                <div className="flex justify-end mb-6">
                    <button
                        onClick={() => navigate('/users/add')}
                        className="px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg shadow-xl hover:bg-gradient-to-r hover:from-green-500 hover:to-green-700 transition duration-300"
                    >
                        Add New User
                    </button>
                </div>

                {/* User List Section */}
                <div className=" p-6 rounded-xl shadow-md">
                    <UserList />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
