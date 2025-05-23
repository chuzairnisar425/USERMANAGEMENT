import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import RolesList from '../../features/Roles/RolesList';
import UserList from '../../features/User/UserList';
import OwnerList from '../../features/Owner/OwnerList';

import IconFilter from '../../../_theme/components/Icon/IconFilter';
import IconUsersGroup from '../../../_theme/components/Icon/IconUsersGroup';
import IconUserPlus from '../../../_theme/components/Icon/IconUserPlus';

const Dashboard = () => {
    const { user, hasPermission } = useAuth();
    const [activeTab, setActiveTab] = useState('');

    const hasRole = (roleName: string): boolean => {
        return user?.roles?.some((role) => role.name.toLowerCase() === roleName.toLowerCase()) ?? false;
    };

    const allTabs = [
        {
            label: 'Users',
            component: <UserList />,
            icon: <IconUsersGroup className="w-5 h-5 mr-2" />,
            roles: ['admin', 'user'],
            permission: 'View User',
        },
        {
            label: 'Roles',
            component: <RolesList />,
            icon: <IconFilter className="w-5 h-5 mr-2" />,
            roles: ['admin'],
            permission: 'View User',
        },
        {
            label: 'Owners',
            component: <OwnerList />,
            icon: <IconUserPlus className="w-5 h-5 mr-2" />,
            roles: ['admin', 'manager'],
            permission: 'View Owner',
        },
    ];

    const allowedTabs = allTabs.filter((tab) => tab.roles.some((role) => hasRole(role)) && hasPermission(tab.permission));

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
            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="bg-white/70 backdrop-blur-xl shadow-xl rounded-3xl p-10 transition-all hover:shadow-2xl">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-900 mb-3 animate-fadeIn">Welcome, {user?.name || 'Admin'} 🎉</h1>
                    <p className="text-lg text-gray-700">Your command center to manage users, roles, and insights!</p>
                </div>

                {allowedTabs.length > 0 && (
                    <div className="mt-10 border-b border-gray-200">
                        <nav className="flex space-x-10">
                            {allowedTabs.map((tab) => (
                                <button
                                    key={tab.label}
                                    onClick={() => setActiveTab(tab.label)}
                                    className={`text-md font-medium pb-2 flex items-center ${
                                        activeTab === tab.label ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-600 hover:text-blue-700'
                                    } transition duration-200`}
                                >
                                    {tab.icon}
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                )}

                <div className="mt-6 bg-white p-6 rounded-xl shadow-md">{renderActiveTab()}</div>
            </div>
        </div>
    );
};

export default Dashboard;
