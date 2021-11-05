import {IGenre} from "../../../../../store/core/interfaces/response/Genre.interface.response";
import {Button, Popconfirm} from "antd";
import genreAdmin from '../../environment/store/genre.admin';

export const columns = [
    {
        title: 'Id жанру',
        dataIndex: 'id',
        key: 'Id',
    },
    {
        title: 'Жанр',
        dataIndex: 'title',
        key: 'Title',
    },
    {
        title: 'Опис жанру',
        dataIndex: 'description',
        key: 'Description',
    },
    {
        dataIndex: 'operation',
        key: 'Operation',
        render: (_: any, genre: IGenre) =>
            <Popconfirm title="Sure to delete?" onConfirm={() => genreAdmin.deleteGenre(genre.id)}>
                <Button style={{padding: 0}} danger type="link">Видалити</Button>
            </Popconfirm>
    },
]