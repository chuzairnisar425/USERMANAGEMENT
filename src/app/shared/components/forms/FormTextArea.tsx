import React from 'react';
import FormFeedback from './FormFeedback';
import { boolean } from 'yup';

interface IFormTextAreaProps extends React.HTMLProps<HTMLTextAreaElement> {
    invalid?: boolean | '';
    variant?: 'filled' | 'unfilled';
    label?: string;
    withAsterisk?: boolean;
    error?: string;
    autofocus?: boolean;
}

function FormTextArea(props: IFormTextAreaProps) {
    const { id, autofocus, disabled, value, placeholder, maxLength, className, defaultValue, name, invalid, onChange, onBlur, onFocus, required, error } = props;
    return (
        <>
            {props.label && (
                <label htmlFor={id} className="text-sm font-semibold ">
                    {props.label}
                    {props.withAsterisk && <span className="text-danger ml-[3px] font-bold">*</span>}
                </label>
            )}
            <>
                <textarea
                    maxLength={maxLength}
                    disabled={disabled}
                    required={required}
                    id={id}
                    autoFocus={autofocus}
                    defaultValue={defaultValue}
                    name={name}
                    value={value ?? ''}
                    placeholder={placeholder}
                    className={` ${className} ${
                        invalid ? 'border-danger/60 dark:border-danger/60 text-danger dark:bg-danger/15 placeholder:text-danger focus:border-danger/80' : ' placeholder:text-white-dark '
                    } form-input placeholder:!font-inter
            ${props.variant === 'filled' || disabled ? 'bg-white-light/20 focus:bg-white-light/30 outline-none border-none text-white-dark' : ''}
            `}
                    onChange={onChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                />
            </>
            {error && <FormFeedback error={error} />}
        </>
    );
}

export default FormTextArea;
