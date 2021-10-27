import React from 'react';
import {FieldProps} from '../../declare';

const TextField: React.FC<FieldProps> = ({onChange, value, ...props}) => {
    return <input {...props} type={'text'} onChange={({target: {value}}) => onChange(value)}/>
};

export default TextField;
