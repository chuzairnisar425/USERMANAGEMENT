import { Checkbox } from '@mantine/core';
import React, { useEffect, useRef, useState } from 'react';

interface ICoulumnFilterProps {
    columns: any[];
    renderColumns: any[];
    setRenderColumns: React.Dispatch<React.SetStateAction<any[]>>;
}

function CoulumnFilter({ columns, renderColumns, setRenderColumns }: ICoulumnFilterProps) {
    const [isFilterMenuOpen, setFilterMenuOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleFilterMenu = () => setFilterMenuOpen(!isFilterMenuOpen);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setFilterMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleCheckboxChange = (column: any, checked: boolean) => {
        if (checked) {
            setRenderColumns((prev) => {
                const newColumns = [...prev, column];
                return columns.filter((col) => newColumns.some((newCol) => newCol.accessor === col.accessor));
            });
        } else {
            setRenderColumns((prev) => prev.filter((col) => col.accessor !== column.accessor));
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                className={` ${isFilterMenuOpen ? ' border-black border-[1px] ' : 'border-1'}  rounded-md flex items-center justify-between border p-2 gap-3`}
                id="coulumn-filter-menu-button"
                aria-expanded={isFilterMenuOpen}
                aria-haspopup="true"
                onClick={toggleFilterMenu}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <g clipPath="url(#clip0_1626_27501)">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0 2.76917C0 1.91951 0.688793 1.23071 1.53846 1.23071H14.4615C15.3112 1.23071 16 1.91951 16 2.76917V13.2307C16 14.0804 15.3112 14.7692 14.4615 14.7692H1.53846C0.688793 14.7692 0 14.0804 0 13.2307V2.76917ZM6.15385 13.5384H9.84615V2.46148H6.15385V13.5384ZM4.92308 2.46148V13.5384H1.53846C1.36853 13.5384 1.23077 13.4006 1.23077 13.2307V2.76917C1.23077 2.59924 1.36853 2.46148 1.53846 2.46148H4.92308ZM11.0769 2.46148V13.5384H14.4615C14.6315 13.5384 14.7692 13.4006 14.7692 13.2307V2.76917C14.7692 2.59924 14.6315 2.46148 14.4615 2.46148H11.0769Z"
                            fill="#383A3D"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_1626_27501">
                            <rect width="16" height="16" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.38569 7.11299C6.17268 7.326 5.82732 7.326 5.61431 7.11299L0.15976 1.65844C-0.0532532 1.44543 -0.0532533 1.10007 0.15976 0.887055C0.372774 0.674042 0.718136 0.674042 0.93115 0.887055L6 5.95591L11.0689 0.887055C11.2819 0.674042 11.6272 0.674042 11.8402 0.887055C12.0533 1.10007 12.0533 1.44543 11.8402 1.65844L6.38569 7.11299Z"
                        fill="#757575"
                    />
                </svg>
            </button>
            <div
                className={`${
                    isFilterMenuOpen ? 'translate-y-2 opacity-100 z-10' : '-translate-y-2 opacity-0 z-[-1]'
                } transition-all delay-75 absolute right-0 w-48 origin-top-right rounded-md bg-white pt-1 shadow-lg focus:outline-none`}
                role="menu"
            >
                <div className="p-2 border-b flex justify-between items-center">
                    <p className="text-ssm text-gray-400">Table options</p>
                    <button onClick={() => setRenderColumns(columns)} className="text-sm font-medium text-primary">
                        Reset
                    </button>
                </div>
                {columns.map((column) => (
                    <div key={column.accessor} className="flex items-center p-2 gap-3">
                        <Checkbox checked={renderColumns.some((col) => col.accessor === column.accessor)} onChange={(e) => handleCheckboxChange(column, e.target.checked)} />
                        <p className="">{column.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CoulumnFilter;
