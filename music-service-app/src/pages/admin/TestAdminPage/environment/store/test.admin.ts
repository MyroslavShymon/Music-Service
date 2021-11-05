import {makeAutoObservable} from "mobx";
import {IResponse} from "../../../../../core/interfaces/response";
import {ITest} from "../../../../../store/core/interfaces/response/Test.interface.response";
import {$host} from "../../../../../http";
import {AxiosError} from "axios";
import {IDefaultErrorResponse} from "../../../../../core/interfaces/response/default-error.response.interface";
import {ITestRequest} from "../../../../../store/core/interfaces/request/test.interface.request";


class TestAdmin {
    public testResponse: IResponse<ITest[]> = {}

    constructor() {
        makeAutoObservable(this, {}, {deep: true});
    }

    public async fetchAllTests() {
        try {
            const {data: testsResponse} = await $host.get<ITest[]>("test")
            this.testResponse = {data: testsResponse, type: "success"}
        } catch (e) {
            this.testResponse = {
                data: this.testResponse.data,
                message: (e as AxiosError)?.response?.data?.error,
                type: 'error'
            }
        }
    }

    public async addTest(test: ITestRequest) {
        try {
            const {data: testResponse} = await $host.post<ITest, any, ITestRequest>("test", test)
            this.testResponse = {
                data: this.testResponse.data ? [...this.testResponse.data, testResponse] : [testResponse],
                type: "success",
                message: "Тест загружено успішно"
            }
        } catch (e) {
            this.testResponse = {
                data: this.testResponse.data,
                message: (e as AxiosError)?.response?.data?.error,
                type: 'error'
            }
        }
    }

    public async deleteTest(testId: number) {
        try {
            const {data: testResponse} = await $host.delete<IDefaultErrorResponse>(`test/${testId}`)
            this.testResponse = {
                data: this.testResponse.data?.filter(test => test.id !== testId),
                type: "success",
                message: testResponse.message
            }
            console.log("this.testResponse", this.testResponse)
        } catch (e) {
            this.testResponse = {
                data: this.testResponse.data,
                message: (e as AxiosError)?.response?.data?.error,
                type: 'error'
            }
        }
    }

    public async deleteAll() {
        console.log("delete all")
    }

    get tests() {
        return this.testResponse.data
    }
}


export default new TestAdmin();