import React, {FunctionComponent, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Col, Row, Table} from "antd";
import Title from "antd/es/typography/Title";
import answerAdmin from './environment/store/answer.admin';
import {columns} from "./environment/constants/columns.constant";
import AddAnswerForm from "./AddAnswerForm";

interface OwnProps {
}

type Props = OwnProps;

const AnswerAdminPage: FunctionComponent<Props> = (props) => {
    useEffect(() => {
        answerAdmin.fetchAllAnswers()
    }, []);

    return (
        <>
            <Title level={2}>Сторінка відповіді адміністратора</Title>
            <Row>
                <Col span={24}>
                    <Title level={5}>Створити відповідь</Title>
                </Col>
            </Row>
            <AddAnswerForm/>
            <br/>
            {
                answerAdmin.answer ?
                    <Table dataSource={answerAdmin.answer} rowKey={"id"} columns={columns}/>
                    : "Немає відповідей"
            }
        </>
    );
};

export default observer(AnswerAdminPage);
