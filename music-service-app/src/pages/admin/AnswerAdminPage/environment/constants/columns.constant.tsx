import {Popconfirm} from "antd";
import answerAdmin from "../../../../../store/admin/answer.admin";
import {IAnswer} from "../../../../../store/core/interfaces/response/Answer.interface.response";

export const columns = [
    {
        title: 'Id відповіді',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Назва відповіді',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'operation',
        dataIndex: 'operation',
        render: (_: any, answer: IAnswer) =>
            <Popconfirm title="Sure to delete?" onConfirm={() => answerAdmin.deleteAnswer(answer.id)}>
                <a>Delete</a>
            </Popconfirm>
    },
]