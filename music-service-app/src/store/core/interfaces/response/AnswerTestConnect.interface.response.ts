export interface IAnswerTestConnect {
    testId: number,
    nextTestId: number | null,
    answerId: number,
    answerToTestId?: number,
}