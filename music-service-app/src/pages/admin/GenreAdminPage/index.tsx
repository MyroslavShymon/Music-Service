import React, {FunctionComponent, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import Title from "antd/es/typography/Title";
import {Col, Row, Table} from "antd";
import genreAdmin from './environment/store/genre.admin';
import {columns} from "./environment/constants/columns.constant";
import AddGenreForm from "./AddGenreForm";

interface OwnProps {
}

type Props = OwnProps;

const GenreAdminPage: FunctionComponent<Props> = (props) => {
    useEffect(() => {
        genreAdmin.fetchAllGenres()
    }, []);

    return (
        <>
            <Title level={2}>Сторінка жанра адміністратора</Title>
            <Row>
                <Col span={24}>
                    <Title level={5}>Створити жанр</Title>
                </Col>
            </Row>
            {/*<AddAnswerForm/>*/}
            <AddGenreForm/>
            <br/>
            {
                genreAdmin.genre ?
                    <Table dataSource={genreAdmin.genre} rowKey={"id"} columns={columns}/>
                    : "Немає жанрів"
            }
        </>
    );
};

export default observer(GenreAdminPage);
