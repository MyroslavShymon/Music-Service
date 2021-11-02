import {makeAutoObservable, observable} from "mobx";
import {AxiosError} from "axios";
import {LocalStorageConstants} from "../core/constants/localStorage.constants";
import {IResponse} from "../core/interfaces/response";
import {TForm} from "../core/types/form.type";
import {$host} from "../http";
import {IUser} from "./core/interfaces/response/User.interface.response";
import jwtDecode from "jwt-decode";
import {IJwtDecodedUser} from "./core/interfaces/jwt-decoded-user.interface";

class User {
    public user!: IUser;
    public token!: string;
    public response: IResponse<IUser> = {};

    constructor() {
        makeAutoObservable(this, {}, {deep: true});
    }

    public async registration({name, password, email, remember}: TForm<IUser>) {
        try {
            const response = await $host.post("auth/registration", {
                name, password, email
            })

            this.setToken(response.data.token)

            if (remember && this.token) {
                localStorage.setItem(LocalStorageConstants.ACCESS_TOKEN, this.token)
                // const {email, id}: IJwtDecodedUser =await jwtDecode(this.token);
                // this.setUser({email, id})
            }

            this.setResponse({
                data: this.user,
                message: 'Користувача створено',
                type: 'success'
            })
        } catch (e) {
            this.setResponse({
                message: (e as AxiosError)?.response?.data?.error,
                type: 'error'
            })
        }
    }

    public async login({password, email, remember}: TForm<IUser>) {
        try {
            const response = await $host.post("auth/login", {
                password, email
            })
            this.setToken(response.data.token)
            if (remember && this.token) {
                localStorage.setItem(LocalStorageConstants.ACCESS_TOKEN, this.token)
                const {email, id}: IJwtDecodedUser = await jwtDecode(this.token);
                this.setUser({email, id})
            }
            this.setResponse({
                data: this.user,
                message: 'Користувача авторизувався',
                type: 'success'
            })
        } catch (e) {
            this.setResponse({
                message: (e as AxiosError)?.response?.data?.error,
                type: 'error'
            })
        }
    }

    getToken(): string | null {
        const token = localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN)

        if (token) {
            this.setToken(token)
            const {email, id}: IJwtDecodedUser = jwtDecode(this.token)
            this.setUser({email, id})
        }
        return this.token
    }

    setUser = (user: IUser) => {
        this.user = user
    }
    setToken = (token: string) => {
        this.token = token
    }
    setResponse = (response: IResponse<IUser>) => {
        this.response = response
    }
}

export default new User();