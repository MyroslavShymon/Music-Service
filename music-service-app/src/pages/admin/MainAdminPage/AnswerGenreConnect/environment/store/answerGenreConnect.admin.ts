import {makeAutoObservable} from "mobx";
import {IResponse} from "../../../../../../core/interfaces/response";
import {$host} from "../../../../../../http";
import {AxiosError} from "axios";
import {IAnswerGenreConnect} from "../../../../../../store/core/interfaces/response/AnswerGenreConnect.interface.response";


class AnswerGenreConnectAdmin {
    public answerGenreConnectResponse: IResponse<IAnswerGenreConnect> = {}

    constructor() {
        makeAutoObservable(this, {}, {deep: true});
    }

    async addConnect(connectData: IAnswerGenreConnect) {
        try {
            const {data: answerToGenreConnectResponse} = await $host.post<IAnswerGenreConnect, any, IAnswerGenreConnect>("genre/connect", connectData)
            this.answerGenreConnectResponse = {
                data: answerToGenreConnectResponse,
                type: "success",
                message: "Зв'язок успішно створено"
            }
        } catch (e) {
            this.answerGenreConnectResponse = {
                data: this.answerGenreConnectResponse.data,
                message: (e as AxiosError)?.response?.data?.error,
                type: 'error'
            }
        }
    }
}


export default new AnswerGenreConnectAdmin();