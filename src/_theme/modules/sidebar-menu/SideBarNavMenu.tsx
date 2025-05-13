import React, { FC } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

type PropsType = {
    children: React.ReactNode;
};

const SidebarNavMenu: FC<PropsType> = (props: PropsType) => {
    const { children } = props;
    return (
        <PerfectScrollbar className="h-full relative pt-[0.69rem]">
            <ul className="h-full flex flex-col justify-between relative font-semibold space-y-0.5 p-4 py-0">{children}</ul>
        </PerfectScrollbar>
    );
};

export default SidebarNavMenu;
