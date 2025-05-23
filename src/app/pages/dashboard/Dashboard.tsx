import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import RolesList from '../../features/Roles/RolesList';
import UserList from '../../features/User/UserList';
import OwnerList from '../../features/Owner/OwnerList';

const Dashboard = () => {
    const { user, hasPermission } = useAuth();
    const [activeTab, setActiveTab] = useState('');

    // Role checker helper
    const hasRole = (roleName: string): boolean => {
        return user?.roles?.some((role) => role.name.toLowerCase() === roleName.toLowerCase()) ?? false;
    };

    // Filtered tabs based on roles/permissions
    const allowedTabs = [
        {
            label: 'Users',
            component: <UserList />,
            roles: ['admin', 'user'],
            permission: 'View User',
        },
        {
            label: 'Roles',
            component: <RolesList />,
            roles: ['admin'],
            permission: 'View User',
        },
        {
            label: 'Owners',
            component: <OwnerList />,
            roles: ['admin', 'manager'],
            permission: 'View Owner',
        },
    ].filter((tab) => tab.roles.some((role) => hasRole(role)) && hasPermission(tab.permission));

    // Set default tab to the first allowed one
    React.useEffect(() => {
        if (allowedTabs.length && !activeTab) {
            setActiveTab(allowedTabs[0].label);
        }
    }, [allowedTabs, activeTab]);

    const renderActiveTab = () => {
        const tab = allowedTabs.find((t) => t.label === activeTab);
        return tab?.component ?? null;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
            <div className="max-w-7xl mx-auto px-4 py-10 ">
                {/* Welcome Message */}
                <div className="bg-white/70 backdrop-blur-xl shadow-xl rounded-3xl p-10 transition-all hover:shadow-2xl">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-900 mb-3 animate-fadeIn">Welcome, {user?.name || 'Admin'} 🎉</h1>
                    <p className="text-lg text-gray-700">Your command center to manage users, roles, and insights!</p>
                </div>

                {/* Tab Navigation */}
                {allowedTabs.length > 0 && (
                    <div className="mt-10 border-b border-gray-200">
                        <nav className="flex space-x-10">
                            {allowedTabs.map((tab) => (
                                <button
                                    key={tab.label}
                                    onClick={() => setActiveTab(tab.label)}
                                    className={`text-md font-medium pb-2 ${
                                        activeTab === tab.label ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-600 hover:text-blue-700'
                                    } transition duration-200`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                )}

                {/* Active Tab Content */}
                <div className="mt-6 bg-white p-6 rounded-xl shadow-md">{renderActiveTab()}</div>
            </div>
        </div>
    );
};

export default Dashboard;
