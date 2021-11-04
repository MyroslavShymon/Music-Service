import {makeAutoObservable, observable} from "mobx";
import {AxiosError} from "axios";
import {LocalStorageConstants} from "../core/constants/localStorage.constants";
import {IResponse} from "../core/interfaces/response";
import {TForm} from "../core/types/form.type";
import {$host} from "../http";
import {IUser} from "./core/interfaces/response/User.interface.response";
import jwtDecode from "jwt-decode";
import {IJwtDecodedUser} from "./core/interfaces/jwt-decoded-user.interface";
import {IPreferences} from "./core/interfaces/response/Preferences.interface.response";
import {IGenre} from "./core/interfaces/response/Genre.interface.response";

class User {
    public user!: IUser;
    public token!: string;
    public response: IResponse<IUser> = {};
    public preferencesResponse: IResponse<IPreferences[]> = {}
    public isAdmin: boolean = false;

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
                const {email, id, roles}: IJwtDecodedUser = jwtDecode(this.token)
                this.setUser({email, id, roles})
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
            console.log("password, email, remember", password, email,)
            this.setToken(response.data.token)
            if (remember && this.token) {
                localStorage.setItem(LocalStorageConstants.ACCESS_TOKEN, this.token)
                const {email, id, roles}: IJwtDecodedUser = jwtDecode(this.token)
                roles.forEach(({title}) => {
                    console.log("title", title)
                    if (title === "Admin") this.isAdmin = true
                })
                this.setUser({email, id, roles})
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
            const {email, id, roles}: IJwtDecodedUser = jwtDecode(this.token)
            this.setUser({email, id, roles})
            roles.forEach(({title}) => {
                console.log("title", title)
                if (title === "Admin") this.isAdmin = true
            })
        }
        return this.token
    }

    public logout() {
        this.setToken("")
        this.setPreferences({})
        this.setUser({})
        this.isAdmin = false
        localStorage.removeItem(LocalStorageConstants.ACCESS_TOKEN)
    }


    public async getGenresWithPreferences() {
        const {data: preferencesResponse} = await $host.get<IPreferences[]>(`preferences/${this.user.id}`)
        this.setPreferences({data: preferencesResponse, message: "Preferences get successful", type: "success"})
    }

    get preferences() {
        return this.preferencesResponse.data?.map(preference => ({
                type: String(preference.genre.title),
                value: Number(preference.weight)
            })
        )
    }

    get mostPreferGenres() {
        let mostPreferGenres: IGenre[] = []
        const sortedPreferences = this.preferencesResponse.data?.slice().sort((a, b) => b.weight - a.weight)
        if (sortedPreferences) {
            for (let i = 0; i < 3; i++) {
                mostPreferGenres.push(sortedPreferences[i]?.genre)
            }
        }
        return mostPreferGenres
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
    setPreferences = (preferences: IResponse<IPreferences[]>) => {
        this.preferencesResponse = preferences
    }
}

export default new User();

//add test ending
// preferences result page
// admin pages