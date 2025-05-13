//Dependencies
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { IRootState } from '../../../app/store';
import { toggleSidebar } from '../../themeConfigSlice';
//Icons
//Compoents
import SidearHeading from '../../modules/sidebar-menu/SidebarHeading';
import SidebarItem from '../../modules/sidebar-menu/SidebarItem';
import SidebarMultimenu from '../../modules/sidebar-menu/SidebarMultimenu';
import SidebarNav from '../../modules/sidebar-menu/SidebarNav';
import SidebarNavMenu from '../../modules/sidebar-menu/SideBarNavMenu';
import IconAllergens from '../Icon/IconAllergens';
import IconCategory from '../Icon/IconCategory';
import IconDashboard from '../Icon/IconDashoard';
import IconTables from '../Icon/IconTables';
import IconMenuCustomization from '../Icon/Menu/IconMenuCustomization';
import IconUser from '../Icon/IconUser';
// import { QRCodeCanvas } from 'qrcode.react';
import IconMenuMenuItems from '../Icon/Menu/IconMenuMenuItems';
import IconAward from '../Icon/IconAward';
import IconMobile from '../Icon/IconMobile';
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
    const auth = useSelector((state: IRootState) => state.auth);

    const Dashboard = {
        title: 'Dashboard',
        path: '/dashboard',
        Icon: IconDashboard,
    };
    const MenuItems = {
        title: 'Menu Items',
        path: '/menu-items',
        Icon: IconMenuMenuItems,
    };
    const Allergens = {
        title: 'Allergens',
        path: '/allergens',
        Icon: IconAllergens,
    };
    const DietTypes = {
        title: 'Diet Types',
        path: '/diet-types',
        Icon: IconAward,
    };
    const Users = {
        title: 'Users',
        path: '/users',
        Icon: IconUser,
    };
    const Category = {
        title: 'Categories',
        path: '/category',
        Icon: IconCategory,
    };
    const Tables = {
        title: 'Tables',
        path: '/tables',
        Icon: IconTables,
    };

    const Customization = {
        title: 'Customization',
        path: '/customization',
        Icon: IconMenuCustomization,
    };

    const sidebarMenus = [
        [
            // {
            //     heading: 'Admin Dashboard',
            // },
            {
                lightHeading: 'Main',
            },
            {
                list: {
                    items: [Dashboard],
                },
            },
            {
                lightHeading: 'Menu Management',
            },
            {
                list: {
                    items: [Allergens, DietTypes, Category, MenuItems],
                },
            },
            {
                lightHeading: 'Settings',
            },
            {
                list: {
                    items: [Customization],
                },
            },
        ],
    ];
    const branchId = btoa(auth.user?.selected_branch_id + '');
    const domainName = window.location.origin;

    const value = branchId ? `${domainName}/branch/cafe/${branchId}` : '';

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
                <div className="h-full flex justify-center items-center">
                    <Link to={`/branch/cafe/${branchId}`} className="flex flex-col items-center gap-3">
                        <div className="p-2 pt-1 border rounded-lg flex flex-col items-center gap-2">
                            <div className="flex items-center justify-center gap-2">
                                <IconMobile />
                                <p className="text-xs font-normal">open microsite</p>
                            </div>
                            <QRCodeCanvas size={100} id="QRCODE_CANVAS" value={value ?? ''} />
                        </div>
                        {/* <span className="text-center">{value}</span> */}
                    </Link>
                </div>
            </SidebarNavMenu>
        </SidebarNav>
    );
};

export default Sidebar;

// {
//     heading: 'User Management',
// },
// {
//     list: {
//         items: [
//             {
//                 title: 'Users',
//                 path: '/user/users',
//                 Icon: IconUserPlus,
//             },
//             {
//                 title: 'Roles',
//                 path: '/user/roles',
//                 Icon: IconRole,
//             },
//         ],
//     },
// },
// {
//     list: {
//         items: [
//             {
//                 title: 'Chat',
//                 path: '/apps/chat',
//                 Icon: IconMenuChat,
//             },
//             {
//                 title: 'Mailbox',
//                 path: '/apps/mailbox',
//                 Icon: IconMenuMailbox,
//             },
//         ],
//     },
// },

// {
//     heading: 'People Management',
// },
