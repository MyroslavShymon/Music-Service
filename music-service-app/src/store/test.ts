import {makeAutoObservable} from "mobx";
import {IResponse} from "../core/interfaces/response";
import {$host} from "../http";
import {ITest} from "./core/interfaces/response/Test.interface.response";
import {IAnswer} from "./core/interfaces/response/Answer.interface.response";
import {ITestData} from "./core/interfaces/test-data.interface";
import {AxiosError} from "axios";
import {IPreferences} from "./core/interfaces/response/Preferences.interface.response";

class Test {
    public test: IResponse<ITestData> = {}

    constructor() {
        makeAutoObservable(this, {}, {deep: true});
    }

    public async fetchTest(nextTestId = 1 , answerId = 0, userId = 0) {
        try {
            const {data: testResponse} = await $host.get<ITest>(`/test/${nextTestId}`)
            const {data: answerResponse} = await $host.get<IAnswer[]>('/answer', {params: {testId: testResponse.id}})

            if (answerId !== 0 && userId !== 0) {
                await $host.post<{ status: number, message: string }, any, { userId: number, answerId: number }>('/genre/answer-question', {
                    answerId,
                    userId
                })
            }

            this.test = {
                message: "Тест получено",
                data: {answers: answerResponse, test: testResponse},
                type: 'success'
            }

        } catch (e) {
            this.test = {
                message: (e as AxiosError)?.response?.data?.error,
                type: 'error'
            }
        }
    }
}

export default new Test()