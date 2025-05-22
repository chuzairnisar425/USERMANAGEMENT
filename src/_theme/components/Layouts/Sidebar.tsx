import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { IRootState } from '../../../app/store';
import { toggleSidebar } from '../../themeConfigSlice';

// Components
import SidebarHeading from '../../modules/sidebar-menu/SidebarHeading';
import SidebarItem from '../../modules/sidebar-menu/SidebarItem';
import SidebarMultimenu from '../../modules/sidebar-menu/SidebarMultimenu';
import SidebarNav from '../../modules/sidebar-menu/SidebarNav';
import SidebarNavMenu from '../../modules/sidebar-menu/SideBarNavMenu';

// Icons
import IconDashboard from '../Icon/IconDashoard';
import IconUsers from '../Icon/IconUsers';
import IconUser from '../Icon/IconUser';
import IconMenuUsers from '../Icon/Menu/IconMenuUsers';

// Auth
import { useAuth } from '../../../app/context/authContext';

const Sidebar: FC = () => {
    const [currentMenu, setCurrentMenu] = useState('');
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const location = useLocation();
    const dispatch = useDispatch();
    const { user, hasPermission } = useAuth();

    useEffect(() => {
        const selector = document.querySelector(`.sidebar ul a[href="${window.location.pathname}"]`);
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu')?.querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    setTimeout(() => {
                        ele[0].click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
    }, [location]);

    const toggleMenu = (value: string) => {
        setCurrentMenu((prev) => (prev === value ? '' : value));
    };

    const hasRole = (roleName: string): boolean => {
        const roleMatched = user?.roles?.some((role) => role.name.toLowerCase() === roleName.toLowerCase()) ?? false;
        return roleMatched;
    };

    const sidebarMenus = [
        [
            { lightHeading: 'Main' },
            {
                list: {
                    items: [
                        {
                            title: 'Dashboard',
                            path: '/',
                            Icon: IconDashboard,
                            roles: ['admin', 'manager', 'user'],
                        },
                        {
                            title: 'Users Management',
                            path: '/users/list',
                            Icon: IconUsers,
                            roles: ['admin'],
                            permission: 'View User',
                        },
                        {
                            title: 'Owners Management',
                            path: '/owners/list',
                            Icon: IconUser,
                            roles: ['admin', 'manager'],
                            permission: 'View Owner',
                        },
                        {
                            title: 'Roles Management',
                            path: '/roles/list',
                            Icon: IconMenuUsers,
                            roles: ['admin'],
                            permission: 'View User',
                        },
                    ].filter((item) => {
                        const roleCheck = item.roles ? item.roles.some((r: string) => hasRole(r)) : true;
                        const permissionCheck = item.permission ? hasPermission(item.permission) : true;

                        // console.log(`✅ Checking "${item.title}" => Role: ${roleCheck}, Permission: ${permissionCheck}`);

                        return roleCheck && permissionCheck;
                    }),
                },
            },
        ],
    ];

    const render = (key: string, value: any) => {
        switch (key) {
            case 'heading':
                return <SidebarHeading title={value} />;
            case 'lightHeading':
                return <SidebarHeading title={value} light />;
            case 'list':
                return <ul>{value.items.map((item: any, index: number) => (item ? <SidebarItem key={index} title={item.title} Icon={item.Icon} path={item.path} /> : null))}</ul>;
            case 'dropdown':
                return <SidebarMultimenu currentMenu={currentMenu} toggleMenu={toggleMenu} title={value.title} Icon={value.Icon} items={value.items} />;
            default:
                return null;
        }
    };

    return (
        <SidebarNav>
            <SidebarNavMenu>
                <div>
                    {sidebarMenus.map((section, i) =>
                        section.map((item, j) => {
                            const key = Object.keys(item)[0];
                            return <React.Fragment key={`${i}-${j}`}>{render(key, item[key])}</React.Fragment>;
                        })
                    )}
                </div>
            </SidebarNavMenu>
        </SidebarNav>
    );
};

export default Sidebar;
