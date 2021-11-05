import React, {FunctionComponent} from 'react';
import {Button, Form, Row, Select} from "antd";
import answerAdmin from "../../AnswerAdminPage/environment/store/answer.admin";
import testAdmin from "../../TestAdminPage/environment/store/test.admin";
import {IAnswerTestConnect} from "../../../../store/core/interfaces/response/AnswerTestConnect.interface.response";
import testConnectionAdmin from "./environment/store/testsConnect.admin";
import {observer} from "mobx-react-lite";

const {Option} = Select;

interface OwnProps {
}

type Props = OwnProps;

const TestsConnectForm: FunctionComponent<Props> = (props) => {
    const [form] = Form.useForm();

    const onFinish = async (values: IAnswerTestConnect) => {
        if (!values.nextTestId)
            values.nextTestId = null
        await testConnectionAdmin.addConnect(values)
        form.resetFields()
    };

    return (
        <Row>
            <Form form={form} name="control-hooks" onFinish={onFinish} layout="inline">
                <Form.Item name="answerId" label="Відповідь" rules={[{required: true}]}>
                    <Select
                        showSearch
                        style={{width: 200}}
                        placeholder="Виберіть відповідь"
                        optionFilterProp="children"
                        allowClear
                    >
                        {answerAdmin.answer?.map(answer =>
                            <Option key={answer.id} value={answer.id}>{answer.title}</Option>
                        )}
                    </Select>
                </Form.Item>
                <Form.Item name="testId" label="Тест" rules={[{required: true}]}>
                    <Select
                        showSearch
                        style={{width: 200}}
                        placeholder="Виберіть тест"
                        optionFilterProp="children"
                        allowClear
                    >
                        {testAdmin.tests?.map(test =>
                            <Option key={test.id} value={test.id}>{test.title}</Option>
                        )}
                    </Select>
                </Form.Item>
                <Form.Item name="nextTestId" label="Наступний тест">
                    <Select
                        showSearch
                        style={{width: 200}}
                        placeholder="Виберіть наступний тест"
                        optionFilterProp="children"
                        allowClear
                    >
                        {testAdmin.tests?.map(test =>
                            <Option key={test.id} value={test.id}>{test.title}</Option>
                        )}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        З'єднати тест та відповідь на нього
                    </Button>
                </Form.Item>
            </Form>
        </Row>
    );
};

export default observer(TestsConnectForm);
