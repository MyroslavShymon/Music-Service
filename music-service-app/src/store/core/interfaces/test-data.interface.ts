import {IAnswer} from "./response/Answer.interface.response";
import {ITest} from "./response/Test.interface.response";

export interface ITestData {
    answers: IAnswer[],
    test: ITest
}