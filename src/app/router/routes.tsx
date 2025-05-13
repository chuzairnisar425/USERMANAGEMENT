// src/app/router/index.ts

import { lazy } from 'react';
import Dashboard from '../pages/dashboard/Dashboard';
import AddUser from '../features/AddUser/AddUser';
import EditUser from '../features/EditUser/EditUser'; // Import EditUser component
const Login = lazy(() => import('../pages/authentication/Login'));

const routes = [
    {
        path: '/login',
        element: <Login />,
        layout: 'blank',
    },
    // Login Page (Public)
    {
        path: '/auth/login',
        element: <Login />,
        layout: 'blank',
    },
    {
        path: '/',
        element: <Dashboard />,
        layout: 'blank',
    },
    {
        path: '/users/add',
        element: <AddUser />,
        layout: 'blank',
    },
    {
        path: '/users/edit/:id', // Add the edit user route
        element: <EditUser />,
        layout: 'blank',
    },
];

export { routes };
