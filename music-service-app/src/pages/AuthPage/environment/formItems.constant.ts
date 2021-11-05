import {IFormItem} from "./formItem.interface";

export const formItemsConstant: IFormItem[] = [
    {
        label: "Name",
        name: "name",
        pathname: 'registration'
    },
    {
        label: "Email",
        name: "email",
        pathname: null
    },
    {
        label: "Password",
        name: "password",
        pathname: null
    }
]