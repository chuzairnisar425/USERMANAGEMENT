import { FC } from 'react';

interface IconCustomProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const IconStar: FC<IconCustomProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <>
            {!fill ? (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                    <path
                        d="M11.7897 4.66776L7.55127 4.30228L5.89483 0.399902L4.23838 4.30817L0 4.66776L3.21858 7.45601L2.25182 11.6001L5.89483 9.4013L9.53783 11.6001L8.57697 7.45601L11.7897 4.66776Z"
                        fill="currentColor"
                    />
                </svg>
            ) : (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                    <path
                        d="M11.7897 4.66776L7.55127 4.30228L5.89483 0.399902L4.23838 4.30817L0 4.66776L3.21858 7.45601L2.25182 11.6001L5.89483 9.4013L9.53783 11.6001L8.57697 7.45601L11.7897 4.66776Z"
                        fill="currentColor"
                    />
                </svg>
            )}
        </>
    );
};

export default IconStar;
