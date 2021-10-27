# Table of contents

## React Fields support manager form fields

## Include functions:
- Auto generate fields.
- Optimize performance.
- Support validate by Yup (Yup npm)

##`
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
`
