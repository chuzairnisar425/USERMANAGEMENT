import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import ISidebarMenuType from './types';

const SidebarItem: FC<ISidebarMenuType['SidebarItemProps']> = ({ title, Icon, path }) => {
    const iconClassName = 'group-hover:!text-primary shrink-0';
    return (
        <li className="nav-item">
            <NavLink to={path} className="group">
                <div className="flex items-center">
                    <Icon className={iconClassName} />
                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{title}</span>
                </div>
            </NavLink>
        </li>
    );
};

export default SidebarItem;
