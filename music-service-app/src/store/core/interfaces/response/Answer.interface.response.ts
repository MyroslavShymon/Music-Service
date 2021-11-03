export interface IAnswerToTest {
    answerToTestId: number,
    answerId: number,
    testId: number,
    nextTestId: number | null,
}

export interface IAnswer {
    id: number,
    title: string,
    answerToTests: IAnswerToTest[]
}