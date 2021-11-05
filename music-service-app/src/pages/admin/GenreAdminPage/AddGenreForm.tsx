import React, {FunctionComponent, useEffect} from 'react';
import {Alert, Button, Col, Form, Input, Row} from "antd";
import useTimeout from "../../../hooks/useTimeout";
import {TForm} from "../../../core/types/form.type";
import {IGenre} from "../../../store/core/interfaces/response/Genre.interface.response";
import genreAdmin from './environment/store/genre.admin';
import TextArea from "antd/es/input/TextArea";

interface OwnProps {
}

type Props = OwnProps;

const AddGenreForm: FunctionComponent<Props> = (props) => {
    const [form] = Form.useForm();
    const [showAlert, setShowAlert] = useTimeout(5000)

    const onFinish = async (values: TForm<IGenre>) => {
        await genreAdmin.addGenre(values)
        form.resetFields()
    }

    useEffect(() => {
        setShowAlert(true)
    }, [genreAdmin.genreResponse.message || genreAdmin.genreResponse.error, setShowAlert]);

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
                        label="Назва жанру"
                        name="title"
                        rules={[{required: true, message: 'Please input your title!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Опис жанру"
                        name="description"
                        rules={[{required: true, message: 'Please input your description!'}]}
                    >
                        <TextArea/>
                    </Form.Item>


                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Додати жанр
                        </Button>
                    </Form.Item>


                    <Form.Item>
                        <Button type="default" danger onClick={genreAdmin.deleteAll}>
                            Видалити всі
                        </Button>
                    </Form.Item>
                </Form>
            </Row>
            <Row style={{marginTop: 10}}>
                {
                    showAlert && genreAdmin.genreResponse.message &&
                    <Alert message={genreAdmin.genreResponse.message} type={genreAdmin.genreResponse.type}/>
                }
            </Row>
        </Col>
    );
};

export default AddGenreForm;
