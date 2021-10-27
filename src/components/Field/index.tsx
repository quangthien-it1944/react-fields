import React, {useContext, useMemo} from 'react';
import {FieldType} from '../../declare';
import {get, getErrorComponent} from "../../libs/Form";
import FormContext from "../../context/FormContext";
import classNames from 'classnames';
import {withCondition} from "../../hocs/withCondition";

const Error = getErrorComponent();

const Field: React.FC<FieldType> = ({type, name, ...other}) => {
    const {getError} = useContext(FormContext);
    const Component = useMemo(() => get(type), [type]);
    const error = name ? getError(name) : null;
    return (
        <div className={classNames(`field-${name}`, {'is-error': !!error})}>
            <div className="field-input-component">
                <Component name={name} type={type} {...other} />
            </div>
            <div className="field-error-component">
                {error && <Error error={error}/>}
            </div>
        </div>
    );
};

export default React.memo(withCondition(Field));
