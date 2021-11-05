import React, {FunctionComponent, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Alert, Row} from "antd";
import Title from "antd/es/typography/Title";
import AnswerGenreConnectForm from "./AnswerGenreConnectForm";
import useTimeout from "../../../../hooks/useTimeout";
import answerAdmin from "../../AnswerAdminPage/environment/store/answer.admin";
import genreAdmin from "../../GenreAdminPage/environment/store/genre.admin";
import answerGenreConnectAdmin from "./environment/store/answerGenreConnect.admin"

interface OwnProps {
}

type Props = OwnProps;

const AnswerGenreConnect: FunctionComponent<Props> = (props) => {
    const [showAlert, setShowAlert] = useTimeout(5000)

    useEffect(() => {
        if (!answerAdmin.answer)
            answerAdmin.fetchAllAnswers()
        if (!genreAdmin.genre)
            genreAdmin.fetchAllGenres()
    }, []);


    useEffect(() => {
        setShowAlert(true)
    }, [answerGenreConnectAdmin.answerGenreConnectResponse.message || answerGenreConnectAdmin.answerGenreConnectResponse.error, setShowAlert]);

    return (
        <>
            <Row justify={"center"}>
                <Title level={5}>З'єднання відповідей та жанрового коефіцієнту</Title>
            </Row>
            <AnswerGenreConnectForm/>
            <Row style={{marginTop: 10}}>
                {
                    showAlert && answerGenreConnectAdmin.answerGenreConnectResponse.message &&
                    <Alert message={answerGenreConnectAdmin.answerGenreConnectResponse.message}
                           type={answerGenreConnectAdmin.answerGenreConnectResponse.type}/>
                }
            </Row>
        </>
    );
};

export default observer(AnswerGenreConnect);
