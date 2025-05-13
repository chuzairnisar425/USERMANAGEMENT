// all types and interfaces

interface ISidebarMenuType {
    SidebarMenuHeadingProps: {
        title: string;
        light?: boolean;
    };
    SidebarMultimenuProps: { currentMenu: string; toggleMenu: (value: string) => void; title: string; Icon: JSX.IntrinsicElements; items: ItemType[] };
    SidebarItemProps: { title: string; Icon: JSX.IntrinsicElements; path: string };
}

export type ItemType = {
    title: string;
    path: string;
};

export default SidebarMenuType;
