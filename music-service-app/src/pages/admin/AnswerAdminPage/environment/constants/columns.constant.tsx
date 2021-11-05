import {Button, Popconfirm} from "antd";
import answerAdmin from "../store/answer.admin";
import {IAnswer} from "../../../../../store/core/interfaces/response/Answer.interface.response";

export const columns = [
    {
        title: 'Id відповіді',
        dataIndex: 'id',
        key: 'Id',
    },
    {
        title: 'Назва відповіді',
        dataIndex: 'title',
        key: 'Title',
    },
    {
        dataIndex: 'operation',
        key: 'Operation',
        render: (_: any, answer: IAnswer) =>
            <Popconfirm title="Sure to delete?" onConfirm={() => answerAdmin.deleteAnswer(answer.id)}>
                <Button style={{padding: 0}} danger type="link">Видалити</Button>
            </Popconfirm>
    },
]