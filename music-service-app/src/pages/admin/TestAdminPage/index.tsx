import React, {FunctionComponent, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import Title from "antd/es/typography/Title";
import {Col, Row, Table} from "antd";
import testAdmin from "./environment/store/test.admin"
import {columns} from "./environment/constants/columns.constant";
import AddTestForm from "./AddTestForm";

interface OwnProps {
}

type Props = OwnProps;

const TestAdminPage: FunctionComponent<Props> = (props) => {
    useEffect(() => {
        testAdmin.fetchAllTests()
    }, []);
    return (
        <>
            <Title level={2}>Сторінка тесту адміністратора</Title>
            <Row>
                <Col span={24}>
                    <Title level={5}>Створити тест</Title>
                </Col>
            </Row>
            <AddTestForm/>
            <br/>
            {
                testAdmin.tests ?
                    <Table dataSource={testAdmin.tests} rowKey={"id"} columns={columns}/>
                    : "Немає тестів"
            }
        </>
    );
};

export default observer(TestAdminPage);
