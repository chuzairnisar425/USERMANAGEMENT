import React, { FC } from 'react';

interface ModalHeaderProps {
    title: string;
}

function ModalHeader({ title }: ModalHeaderProps): ReturnType<FC> {
    return <div className="rounded-lg text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">{title}</div>;
}

export default ModalHeader;
