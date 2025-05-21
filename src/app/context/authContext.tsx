import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Permission {
    id: number;
    name: string;
}

interface Role {
    id: number;
    name: string;
    permissions: Permission[];
}

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    roles: Role[];
}

interface AuthContextType {
    token: string | null;
    user: User | null;
    login: (token: string, user: User) => void;
    logout: () => void;
    hasPermission: (permissionName: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // Initialize state from localStorage (if present)
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = (token: string, user: User) => {
        setToken(token);
        setUser(user);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    // Check permission from user's roles
    const hasPermission = (permissionName: string) => {
        if (!user) return false;
        return user.roles.some((role) => role.permissions.some((perm) => perm.name.toLowerCase() === permissionName.toLowerCase()));
    };

    return <AuthContext.Provider value={{ token, user, login, logout, hasPermission }}>{children}</AuthContext.Provider>;
};
