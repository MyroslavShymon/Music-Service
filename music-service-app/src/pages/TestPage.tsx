import React, {FunctionComponent, useEffect, useState} from 'react';
import test from "../store/test";
import Title from "antd/es/typography/Title";
import {Button, Col, Divider, Form, Radio, Row} from "antd";
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";
import user from "../store/user";
import {RoutesConstants} from "../core/constants/routes";

interface OwnProps {
}

type Props = OwnProps;

const TestPage: FunctionComponent<Props> = (props) => {
    const history = useHistory()
    const [checkedAnswer, setCheckedAnswer] = useState<number>(1);

    // console.log("checkedAnswer", checkedAnswer)

    //
    const nextTest = () => {
        test.test.data?.answers.map(async (answer) => {
            if (answer?.answerToTests)
                for (let i = 0; i < answer.answerToTests.length; i++) {
                    if (answer.answerToTests[i].answerId === checkedAnswer && answer.answerToTests[i].nextTestId !== null) {
                        await test.fetchTest(Number(answer.answerToTests[i].nextTestId), answer.answerToTests[i].answerId, user.user.id)
                        history.push(`/test/${test.test.data?.test.id}`)
                    } else if (answer.answerToTests[i].nextTestId === null) {
                        if (user.user.id)
                            await test.answerQuestion(answer.answerToTests[i].answerId, user.user.id)
                        history.push(RoutesConstants.PREFERENCES)
                        break;
                    }
                }
        })
    }


    useEffect(() => {
        (async () => {
            if (!test.test.data) {
                await test.fetchTest();
            }
        })()
    }, []);

    return (
        <>
            <Divider>
                <Title level={4}>{test.test.data?.test.title}</Title>
            </Divider>
            <Form>
                <Form.Item>
                    <Radio.Group onChange={(e) => setCheckedAnswer(e.target.value)}>
                        {
                            test.test.data?.answers.map((answer) =>
                                <Row key={answer.id}>
                                    <Radio value={answer.id}>{answer.title}</Radio>
                                </Row>
                            )
                        }
                    </Radio.Group>
                </Form.Item>
                <Form.Item>
                    <Row>
                        <Col span={5}>
                            <Button type={'primary'} onClick={nextTest}>Наступний</Button>
                        </Col>
                        <Button>Пропустити</Button>
                    </Row>
                </Form.Item>
            </Form>
        </>
    );
};

export default observer(TestPage);
