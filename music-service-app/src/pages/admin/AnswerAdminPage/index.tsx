import React, {FunctionComponent, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Col, Row, Table} from "antd";
import Title from "antd/es/typography/Title";
import answerAdmin from '../../../store/admin/answer.admin';
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
            <Table dataSource={answerAdmin.answer || []} columns={columns}/>;
        </>
    );
};

export default observer(AnswerAdminPage);
