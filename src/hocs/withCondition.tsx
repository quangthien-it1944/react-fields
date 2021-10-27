import React, {useContext, useEffect} from "react";
import {checkCondition} from "../libs/func";
import FormContext from "../context/FormContext";

export const withCondition = (WrappedComponent: React.FC<any>) => {
    const Component: React.FC<any> = (props) => {
        const {name, cond, parent} = props;

        const {formValue, getValue, setValue} = useContext(FormContext);

        const source = parent ? getValue(parent) : formValue;
        const value = name ? getValue(name) : null;

        const hide = cond ? !checkCondition(cond, source) : false;

        useEffect(() => {
            if (hide && value !== '') {
                setValue && setValue(name, undefined);
            }
        }, [hide, setValue, value, name]);

        if (hide) {
            return null;
        }

        return <WrappedComponent {...props} />;
    }
    return React.memo(Component);
}
