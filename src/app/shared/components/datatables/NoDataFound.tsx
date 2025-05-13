import React from 'react';
import { CrudModalHandles } from '../ui/modals/crud-modal/CrudModal';

function NoDataFound({ add, crudModalRef, title }: { add?: () => void; crudModalRef?: React.RefObject<CrudModalHandles>; title: string }) {
    return (
        <div className="w-full h-full flex flex-grow items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-3">
                <svg className="w-8" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M20 28.751C19.034 28.751 18.25 27.9687 18.25 27.001V20.001C18.25 19.035 19.034 18.251 20 18.251C20.966 18.251 21.75 19.035 21.75 20.001V27.001C21.75 27.9687 20.966 28.751 20 28.751Z"
                        fill="#344054"
                    />
                    <path
                        d="M18.2587 13.001C18.2587 13.967 19.0515 14.751 20.0175 14.751C20.9835 14.751 21.7675 13.967 21.7675 13.001C21.7675 12.035 20.9835 11.251 20.0175 11.251H20C19.034 11.251 18.2587 12.035 18.2587 13.001Z"
                        fill="#344054"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M20 39.251C9.38622 39.251 0.749969 30.6147 0.749969 20.001C0.749969 9.38723 9.38622 0.750977 20 0.750977C30.6137 0.750977 39.25 9.38723 39.25 20.001C39.25 30.6147 30.6137 39.251 20 39.251ZM20 4.25098C11.3165 4.25098 4.24997 11.3175 4.24997 20.001C4.24997 28.6862 11.3165 35.751 20 35.751C28.6852 35.751 35.75 28.6862 35.75 20.001C35.75 11.3175 28.6852 4.25098 20 4.25098Z"
                        fill="#344054"
                    />
                </svg>
                <div className="text-center">
                    <p className="text-md font-semibold text-gray-700 dark:text-gray-300">No records found</p>
                    <p className="text-ssm text-gray-400 dark:text-gray-400">Create a {title.toLowerCase()} to display it here.</p>
                </div>
                <button
                    onClick={() => {
                        if (add) add();
                        else if (crudModalRef) crudModalRef.current?.openAdd();
                    }}
                    className="mt-2 bg-brand-600 text-white p-2 rounded-lg text-sm px-8"
                >
                    Create
                </button>
            </div>
        </div>
    );
}

export default NoDataFound;
