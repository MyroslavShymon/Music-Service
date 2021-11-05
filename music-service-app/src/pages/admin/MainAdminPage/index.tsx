import React, {FunctionComponent} from 'react';
import Title from "antd/es/typography/Title";
import TestsConnect from "./TestsConnect";
import AnswerGenreConnect from "./AnswerGenreConnect";

interface OwnProps {
}

type Props = OwnProps;

const MainAdminPage: FunctionComponent<Props> = (props) => {

    return (
        <>
            <Title level={2}>Сторінка об'єднання тестів жанрів та відповідей</Title>
            <TestsConnect/>
            <AnswerGenreConnect/>
        </>
    );
};

export default MainAdminPage;
