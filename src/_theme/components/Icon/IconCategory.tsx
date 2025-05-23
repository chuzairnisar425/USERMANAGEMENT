import { FC } from 'react';

interface IconCategoryProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const IconCategory: FC<IconCategoryProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <>
            {!fill ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none" className={className}>
                    <path
                        d="M7.99996 10.3346C6.89729 10.3346 5.99996 9.4373 5.99996 8.33464C5.99996 7.23197 6.89729 6.33464 7.99996 6.33464C9.10263 6.33464 9.99996 7.23197 9.99996 8.33464C9.99996 9.4373 9.10263 10.3346 7.99996 10.3346ZM7.99996 7.66797C7.63263 7.66797 7.33329 7.9673 7.33329 8.33464C7.33329 8.70197 7.63263 9.0013 7.99996 9.0013C8.36729 9.0013 8.66663 8.70197 8.66663 8.33464C8.66663 7.9673 8.36729 7.66797 7.99996 7.66797Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                        opacity={duotone ? '0.5' : '1'}
                    />
                    <path
                        d="M11.3366 8.33464C11.3366 8.70264 11.638 9.0013 12.0066 9.0013C12.3753 9.0013 12.6733 8.70264 12.6733 8.33464C12.6733 7.96664 12.3753 7.66797 12.0066 7.66797H12C11.6313 7.66797 11.3366 7.96664 11.3366 8.33464Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                        opacity={duotone ? '0.5' : '1'}
                    />
                    <path
                        d="M3.33663 8.33464C3.33663 8.70264 3.63863 9.0013 4.00663 9.0013C4.37463 9.0013 4.6733 8.70264 4.6733 8.33464C4.6733 7.96664 4.37463 7.66797 4.00663 7.66797H3.99996C3.63196 7.66797 3.33663 7.96664 3.33663 8.33464Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                        opacity={duotone ? '0.5' : '1'}
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2.66663 13.0013C1.56396 13.0013 0.666626 12.104 0.666626 11.0013V5.66797C0.666626 4.5653 1.56396 3.66797 2.66663 3.66797H13.3333C14.436 3.66797 15.3333 4.5653 15.3333 5.66797V11.0013C15.3333 12.104 14.436 13.0013 13.3333 13.0013H2.66663ZM2.66663 5.0013C2.29929 5.0013 1.99996 5.30064 1.99996 5.66797V11.0013C1.99996 11.3693 2.29929 11.668 2.66663 11.668H13.3333C13.7013 11.668 14 11.3693 14 11.0013V5.66797C14 5.30064 13.7013 5.0013 13.3333 5.0013H2.66663Z"
                        fill="currentColor"
                    />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none" className={className}>
                    <path
                        d="M7.99996 10.3346C6.89729 10.3346 5.99996 9.4373 5.99996 8.33464C5.99996 7.23197 6.89729 6.33464 7.99996 6.33464C9.10263 6.33464 9.99996 7.23197 9.99996 8.33464C9.99996 9.4373 9.10263 10.3346 7.99996 10.3346ZM7.99996 7.66797C7.63263 7.66797 7.33329 7.9673 7.33329 8.33464C7.33329 8.70197 7.63263 9.0013 7.99996 9.0013C8.36729 9.0013 8.66663 8.70197 8.66663 8.33464C8.66663 7.9673 8.36729 7.66797 7.99996 7.66797Z"
                        fill="currentColor"
                    />
                    <path
                        d="M11.3366 8.33464C11.3366 8.70264 11.638 9.0013 12.0066 9.0013C12.3753 9.0013 12.6733 8.70264 12.6733 8.33464C12.6733 7.96664 12.3753 7.66797 12.0066 7.66797H12C11.6313 7.66797 11.3366 7.96664 11.3366 8.33464Z"
                        fill="currentColor"
                    />
                    <path
                        d="M3.33663 8.33464C3.33663 8.70264 3.63863 9.0013 4.00663 9.0013C4.37463 9.0013 4.6733 8.70264 4.6733 8.33464C4.6733 7.96664 4.37463 7.66797 4.00663 7.66797H3.99996C3.63196 7.66797 3.33663 7.96664 3.33663 8.33464Z"
                        fill="currentColor"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2.66663 13.0013C1.56396 13.0013 0.666626 12.104 0.666626 11.0013V5.66797C0.666626 4.5653 1.56396 3.66797 2.66663 3.66797H13.3333C14.436 3.66797 15.3333 4.5653 15.3333 5.66797V11.0013C15.3333 12.104 14.436 13.0013 13.3333 13.0013H2.66663ZM2.66663 5.0013C2.29929 5.0013 1.99996 5.30064 1.99996 5.66797V11.0013C1.99996 11.3693 2.29929 11.668 2.66663 11.668H13.3333C13.7013 11.668 14 11.3693 14 11.0013V5.66797C14 5.30064 13.7013 5.0013 13.3333 5.0013H2.66663Z"
                        fill="currentColor"
                    />
                </svg>
            )}
        </>
    );
};

export default IconCategory;
