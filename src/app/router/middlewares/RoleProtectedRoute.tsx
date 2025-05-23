import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

interface Props {
    children: JSX.Element;
    allowedRoles: string[];
    requiredPermission?: string;
}

const RoleProtectedRoute = ({ children, allowedRoles, requiredPermission }: Props) => {
    const { token, user, hasPermission } = useAuth();

    if (!token || !user) return <Navigate to="/login" />;

    const hasRole = user.roles.some((roleObj) => allowedRoles.some((allowedRole) => allowedRole.toLowerCase() === roleObj.name.toLowerCase()));

    const hasPerm = requiredPermission ? hasPermission(requiredPermission) : true;

    return hasRole && hasPerm ? children : <Navigate to="/unauthorized" />;
};

export default RoleProtectedRoute;
