import React, { FunctionComponent } from 'react';
import {observer} from "mobx-react-lite";
import {Button, Form, InputNumber, Row, Select} from "antd";
import answerAdmin from "../../AnswerAdminPage/environment/store/answer.admin";
import genreAdmin from "../../GenreAdminPage/environment/store/genre.admin";
import {IAnswerGenreConnect} from "../../../../store/core/interfaces/response/AnswerGenreConnect.interface.response";
import answerGenreConnectAdmin from "./environment/store/answerGenreConnect.admin"
const {Option} = Select
interface OwnProps {}

type Props = OwnProps;

const AnswerGenreConnectForm: FunctionComponent<Props> = (props) => {
  const [form] = Form.useForm();

  const onFinish = async (values: IAnswerGenreConnect) => {
    await answerGenreConnectAdmin.addConnect(values)
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
          <Form.Item name="genreId" label="Жанр" rules={[{required: true}]}>
            <Select
                showSearch
                style={{width: 200}}
                placeholder="Виберіть жанр"
                optionFilterProp="children"
                allowClear
            >
              {genreAdmin.genre?.map(genre =>
                  <Option key={genre.id} value={genre.id}>{genre.title}</Option>
              )}
            </Select>
          </Form.Item>
          <Form.Item name="weight" label="Вага відповіді до жанру" rules={[{required: true}]}>
            <InputNumber max={10} min={1} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              З'єднати відповідь та жанр
            </Button>
          </Form.Item>
        </Form>
      </Row>
  );
};

export default observer(AnswerGenreConnectForm);
