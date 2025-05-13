import { createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';
import DefaultLayout from '../../_theme/components/Layouts/DefaultLayout';
import BlankLayout from '../../_theme/components/Layouts/BlankLayout';

// Filter out undefined/null routes just in case
const finalRoutes = routes
    .filter((route): route is NonNullable<typeof route> => route !== undefined)
    .map((route) => ({
        ...route,
        element: route.layout === 'blank' ? <BlankLayout>{route.element}</BlankLayout> : <DefaultLayout>{route.element}</DefaultLayout>,
    }));

const router = createBrowserRouter(finalRoutes);

export default router;
