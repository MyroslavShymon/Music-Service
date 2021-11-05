import {Button, Popconfirm} from "antd";
import testAdmin from "../store/test.admin"
import {ITest} from "../../../../../store/core/interfaces/response/Test.interface.response";

export const columns = [
    {
        title: 'Id тесту',
        dataIndex: 'id',
        key: 'Id',
    },
    {
        title: 'Назва тесту',
        dataIndex: 'title',
        key: 'Title',
    },
    {
        dataIndex: 'operation',
        key: 'Operation',
        render: (_: any, test: ITest) =>
            <Popconfirm title="Sure to delete?" onConfirm={() => testAdmin.deleteTest(test.id)}>
                <Button style={{padding: 0}} danger type="link">Видалити</Button>
            </Popconfirm>
    },
]