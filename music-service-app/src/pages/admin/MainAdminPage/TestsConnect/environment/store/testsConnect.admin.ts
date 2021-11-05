import {makeAutoObservable} from "mobx";
import {IResponse} from "../../../../../../core/interfaces/response";
import {IAnswerTestConnect} from "../../../../../../store/core/interfaces/response/AnswerTestConnect.interface.response";
import {$host} from "../../../../../../http";
import {AxiosError} from "axios";


class TestsConnectAdmin {
    public answerToTestConnectResponse: IResponse<IAnswerTestConnect> = {}

    constructor() {
        makeAutoObservable(this, {}, {deep: true});
    }

    async addConnect(connectData: IAnswerTestConnect) {
        try {
            const {data: answerToTestConnectResponse} = await $host.post<IAnswerTestConnect, any, IAnswerTestConnect>("answer/connect", connectData)
            this.answerToTestConnectResponse = {
                data: answerToTestConnectResponse,
                type: "success",
                message: "Зв'язок успішно створено"
            }
        } catch (e) {
            this.answerToTestConnectResponse = {
                data: this.answerToTestConnectResponse.data,
                message: (e as AxiosError)?.response?.data?.error,
                type: 'error'
            }
        }
    }

}


export default new TestsConnectAdmin();