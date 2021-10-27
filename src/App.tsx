import React from 'react';
import Form from "./components/Form";
import * as yup from 'yup';

function App() {
    return (
        <div className="App">
            <Form
                rules={
                    yup.object().shape({
                        username: yup.string().required("Không để trống"),
                        password: yup.string().required("Không để trống"),
                    })
                }
                fields={[
                    {label: "Username", name: "username", type: "text"},
                    {
                        label: "Password",
                        name: "password",
                        type: "password",
                        cond: {
                            fields: [
                                {name: "username", operator: "ne", value: ""}
                            ]
                        }
                    },
                ]}>
                {
                    ({components, submit}) => {
                        return (
                            <div>
                                {components}
                                <button onClick={submit(value => console.log(value))}>Click</button>
                            </div>
                        );
                    }
                }
            </Form>
        </div>
    );
}

export default App;
