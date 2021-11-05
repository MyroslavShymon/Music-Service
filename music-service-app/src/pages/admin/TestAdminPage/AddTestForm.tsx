import React, {FunctionComponent, useEffect} from 'react';
import {Alert, Button, Col, Form, Input, Row} from "antd";
import useTimeout from "../../../hooks/useTimeout";
import {TForm} from "../../../core/types/form.type";
import testAdmin from "./environment/store/test.admin"
import {ITest} from "../../../store/core/interfaces/response/Test.interface.response";

interface OwnProps {}

type Props = OwnProps;

const AddTestForm: FunctionComponent<Props> = (props) => {
    const [form] = Form.useForm();
    const [showAlert, setShowAlert] = useTimeout(5000)

    const onFinish = async (values: TForm<ITest>) => {
        await testAdmin.addTest(values)
        form.resetFields()
    }
    useEffect(() => {
        setShowAlert(true)
    }, [testAdmin.testResponse.message || testAdmin.testResponse.error, setShowAlert]);

    return (
        <Col span={24}>
            <Row>
                <Form
                    form={form}
                    name="basic"
                    layout="inline"
                    onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Назва тесту"
                        name="title"
                        rules={[{required: true, message: 'Please input your title!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Додати тест
                        </Button>
                    </Form.Item>


                    <Form.Item >
                        <Button type="default" danger onClick={testAdmin.deleteAll}>
                            Видалити всі
                        </Button>
                    </Form.Item>
                </Form>
            </Row>
            <Row style={{marginTop: 10}}>
                {
                    showAlert && testAdmin.testResponse.message &&
                    <Alert message={testAdmin.testResponse.message} type={testAdmin.testResponse.type}/>
                }
            </Row>
        </Col>
    );
};

export default AddTestForm;
