import { ScrollArea } from '@mantine/core';
import React, { FC } from 'react';

interface IModalBodyProps {
    children: JSX.Element;
}

function ModalBody({ children }: IModalBodyProps): ReturnType<FC> {
    return (
        // <ScrollArea className="max-h-[80vh] min-h min-h-[200px]  mr-2 ">
        <div className="p-6">{children}</div>
        // </ScrollArea>
    );
}

export default ModalBody;
