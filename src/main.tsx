import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

// Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css';

// Tailwind css
import './tailwind.css';

// Router
import { RouterProvider } from 'react-router-dom';
import router from './app/router/index';

// Redux
import { Provider } from 'react-redux';
import store from './app/store';

// Auth Context
// import { AuthProvider } from './app/context/authContext';

// Mantine
import { MantineProvider } from '@mantine/core';
import { AuthProvider } from './app/context/authContext';
// import { AuthProvider } from './app/context/AuthContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Suspense>
            <Provider store={store}>
                <MantineProvider>
                    <AuthProvider>
                        <RouterProvider router={router} />
                    </AuthProvider>
                </MantineProvider>
            </Provider>
        </Suspense>
    </React.StrictMode>
);
