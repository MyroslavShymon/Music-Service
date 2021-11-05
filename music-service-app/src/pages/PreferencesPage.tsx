import React, {FunctionComponent, useEffect} from 'react';
import user from "../store/user";
import {observer} from "mobx-react-lite";
import {Pie} from "@ant-design/charts";
import Title from "antd/es/typography/Title";
import {Button, Col, Divider, Row, Typography} from 'antd';
import {useHistory} from "react-router-dom";
import {RoutesConstants} from "../core/constants/routes";

interface OwnProps {
}

type Props = OwnProps;

const PreferencesPage: FunctionComponent<Props> = (props) => {
    const history = useHistory()
    useEffect(() => {
        user.getGenresWithPreferences()
    }, []);

    const config = {
        appendPadding: 10,
        data: user.preferences ? user.preferences : [],
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        label: {type: 'outer'},
        interactions: [{type: 'element-active'}],
    };

    // console.log("user.mostPreferGenres", user.mostPreferGenres)

    return (
        <>
            <Row justify={"center"} align={"middle"}>
                <Title>Ваші вподобання</Title>
            </Row>
            <Row justify={"center"} align={"middle"}>
                <Pie style={{width: "100%", marginLeft: 120}} {...config} />
            </Row>
            <br/>
            <Row justify={"center"} align={"middle"}>
                <Typography>Ваші улюблені жанри:</Typography>
                {user.mostPreferGenres.map(genre =>
                    <Row key={genre.id}>
                        <Col> <Title level={4}>{genre.title}</Title></Col>
                        <Col>{genre.description}</Col>
                        <Divider/>
                    </Row>
                )}
            </Row>
            <br/>
            <Row justify={"center"} align={"middle"}>
                <Button onClick={() => history.push(RoutesConstants.MAIN)}>Перейти на голвну сторінку</Button>
            </Row>
        </>
    );
};

export default observer(PreferencesPage);
