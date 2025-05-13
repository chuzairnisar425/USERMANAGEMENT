import React from 'react';
import FormFeedback from './FormFeedback';
import { formatCurrency } from '../../utils/utils';
import IconDollarSign from '../../../../_theme/components/Icon/IconDollarSign';

interface IFormInputProps extends React.HTMLProps<HTMLInputElement> {
    invalid?: boolean | '';
    variant?: 'filled' | 'unfilled';
    label?: string;
    withAsterisk?: boolean;
    error?: string;
    autofocus?: boolean;
    currencySymbol?: string;
}

const FormInput: React.FC<IFormInputProps> = ({
    id,
    autofocus,
    disabled,
    value,
    type,
    currencySymbol,
    placeholder,
    className,
    defaultValue,
    name,
    invalid,
    onChange,
    onBlur,
    onFocus,
    required,
    error,
    label,
    withAsterisk,
    variant,
}) => {
    const baseClass = 'form-input placeholder:!font-inter';
    const invalidClass = 'border-danger/60 dark:border-danger/60 text-danger dark:bg-danger/15 placeholder:text-danger focus:border-danger/80';
    const filledClass = 'bg-white-light/20 focus:bg-white-light/30 outline-none border-none text-white-dark';

    return (
        <>
            {label && (
                <label htmlFor={id} className="text-sm">
                    {label}
                    {withAsterisk && <span className="text-danger ml-[3px] font-bold">*</span>}
                </label>
            )}
            {type === 'currency' ? (
                <div
                    className={`flex flex-row items-center ${className} ${invalid ? invalidClass : 'placeholder:text-white-dark'} ${baseClass} pl-0 py-0 pr-0 ${
                        variant === 'filled' || disabled ? filledClass : ''
                    }`}
                >
                    <div className="p-2 py-3 flex items-center justify-center h-full">
                        <h3 className="text-sm font-semibold">{currencySymbol && currencySymbol != '$' ? currencySymbol : <IconDollarSign className="w-[14px] h-[14px]" />}</h3>
                    </div>
                    <input
                        className="w-full px-2 outline-none h-full rounded-r-md "
                        disabled={disabled}
                        required={required}
                        id={id}
                        autoFocus={autofocus}
                        defaultValue={defaultValue}
                        type="text"
                        name={name}
                        value={formatCurrency(value + '')}
                        placeholder={placeholder}
                        onChange={onChange}
                        onBlur={onBlur}
                        onFocus={onFocus}
                    />
                </div>
            ) : (
                <input
                    disabled={disabled}
                    required={required}
                    id={id}
                    autoFocus={autofocus}
                    defaultValue={defaultValue}
                    type={type}
                    name={name}
                    value={value ?? ''}
                    placeholder={placeholder}
                    className={`${className} ${invalid ? invalidClass : 'placeholder:text-white-dark'} ${baseClass} ${variant === 'filled' || disabled ? filledClass : ''}`}
                    onChange={onChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                />
            )}
            {error && <FormFeedback error={error} />}
        </>
    );
};

export default FormInput;
