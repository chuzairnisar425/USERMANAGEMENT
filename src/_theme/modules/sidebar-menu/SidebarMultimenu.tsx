import React from 'react';
import IconMenuDashboard from '../../components/Icon/Menu/IconMenuDashboard';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import AnimateHeight from 'react-animate-height';
import { NavLink } from 'react-router-dom';
import ISidebarMenuType from './types';

function SidebarMultimenu({ currentMenu, toggleMenu, title, Icon, items }: ISidebarMenuType['SidebarMultimenuProps']) {
    const iconClassName = 'group-hover:!text-primary shrink-0';

    type ItemType = {
        title: string;
        path: string;
    };

    return (
        <li className="menu nav-item">
            <button type="button" className={`${currentMenu === title ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu(title)}>
                <div className="flex items-center">
                    <Icon className={iconClassName} />
                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{title}</span>
                </div>

                <div className={currentMenu !== title ? 'rtl:rotate-90 -rotate-90' : ''}>
                    <IconCaretDown />
                </div>
            </button>

            <AnimateHeight duration={300} height={currentMenu === title ? 'auto' : 0}>
                <ul className="sub-menu text-gray-500">
                    <li>
                        {items.map((item: ItemType, index: number) => {
                            if (!item) return null;
                            else {
                                return (
                                    <NavLink key={index} to={item.path}>
                                        {item.title}
                                    </NavLink>
                                );
                            }
                        })}
                    </li>
                </ul>
            </AnimateHeight>
        </li>
    );
}

export default SidebarMultimenu;
