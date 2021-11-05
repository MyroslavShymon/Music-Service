import {makeAutoObservable} from "mobx";
import {IResponse} from "../../../../../core/interfaces/response";
import {IGenre} from "../../../../../store/core/interfaces/response/Genre.interface.response";
import {AxiosError} from "axios";
import {$host} from "../../../../../http";
import {IDefaultErrorResponse} from "../../../../../core/interfaces/response/default-error.response.interface";
import {IGenreRequest} from "../../../../../store/core/interfaces/request/genre.interface.ruquest";

class GenreAdmin {
    public genreResponse: IResponse<IGenre[]> = {}

    constructor() {
        makeAutoObservable(this, {}, {deep: true});
    }

    public async fetchAllGenres() {
        try {
            const {data: genreResponse} = await $host.get<IGenre[]>("genre")
            this.genreResponse = {data: genreResponse, type: "success"}
        } catch (e) {
            this.genreResponse = {
                data: this.genreResponse.data,
                message: (e as AxiosError)?.response?.data?.error,
                type: 'error'
            }
        }
    }

    public async addGenre(genre: IGenreRequest) {
        try {
            const {data: genreResponse} = await $host.post<IGenre, any, IGenreRequest>("genre", genre)
            this.genreResponse = {
                data: this.genreResponse.data ? [...this.genreResponse.data, genreResponse] : [genreResponse],
                type: "success",
                message: "Жанри загружено успішно"
            }
        } catch (e) {
            this.genreResponse = {
                data: this.genreResponse.data,
                message: (e as AxiosError)?.response?.data?.error,
                type: 'error'
            }
        }
    }

    public async deleteGenre(genreId: number) {
        try {
            const {data: genreResponse} = await $host.delete<IDefaultErrorResponse>(`genre/${genreId}`)
            this.genreResponse = {
                data: this.genreResponse.data?.filter(genre => genre.id !== genreId),
                type: "success",
                message: genreResponse.message
            }
            console.log("this.genreResponse", this.genreResponse)
        } catch (e) {
            this.genreResponse = {
                data: this.genreResponse.data,
                message: (e as AxiosError)?.response?.data?.error,
                type: 'error'
            }
        }
    }

    public async deleteAll() {
        console.log("delete all")
    }

    get genre() {
        return this.genreResponse.data
    }
}


export default new GenreAdmin();