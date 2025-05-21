import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice';
import { userApi } from '../features/User/services/userApi';
import { rolesApi } from '../features/Roles/services/rolesApi';

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    [userApi.reducerPath]: userApi.reducer,
    [rolesApi.reducerPath]: rolesApi.reducer, // <-- add rolesApi reducer here
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware).concat(rolesApi.middleware), // <-- add rolesApi middleware here
});

export type IRootState = ReturnType<typeof rootReducer>;
export default store;
