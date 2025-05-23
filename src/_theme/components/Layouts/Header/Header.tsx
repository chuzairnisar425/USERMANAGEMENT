import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../../app/store';
import ProfileMenu from './ProfileMenu';
import DemoBar from './DemoBar';
import { toggleSidebar } from '../../../themeConfigSlice';
import IconMenu from '../../Icon/IconMenu';
import { Link } from 'react-router-dom';
import themeConfig from '../../../theme.config';

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const sidebar = useSelector((state: IRootState) => state.themeConfig.sidebar);

    return (
        <header className={`z-40 ${themeConfig.semidark && themeConfig.menu === 'horizontal' ? 'dark' : ''}`}>
            <div className="shadow-sm">
                <div className="flex justify-between items-center px-5 py-3 bg-white dark:bg-black border-b">
                    {/* Left Section: Logo + Title + Toggler */}
                    <div className="flex items-center space-x-4">
                        {/* Sidebar Toggler (hamburger) */}
                        <button type="button" className="p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60" onClick={() => dispatch(toggleSidebar())}>
                            <IconMenu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        </button>
                    </div>

                    <div>
                        <ProfileMenu />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
