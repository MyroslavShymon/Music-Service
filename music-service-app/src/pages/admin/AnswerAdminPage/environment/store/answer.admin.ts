import {makeAutoObservable} from "mobx";
import {IResponse} from "../../../../../core/interfaces/response";
import {IAnswer} from "../../../../../store/core/interfaces/response/Answer.interface.response";
import {$host} from "../../../../../http";
import {IAnswerRequest} from "../../../../../store/core/interfaces/request/answer.interface.request";
import {AxiosError} from "axios";
import {IDefaultErrorResponse} from "../../../../../core/interfaces/response/default-error.response.interface";


class AnswerAdmin {
    public answerResponse: IResponse<IAnswer[]> = {}

    constructor() {
        makeAutoObservable(this, {}, {deep: true});
    }

    public async fetchAllAnswers() {
        try {
            const {data: answerResponse} = await $host.get<IAnswer[]>("answer")
            this.answerResponse = {data: answerResponse, type: "success"}
        } catch (e) {
            this.answerResponse = {
                data: this.answerResponse.data,
                message: (e as AxiosError)?.response?.data?.error,
                type: 'error'
            }
        }
    }

    public async addAnswer(answer: IAnswerRequest) {
        try {
            const {data: answerResponse} = await $host.post<IAnswer, any, IAnswerRequest>("answer", answer)
            this.answerResponse = {
                data: this.answerResponse.data ? [...this.answerResponse.data, answerResponse] : [answerResponse],
                type: "success",
                message: "Відповіді загружено успішно"
            }
        } catch (e) {
            this.answerResponse = {
                data: this.answerResponse.data,
                message: (e as AxiosError)?.response?.data?.error,
                type: 'error'
            }
        }
    }

    public async deleteAnswer(answerId: number) {
        try {
            const {data: answerResponse} = await $host.delete<IDefaultErrorResponse>(`answer/${answerId}`)
            this.answerResponse = {
                data: this.answerResponse.data?.filter(answer => answer.id !== answerId),
                type: "success",
                message: answerResponse.message
            }
            console.log("this.answerResponse", this.answerResponse)
        } catch (e) {
            this.answerResponse = {
                data: this.answerResponse.data,
                message: (e as AxiosError)?.response?.data?.error,
                type: 'error'
            }
        }
    }

    public async deleteAll() {
        console.log("delete all")
    }

    get answer() {
        return this.answerResponse.data
    }
}


export default new AnswerAdmin();