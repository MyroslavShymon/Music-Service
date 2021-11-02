import React, {FunctionComponent} from 'react';
import test from "../store/test"
import {Alert, Button, Image, Row, Typography} from "antd";
import {observer} from "mobx-react-lite";
import Title from "antd/es/typography/Title";
import image from "../assets/saruman-rocks.jpg"
import {useHistory} from "react-router-dom";
import useTimeout from "../hooks/useTimeout";

interface OwnProps {
}

type Props = OwnProps;

const TestStartPage: FunctionComponent<Props> = (props) => {
    const history = useHistory()
    const [showAlert, setShowAlert] = useTimeout(5000)

    const startTesting = async () => {
        await test.fetchTest()
        if (test.test.type === "error")
            setShowAlert(true)
        else
            history.push(`/test/${test.test.data?.test.id}`)
    }

    return (
        <Row justify={'space-between'}>
            <Title>Тест</Title>
            <Image src={image} width={"100%"}/>
            <Row justify={'space-between'} style={{width: "100%", marginTop: 10}} align={'middle'}>
                <Typography>При проходженні тесту легше визначити ваші музичні вподобання</Typography>
                <Button type={'primary'} onClick={startTesting}>Пройти тест</Button>

            </Row>
            {
                test.test.type && showAlert &&
                <Alert message={test.test.message} type={test.test.type}/>
            }
        </Row>
    );
};

export default observer(TestStartPage);
