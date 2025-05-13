import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice';
import { userApi } from '../services/userApi';
// import { userApi } from './userApi'; // ✅ Import the API slice

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    [userApi.reducerPath]: userApi.reducer, // ✅ Add RTK Query reducer
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware), // ✅ Add RTK Query middleware
});

export type IRootState = ReturnType<typeof rootReducer>;
export default store;
