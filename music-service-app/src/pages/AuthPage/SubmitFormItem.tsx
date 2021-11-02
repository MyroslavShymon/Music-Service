import React, {FunctionComponent} from 'react';
import {Button, Col, Form, Row} from "antd";
import {RoutesConstants} from "../../core/constants/routes";
import {useHistory} from "react-router-dom";

interface OwnProps {
}

type Props = OwnProps;

const SubmitFormItem: FunctionComponent<Props> = (props) => {
    const history = useHistory()

    return (
        <Form.Item>
            <Row justify={'space-between'}>
                <Col>
                    <Button type="primary" htmlType="submit">
                        {history.location.pathname === RoutesConstants.LOGIN ? "Login" : "Registration"}
                    </Button>
                </Col>
                <Col>
                    {
                        history.location.pathname === RoutesConstants.LOGIN ?
                            <Button type={'default'} onClick={() => history.push(RoutesConstants.REGISTRATION)}>There is
                                no
                                account?</Button> :
                            <Button type={'default'} onClick={() => history.push(RoutesConstants.LOGIN)}>Already have an
                                account?</Button>
                    }
                </Col>
            </Row>
        </Form.Item>
    );
};

export default SubmitFormItem;
