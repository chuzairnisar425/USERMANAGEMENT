// src/routes/index.tsx
import { lazy } from 'react';
import PrivateRoute from './middlewares/PrivateRoute';
import RoleProtectedRoute from './middlewares/RoleProtectedRoute';
import UnAuthorized from '../shared/components/ui/pages/UnAuthorized';
import EditOwner from '../features/Owner/forms/EditOwner';
import OwnerList from '../features/Owner/OwnerList';
import AddOwner from '../features/Owner/forms/AddOwner';
import UserList from '../features/User/UserList';
import Error404 from '../shared/components/ui/pages/Error404';

// Lazy components
const Login = lazy(() => import('../pages/authentication/Login'));
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const AddUser = lazy(() => import('../features/User/forms/AddUser'));
const EditUser = lazy(() => import('../features/User/forms/EditUser'));

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

const userRoutes = [
    {
        path: '/users/list',
        element: (
            <RoleProtectedRoute allowedRoles={['admin', 'manager', 'user']} requiredPermission="View User">
                <UserList />
            </RoleProtectedRoute>
        ),
        layout: 'default',
    },
    {
        path: '/users/add',
        element: (
            <RoleProtectedRoute allowedRoles={['admin']} requiredPermission="Add User">
                <AddUser />
            </RoleProtectedRoute>
        ),
        layout: 'default',
    },
    {
        path: '/users/edit/:id',
        element: (
            <RoleProtectedRoute allowedRoles={['admin']} requiredPermission="Edit User">
                <EditUser />
            </RoleProtectedRoute>
        ),
        layout: 'default',
    },
];

// OwnerRoutes
const ownerRoutes = [
    {
        path: '/owners/list',
        element: (
            <RoleProtectedRoute allowedRoles={['admin', 'manager']} requiredPermission="View Owner">
                <OwnerList />
            </RoleProtectedRoute>
        ),
        layout: 'default',
    },
    {
        path: '/owners/add',
        element: (
            <RoleProtectedRoute allowedRoles={['admin']} requiredPermission="Add Owner">
                <AddOwner />
            </RoleProtectedRoute>
        ),
        layout: 'default',
    },
    {
        path: '/owners/edit/:id',
        element: (
            <RoleProtectedRoute allowedRoles={['admin']} requiredPermission="Edit Owner">
                <EditOwner />
            </RoleProtectedRoute>
        ),
        layout: 'default',
    },
];

const routes = [
    ...publicRoutes,
    ...adminRoutes,
    ...ownerRoutes,
    ...userRoutes.map((route) => ({
        path: route.path,
        element: route.element,
        layout: route.layout || 'default',
    })),
    {
        path: '*',
        element: <Error404 />,
        layout: 'blank',
    },
];

export { routes };
