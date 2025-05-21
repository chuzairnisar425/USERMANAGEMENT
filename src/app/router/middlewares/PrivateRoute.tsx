// src/components/PrivateRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

interface Props {
    children: JSX.Element;
    permission?: string;
}

const PrivateRoute = ({ children, permission }: Props) => {
    const { token, hasPermission } = useAuth();

    if (!token) return <Navigate to="/auth/login" />;

    if (permission && !hasPermission(permission)) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default PrivateRoute;
