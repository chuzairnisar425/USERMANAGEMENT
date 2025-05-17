import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LazyImage from '../../../../app/shared/components/LazyImage';
import { useAuth } from '../../../../app/context/authContext';

function ProfileMenu() {
    const { user, logout } = useAuth();
    const [isUserMenuOpen, setUserMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const toggleUserMenu = () => setUserMenuOpen((prev) => !prev);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setUserMenuOpen(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative ml-3" ref={dropdownRef}>
            <button
                type="button"
                className={`peer relative flex rounded-full bg-gray-800 outline-none text-sm focus:outline-none ${isUserMenuOpen ? 'ring-2 ring-white ring-offset-2 ring-offset-brand-500' : ''}`}
                id="user-menu-button"
                aria-expanded={isUserMenuOpen}
                aria-haspopup="true"
                onClick={toggleUserMenu}
            >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">Open user menu</span>
                <LazyImage src="/public/assets/images/user-profile.jpeg" className="h-8 w-8 rounded-full" alt="User" />
            </button>

            <div
                className={`${
                    isUserMenuOpen ? 'translate-y-2 opacity-100 z-10' : '-translate-y-2 opacity-0 z-[-1]'
                } transition-all delay-75 absolute right-0 w-48 origin-top-right rounded-md bg-white pt-1 shadow-lg`}
                role="menu"
            >
                <div className="px-4 py-3 border-b flex flex-col gap-1">
                    <p className="text-sm font-semibold text-gray-500">Profile</p>
                    <p className="text-sm font-semibold truncate">{user?.fullName}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                </div>

                <button onClick={handleLogout} className="text-danger px-4 py-3 font-bold border-t w-full text-start hover:bg-white-light/50" role="menuitem" tabIndex={-1}>
                    Log out
                </button>
            </div>
        </div>
    );
}

export default ProfileMenu;
