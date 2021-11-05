import React, {FunctionComponent, useEffect} from 'react';
import user from "../store/user";
import {observer} from "mobx-react-lite";
import {Col, Row} from "antd";
import Title from "antd/es/typography/Title";

interface OwnProps {
}

type Props = OwnProps;

const MainPage: FunctionComponent<Props> = (props) => {
    useEffect(() => {
        user.getRecommendation()
    }, []);

    return (
        <>
            <Row>
                <Title level={2}>Recommendation</Title>
            </Row>
            <Row>
                <Col span={24}>
                {user.recommendation?.map(recommndate =>
                    <Row key={recommndate.id}>
                        {recommndate.id}. {recommndate.title} рік публікації: {recommndate.year}
                    </Row>
                )}
                </Col>
            </Row>
        </>
    );
};

export default observer(MainPage);
