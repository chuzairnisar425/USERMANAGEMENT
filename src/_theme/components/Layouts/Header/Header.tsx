import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../../app/store';
import ProfileMenu from './ProfileMenu';
import DemoBar from './DemoBar';
import SidebarToggler from './SidebarToggler';

const Header: React.FC = () => {
    const dispatch = useDispatch();

    const sidebar = useSelector((state: IRootState) => state.themeConfig.sidebar);

    const [isDemo, setIsDemo] = useState<boolean>(localStorage.getItem('demo') != 'true');
    return (
        <nav className="font-inter">
            {false && <DemoBar />}
            <div className="flex justify-between bg-white border items-center px-4">
                <div className=" h-12 flex items-center ">
                    {/* <div className="">{<SidebarToggler />}</div> */}
                    <h2 className="font-bold  ml-2">User Management</h2>
                    {/* Search Bar */}
                    <input type="text" placeholder="Search..." className="ml-4 border rounded-full px-4 py-2 w-64 bg-slate-50" />
                </div>
                {/* Profile Menu */}
                {true ? <ProfileMenu /> : null}
            </div>
        </nav>
    );
};

export default Header;
