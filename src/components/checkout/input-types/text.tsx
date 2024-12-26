import { useCallback, useEffect, useState } from 'react';
import validate from './validate';
import type { InputProps } from './types';
import { classnames } from '@/utlis/classnames';

/**
 * Text input component.
 * 
 * @param {InputProps<T>} props The props 
 * @returns  The text input component
 */
export function Text(props: InputProps<string>) {
    const { field, name, value, onChanged } = props;
    const [state, setState] = useState(value ?? '');
    const [showMessage, setShowMessage] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        if (showMessage) {
            const validates: string[] = [
                ...(field.required ? ["required"] : []),
                ...(field?.validate ?? []),
            ];
            setMessages([]);
            validates.forEach((validateName) => {
                const result = validate(validateName, state, props);
                if (result) {
                    setMessages((prev) => [...prev, result]);
                }
            });
        }
    }, [state]);

    useEffect(() => {
        if ((value ?? "") !== state) {
            openShowMessage();
            setState(value ?? "");
        }
    }, [value]);

    const openShowMessage = useCallback(() => {
        if (!showMessage) {
            setShowMessage(true);
        }
    }, [showMessage]);

    return (
        <div className="form-floating mb-4">
            <input
                name={name}
                className={classnames(
                    "form-control",
                    {
                        "is-invalid": messages.length > 0
                    }
                )}
                placeholder={field.label}
                value={state}
                onChange={(e) => {
                    openShowMessage();
                    setState(e.target.value);
                }}
                onBlur={() => messages.length === 0 && onChanged(state)}
                autoComplete={field.autocomplete}
            />
            {messages.map((message, index) => (
                <p key={index} className="text-red-500 mt-1.5 text-xs">{message}</p>
            ))}
            <label htmlFor={name}>
                {field.label}
                {field.required ? (
                    <>
                        {" "}<b className='text-pink-600'>*</b>
                    </>
                ): undefined}
            </label>
        </div>
    );
}