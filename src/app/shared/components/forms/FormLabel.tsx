import React from 'react';

interface IFormLabelProps extends React.HTMLProps<HTMLLabelElement> {
    editable?: boolean;
    value?: string;
    name?: string;
    onChangeData?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string | false;
}

function FormLabel(props: IFormLabelProps) {
    const { htmlFor, children, className, required, editable, onChangeData, value, name, error } = props;
    return (
        <>
            {editable ? (
                <input
                    name={name}
                    autoFocus
                    type="text"
                    className={`${className} bg-white-light/30 rounded-sm mb-2 outline-none focus:ring-gray-300 p-1 w-full`}
                    value={value}
                    onChange={(e) => {
                        if (onChangeData) onChangeData(e);
                    }}
                />
            ) : (
                <>
                    {error && error != 'null' ? (
                        <div className="flex justify-between flex-wrap">
                            <label className={className} htmlFor={htmlFor}>
                                {children}
                                {required && <span className="text-danger ml-[2px]">*</span>}
                            </label>
                            <div className="text-danger mt-1 ps-1">{error}</div>
                        </div>
                    ) : (
                        <label className={className} htmlFor={htmlFor}>
                            {children}
                            {required && <span className="text-danger ml-[2px]">*</span>}
                        </label>
                    )}
                </>
            )}
        </>
    );
}

export default FormLabel;
