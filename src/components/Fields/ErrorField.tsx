import React from 'react';
import {ValidationError} from "yup/es";

const ErrorField: React.FC<{ error: ValidationError }> = ({error}) => {
    return (
        <ul style={{color: "red"}}>
            {
                error.errors.map((msg, index) => {
                    return (
                        <li key={index}>
                            {msg}
                        </li>
                    );
                })
            }
        </ul>
    );
}

export default React.memo(ErrorField);
