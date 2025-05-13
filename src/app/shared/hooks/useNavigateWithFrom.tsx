import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useNavigateWithFrom = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const fromLocation = useMemo(() => {
        return location.state?.from;
    }, [location]);

    const customHookFunction = (path: string | null) => {
        if (!path) {
            fromLocation ? navigate(fromLocation) : window.history.back();
            return;
        }

        // console.log(location);
        navigate((fromLocation != '/' ? fromLocation : '/dashboard') ?? path, { state: fromLocation, replace: true });
    };

    return customHookFunction;
};

export default useNavigateWithFrom;
