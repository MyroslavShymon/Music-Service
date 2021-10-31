import {IErrorBasic} from "./basic-error.response.interface";
import {TBasicResponseTypes} from "./response-types";

export interface IResponse<T> {
    data?: T | IErrorBasic | null,
    message?: string | null,
    type?: TBasicResponseTypes | null
}