import {makeAutoObservable} from "mobx";
import {IUser} from "../core/interfaces/user.interface";
import * as axios from "axios";
import {AxiosError} from "axios";
import {LocalStorageConstants} from "../core/constants/localStorage.constants";
import {IResponse} from "../core/interfaces/response";
import {TForm} from "../core/types/form.type";

class User {
    public user!: IUser;
    public token!: string | null;
    public response: IResponse<null> = {};

    constructor() {
        makeAutoObservable(this, {}, {deep: true});
    }

    public async registration({name, password, email, remember}: TForm<IUser>) {
        try {
            const response = await axios.default.post("http://localhost:5000/auth/registration", {
                name, password, email
            })
            this.token = response.data.token
            if (remember && this.token)
                localStorage.setItem(LocalStorageConstants.ACCESS_TOKEN, this.token)
            this.response = {
                message: 'Користувача створено',
                type: 'success'
            }
        } catch (e) {
            this.response = {
                message: (e as AxiosError)?.response?.data?.error,
                type: 'error'
            }
        }
    }

    public async login({password, email, remember}: TForm<IUser>){
        try {
            const response = await axios.default.post("http://localhost:5000/auth/login", {
                password, email
            })
            this.token = response.data.token
            if (remember && this.token)
                localStorage.setItem(LocalStorageConstants.ACCESS_TOKEN, this.token)
            this.response = {
                message: 'Користувача авторизувався',
                type: 'success'
            }
        } catch (e) {
            this.response = {
                message: (e as AxiosError)?.response?.data?.error,
                type: 'error'
            }
        }
    }

    getToken(): string | null {
        this.token = localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN);
        return this.token
    }

}

export default new User();