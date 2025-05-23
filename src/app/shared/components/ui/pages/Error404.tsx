import { useSelector } from 'react-redux';
import useNavigateWithFrom from '../../../hooks/useNavigateWithFrom';
import { IRootState } from '../../../../store';

const Error404 = () => {
    document.title = 'Page 404';
    const navigate = useNavigateWithFrom();
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);

    return (
        <div className="relative flex h-screen min-h-[450px] items-center justify-center overflow-hidden">
            <div className="px-6 py-16 text-center font-semibold before:container before:absolute before:left-1/2 before:-translate-x-1/2 before:rounded-full before:bg-[linear-gradient(180deg,#4361EE_0%,rgba(67,97,238,0)_50.73%)] before:aspect-square before:opacity-10 md:py-20">
                <div className="relative">
                    <img
                        src={isDark ? '/public/assets/images/error/404-dark.svg' : '/assets/images/error/404-light.svg'}
                        alt="404"
                        className="mx-auto -mt-10 w-full max-w-xs object-cover md:-mt-14 md:max-w-xl"
                    />
                    <p className="mt-5 text-base dark:text-white">The page you requested was not found!</p>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/dashboard');
                        }}
                        className="btn btn-primary mx-auto !mt-7 w-max border-0 uppercase shadow-none"
                    >
                        Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Error404;
