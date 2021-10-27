import {FieldCondition} from "../declare";
import _ from 'lodash';

export function checkCondition<T = any>({operator, fields}: FieldCondition, source: T) {
    const results = _.map(fields, ({operator, name, value}) => {
        const fieldValue = _.get(source, name, '');
        switch (operator) {
            case 'eq':
                return _.isEqual(fieldValue, value);
            case 'in':
                let front = false;
                let back = false;
                if(_.isArray(value) && value.length){
                    front = value.includes(fieldValue);
                }
                if(_.isArray(fieldValue) && fieldValue.length){
                    back = fieldValue.includes(value);
                }
                return front || back;
            case 'ne':
                return !_.isEqual(fieldValue, value);
        }
    });
    if(operator === "and"){
        return !results.includes(false);
    }else{
        return results.includes(true);
    }
}
