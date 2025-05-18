//Dependencies
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { IRootState } from '../../../app/store';
import { toggleSidebar } from '../../themeConfigSlice';
//Icons
//Compoents
import SidearHeading from '../../modules/sidebar-menu/SidebarHeading';
import SidebarItem from '../../modules/sidebar-menu/SidebarItem';
import SidebarMultimenu from '../../modules/sidebar-menu/SidebarMultimenu';
import SidebarNav from '../../modules/sidebar-menu/SidebarNav';
import SidebarNavMenu from '../../modules/sidebar-menu/SideBarNavMenu';
import IconDashboard from '../Icon/IconDashoard';
import IconCalendar from '../Icon/IconCalendar';
import IconBook from '../Icon/IconBook';
import IconSettings from '../Icon/IconSettings';

//imports

const Sidebar: FC = () => {
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const location = useLocation();
    const dispatch = useDispatch();

    //UseEffects
    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    //render
    const render = (key: any, value: any) => {
        switch (key) {
            case 'heading':
                return <SidearHeading title={value} />;
            case 'lightHeading':
                return <SidearHeading title={value} light={true} />;
            case 'list':
                return (
                    <ul className="">
                        {value.items.map((item: any, index: number) => {
                            if (!item) return;
                            else return <SidebarItem key={index} title={item.title} Icon={item.Icon} path={item.path} />;
                        })}
                    </ul>
                );
            case 'dropdown':
                return <SidebarMultimenu currentMenu={currentMenu} toggleMenu={toggleMenu} title={value.title} Icon={value.Icon} items={value.items} />;
            default:
                return null;
        }
    };

    //helpers
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    const Dashboard = {
        title: 'Dashboard',
        path: '/',
        Icon: IconDashboard,
    };

    const AddUser = {
        title: 'Add User',
        path: '/users/add',
        Icon: IconBook,
    };

    const sidebarMenus = [
        [
            {
                lightHeading: 'Main',
            },
            {
                list: {
                    items: [Dashboard, AddUser],
                },
            },
        ],
    ];

    return (
        <SidebarNav>
            <SidebarNavMenu>
                <div>
                    {sidebarMenus.map((menu: any, index: number) =>
                        menu.map((item: any, index: number) => {
                            if (!item) return null;
                            const key = Object.keys(item)[0];
                            const value = item[key];
                            return <React.Fragment key={index}>{render(key, value)}</React.Fragment>;
                        })
                    )}
                </div>
            </SidebarNavMenu>
        </SidebarNav>
    );
};

export default Sidebar;
