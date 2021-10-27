import * as React from "react";
import {FieldProps, Fields, FieldType} from "../declare";
import withField from "../hocs/withField";
import TextField from "../components/Fields/TextField";
import ErrorField from "../components/Fields/ErrorField";
import {ValidationError} from "yup/es";

class Form {
    protected readonly fields: Fields = {};
    protected _default: React.FunctionComponent<FieldType> = withField(TextField);
    protected _error: React.FC<{ error: ValidationError }> = ErrorField;

    public register(name: string, component: React.FC<FieldProps>) {
        this.fields[name] = withField(component);
    }

    public get(name: string | number) {
        return this.fields[name] ?? this._default;
    }

    public setErrorComponent(component: React.FC<{ error: ValidationError }>) {
        this._error = component;
    }

    public setDefaultComponent(component: React.FunctionComponent<FieldType>) {
        this._default = component;
    }

    public getErrorComponent() {
        return this._error;
    }
}

const form = new Form();

export const register = form.register.bind(form);
export const get = form.get.bind(form);
export const setDefaultComponent = form.setDefaultComponent.bind(form);
export const getErrorComponent = form.getErrorComponent.bind(form);
export const setErrorComponent = form.setErrorComponent.bind(form);

export default form;
