import {useCallback, useState} from "react";
import _ from 'lodash';
import {AnySchema, ValidationError} from 'yup';
import {FormSubmit} from "../declare";

type Value<T = any> = T | Partial<T>;

type OnChangeCallback<A> = (prev: A) => void;

interface UseFormArgs<T = { [key: string | number]: any }> {
    value: Value<T>;
    rules?: null | AnySchema<any>;

    onChange(value: OnChangeCallback<T> | Value<T>): void;
}

const useForm = <T = any>({value = {}, onChange, rules}: UseFormArgs<T>) => {
    const [errors, setErrors] = useState<ValidationError[]>();

    const getValue = useCallback((name: string, defaultValue = "") => {
        return _.get(value, name, defaultValue);
    }, [value]);

    const getError = useCallback((path: string) => {
        return _.find(errors, {path});
    }, [errors]);

    const setError = useCallback((path: string, error: null | string | ValidationError | ValidationError[]) => {
        setErrors(prev => {
            const next = _.reject(prev, {path} as any);
            if (error === null) return next;
            const value = getValue(path);
            return [
                ...next,
                new ValidationError(error, value, path)
            ]
        });
    }, [getValue]);

    const setValue = useCallback((name: string, value: any) => {
        onChange(prev => _.set<any>({...prev}, name, value));
        setError(name, null);
    }, [onChange, setError]);

    const handle = useCallback((callback: FormSubmit<T>) => async ($event: any) => {
        if ($event.preventDefault) {
            $event.preventDefault();
        }
        setErrors([]);
        const validateSuccess = async (formValue: any) => {
            try {
                await callback(formValue);
            } catch (error) {
                console.error(error);
            }
        }
        if (rules) {
            try {
                await rules.validate(value, {abortEarly: false});
                await validateSuccess(rules.cast(value));
            } catch (error: any) {
                return setErrors(error.inner);
            }
        } else {
            await validateSuccess(value);
        }

    }, [rules, value]);

    return {
        errors,
        handle,
        setValue: setValue,
        getValue: getValue,
        getError: getError,
        setError: setError,
    };
};

export default useForm;
