import { useDispatch } from 'react-redux';
import IconCaretsDown from '../../Icon/IconCaretsDown';
import { toggleSidebar } from '../../../themeConfigSlice';

const SidebarToggler = () => {
    const dispatch = useDispatch();
    return (
        <button
            type="button"
            className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
            onClick={() => dispatch(toggleSidebar())}
        >
            <IconCaretsDown className="m-auto rotate-90" />
        </button>
    );
};

export default SidebarToggler;
