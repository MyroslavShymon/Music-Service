import {IRole} from "./response/User.interface.response";

export interface IJwtDecodedUser {
    email: string,
    exp: number,
    iat: number,
    id: number,
    roles: IRole[],
}