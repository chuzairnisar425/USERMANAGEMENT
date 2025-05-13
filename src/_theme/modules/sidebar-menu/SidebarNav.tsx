import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { IRootState } from '../../../app/store';
import PerfectScrollbar from 'react-perfect-scrollbar';
import LazyImage from '../../../app/shared/components/LazyImage';

type PropsType = {
    children: React.ReactNode;
};

const SidebarNav: FC<PropsType> = (props: PropsType) => {
    const { children } = props;
    const dispatch = useDispatch();
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav className={` border border-r h-full lg:translate-y-0 lg:h-full sidebar fixed lg:absolute  top-0 w-[260px]  z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}>
                <PerfectScrollbar className="bg-white dark:bg-black h-full overflow-auto">
                    <>
                        <div className="flex lg:hidden justify-between items-center px-4  ">
                            <NavLink to="/dashboard" className="main-logo flex items-center shrink-0">
                                <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light p-6">
                                    <LazyImage className="object-scale-down w-40 flex-none" src={!isDark ? '/assets/images/logo.png' : '/assets/images/logo-white.png'} alt="logo" />
                                </span>
                            </NavLink>
                        </div>
                    </>
                    {children}
                </PerfectScrollbar>
            </nav>
        </div>
    );
};

export default SidebarNav;
