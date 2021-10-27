import React, {useMemo, useState} from 'react';
import FormContext from '../../context/FormContext';
import {FieldType, FormSubmit} from '../../declare';
import useForm from "../../hooks/useForm";
import Field from "../Field";
import {AnySchema} from "yup";

interface FormProps {
    fields: FieldType[];
    children: Children;
    rules?: AnySchema;
}

type Children<T = any> =
    (data: {
        value: T;
        update: (data: Partial<T>) => void;
        submit: (callback: FormSubmit<T>) => ($event: any) => void
        components: any;
    }) => JSX.Element | null;

const Form: React.FC<FormProps> = ({children, rules, fields}) => {
    const [state, setState] = useState<any>({});
    const {getValue, setValue, handle, getError} = useForm({rules, value: state, onChange: setState});

    const components = useMemo(() => {
        return fields.map((field, index) => <Field key={index} {...field} />);
    }, [fields]);

    return (
        <FormContext.Provider value={{formValue: state, getValue, setValue, getError}}>
            {
                children({
                    value: state,
                    update: setState,
                    submit: handle,
                    components,
                })
            }
        </FormContext.Provider>
    );
};

export default Form;
