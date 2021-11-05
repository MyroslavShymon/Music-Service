import React, {FunctionComponent, useEffect} from 'react';
import {Alert, Button, Col, Form, Input, Row} from "antd";
import answerAdmin from "./environment/store/answer.admin";
import {TForm} from "../../../core/types/form.type";
import {IAnswer} from "../../../store/core/interfaces/response/Answer.interface.response";
import useTimeout from "../../../hooks/useTimeout";
import {observer} from "mobx-react-lite";

interface OwnProps {
}

type Props = OwnProps;

const AddAnswerForm: FunctionComponent<Props> = () => {
    const [form] = Form.useForm();
    const [showAlert, setShowAlert] = useTimeout(5000)

    const onFinish = async (values: TForm<IAnswer>) => {
        await answerAdmin.addAnswer(values)
        form.resetFields()
    }
    useEffect(() => {
        setShowAlert(true)
    }, [answerAdmin.answerResponse.message || answerAdmin.answerResponse.error, setShowAlert]);

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
                        label="Назва відповіді"
                        name="title"
                        rules={[{required: true, message: 'Please input your title!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Додати відповідь
                        </Button>
                    </Form.Item>


                    <Form.Item >
                        <Button type="default" danger onClick={answerAdmin.deleteAll}>
                            Видалити всі
                        </Button>
                    </Form.Item>
                </Form>
            </Row>
            <Row style={{marginTop: 10}}>
                {
                    showAlert && answerAdmin.answerResponse.message &&
                    <Alert message={answerAdmin.answerResponse.message} type={answerAdmin.answerResponse.type}/>
                }
            </Row>
        </Col>
    );
}


export default observer(AddAnswerForm);
