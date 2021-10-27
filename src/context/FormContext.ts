import React from "react";
import {FormContextState} from "../declare";

const FormContext = React.createContext<FormContextState>({} as any);
export default FormContext;
