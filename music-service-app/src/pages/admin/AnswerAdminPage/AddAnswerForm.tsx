import React, {FunctionComponent} from 'react';
import {Alert, Button, Col, Form, Input, Row} from "antd";
import answerAdmin from "../../../store/admin/answer.admin";
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
        setShowAlert(true)
    }

    return (
        <Col span={24}>
            <Row>
                <Form
                    name="basic"
                    labelCol={{span: 8}}
                    layout="inline"
                    wrapperCol={{span: 24}}
                    onFinish={onFinish}

                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{required: true, message: 'Please input your title!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <Button type="primary" htmlType="submit">
                            Додати відповідь
                        </Button>
                    </Form.Item>


                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <Button type="default" danger onClick={answerAdmin.deleteAll}>
                            Видалити всі
                        </Button>
                    </Form.Item>
                </Form>
            </Row>
            <Row style={{marginTop: 10}}>
                {
                    showAlert &&
                    <Alert message={answerAdmin.answerResponse.message} type={answerAdmin.answerResponse.type}/>
                }
            </Row>
        </Col>
    );
}


export default observer(AddAnswerForm);
