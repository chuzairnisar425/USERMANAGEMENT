import IconMinus from '../../components/Icon/IconMinus';
import ISidebarMenuType from './types';

function SidearHeading({ title, light }: ISidebarMenuType['SidebarMenuHeadingProps']) {
    return (
        <h2 className={`${light ? 'uppercase text-gray-400 text-xs' : 'tracking-[0.3px] font-bold text-black/85'} py-2  px-7 flex items-center   dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1`}>
            <IconMinus className="w-4 h-5 flex-none hidden" />
            <span>{title}</span>
        </h2>
    );
}

export default SidearHeading;
