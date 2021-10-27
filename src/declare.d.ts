import * as React from "react";
import {ValidationError} from "yup/es";
import {HTMLProps} from "react";

export interface Fields {
    [name: string]: React.FC<FieldType>
}

export interface FieldType extends HTMLProps<any> {
    label?: string;
    type: keyof Fields;
    name?: string;
    child?: FieldType[];
    cond?: FieldCondition;
}

export interface FieldProps<T = any> extends FieldType {
    value: T;
    onChange(value: T | React.ChangeEvent<HTMLElement>): void;
}

export interface FormContextState {
    getValue<T = any>(name: string): T;
    setValue<T = any>(name: string, value: T): void;
    getError(name: string): ValidationError | undefined;
    formValue: T | Partial<T>;
}

export type FormSubmit<T = any> = (value: T) => void;

export interface ConditionField {
    name: string;
    operator: "eq" | "in" | "ne";
    value: any;
}

export interface FieldCondition {
    operator?: "and" | "or",
    fields: ConditionField[];
}
