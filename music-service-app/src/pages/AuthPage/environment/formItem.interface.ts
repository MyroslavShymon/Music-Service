import {RoutesConstants} from "../../../core/constants/routes";

type TFormItem = 'name' | 'email' | 'password'

export interface IFormItem {
    label: string,
    name: TFormItem,
    pathname: "registration" | null
}