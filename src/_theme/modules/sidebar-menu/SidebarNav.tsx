import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../app/store';
import PerfectScrollbar from 'react-perfect-scrollbar';
import sideBarImage from '../../../../public/assets/images/logo.svg';
import SidebarToggler from '../../components/Layouts/Header/SidebarToggler';
type PropsType = {
    children: React.ReactNode;
};

const SidebarNav: FC<PropsType> = (props: PropsType) => {
    const { children } = props;

    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <PerfectScrollbar className="bg-white dark:bg-black h-full overflow-auto">
                    <>
                        {/* Company Logo and Name */}
                        <div className="flex gap-2 justify-center items-center py-4 border-b border-gray-200">
                            {/* <img src={sideBarImage} alt="Company Logo" className="w-16 h-16 object-contain" /> */}
                            <h1 className=" text-lg font-bold">User Management</h1>
                            <div>
                                <SidebarToggler />
                            </div>
                        </div>
                    </>
                    {children}
                </PerfectScrollbar>
            </nav>
        </div>
    );
};

export default SidebarNav;
