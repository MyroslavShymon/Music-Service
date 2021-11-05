import React, {FunctionComponent, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Alert, Row} from "antd";
import Title from "antd/es/typography/Title";
import answerAdmin from "../../AnswerAdminPage/environment/store/answer.admin";
import testAdmin from "../../TestAdminPage/environment/store/test.admin";
import testConnectionAdmin from "./environment/store/testsConnect.admin"
import useTimeout from "../../../../hooks/useTimeout";
import TestsConnectForm from "./TestsConnectForm";


interface OwnProps {
}

type Props = OwnProps;

const TestsConnect: FunctionComponent<Props> = (props) => {
    const [showAlert, setShowAlert] = useTimeout(5000)

    useEffect(() => {
        if (!answerAdmin.answer)
            answerAdmin.fetchAllAnswers()
        if (!testAdmin.tests)
            testAdmin.fetchAllTests()
    }, []);


    useEffect(() => {
        setShowAlert(true)
    }, [testConnectionAdmin.answerToTestConnectResponse.message || testConnectionAdmin.answerToTestConnectResponse.error, setShowAlert]);

    return (
        <>
            <Row justify={"center"}>
                <Title level={5}>З'єднання тестів</Title>
            </Row>
            <TestsConnectForm/>
            <Row style={{marginTop: 10}}>
                {
                    showAlert && testConnectionAdmin.answerToTestConnectResponse.message &&
                    <Alert message={testConnectionAdmin.answerToTestConnectResponse.message}
                           type={testConnectionAdmin.answerToTestConnectResponse.type}/>
                }
            </Row>
        </>
    );
};

export default observer(TestsConnect);
