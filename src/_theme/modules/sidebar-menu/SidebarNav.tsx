import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { IRootState } from '../../../app/store';
import SidebarToggler from '../../components/Layouts/Header/SidebarToggler';

const SidebarNav: FC<{ children: React.ReactNode }> = ({ children }) => {
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav className={`sidebar fixed top-0 bottom-0 w-[260px] min-h-screen shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}>
                <PerfectScrollbar className="bg-white dark:bg-black h-full">
                    {/* Logo & Toggler */}
                    <div className="flex justify-between    items-center py-4 px-4 border-b border-gray-200">
                        <h1 className="text-lg font-bold">User Management</h1>
                        <SidebarToggler />
                    </div>
                    {children}
                </PerfectScrollbar>
            </nav>
        </div>
    );
};

export default SidebarNav;
