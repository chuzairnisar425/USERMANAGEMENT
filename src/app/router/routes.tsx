// src/routes/index.tsx
import { lazy } from 'react';
import PrivateRoute from './middlewares/PrivateRoute';
import RoleProtectedRoute from './middlewares/RoleProtectedRoute';
import UnAuthorized from '../shared/components/ui/pages/UnAuthorized';

// Route imports

// Lazy components
const Login = lazy(() => import('../pages/authentication/Login'));
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const AddUser = lazy(() => import('../features/AddUser/AddUser'));
// import AddUser from '../features/AddUser/AddUser';
const EditUser = lazy(() => import('../features/EditUser/EditUser'));

// Admin routes
const adminRoutes = [
    {
        path: '/dashboard',
        element: (
            <RoleProtectedRoute allowedRoles={['admin']}>
                <Dashboard />
            </RoleProtectedRoute>
        ),
        layout: 'default',
    },
    {
        path: '/users/add',
        element: (
            <RoleProtectedRoute allowedRoles={['admin']}>
                <AddUser />
            </RoleProtectedRoute>
        ),
        layout: 'default',
    },
    {
        path: '/users/edit/:id',
        element: (
            <RoleProtectedRoute allowedRoles={['admin']}>
                <EditUser />
            </RoleProtectedRoute>
        ),
        layout: 'default',
    },
];

// Auth + Default Routes
const publicRoutes = [
    {
        path: '/login',
        element: <Login />,
        layout: 'blank',
    },
    {
        path: '/auth/login',
        element: <Login />,
        layout: 'blank',
    },
    {
        path: '/',
        element: (
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
        ),
        layout: 'default',
    },
    {
        path: '/unauthorized',
        element: <UnAuthorized />,
        layout: 'blank',
    },
];

// Combine all
const routes = [
    ...publicRoutes,
    ...adminRoutes.map((route) => ({
        path: route.path,
        element: route.element,
        layout: route.layout || 'default',
    })),
];

export { routes };
