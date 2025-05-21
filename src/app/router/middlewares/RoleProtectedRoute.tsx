import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

interface Props {
    children: JSX.Element;
    allowedRoles: string[];
    permission?: string;
}

const RoleProtectedRoute = ({ children, allowedRoles, permission }: Props) => {
    const { token, user, hasPermission } = useAuth();

    if (!token || !user) return <Navigate to="/auth/login" />;

    const hasRole = user.roles.some((roleObj) => allowedRoles.some((allowedRole) => allowedRole.toLowerCase() === roleObj.name.toLowerCase()));

    // Check permission if specified
    const hasPerm = permission ? hasPermission(permission) : true;

    return hasRole && hasPerm ? children : <Navigate to="/unauthorized" />;
};

export default RoleProtectedRoute;
