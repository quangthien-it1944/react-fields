import {FieldProps, FieldType} from "../declare";
import React, {useCallback, useContext} from "react";
import FormContext from "../context/FormContext";

const withField = (component: React.FC<FieldProps>) => {
    const Component = React.memo(component, (prevProps, nextProps) => prevProps.value === nextProps.value);
    const Wrapper: React.FC<FieldType> = (props: FieldType) => {
        const {getValue, setValue} = useContext(FormContext);
        const change = useCallback((value: any) => setValue(props.name ?? "", value),
            [props.name, setValue]
        );
        return <Component value={getValue(props.name ?? '')} onChange={change} {...props} />;
    };
    return Wrapper;
};

export default withField;
