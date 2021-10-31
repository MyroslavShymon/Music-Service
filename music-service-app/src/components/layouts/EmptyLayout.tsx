import React, {FunctionComponent, ReactNode} from 'react';
import {Col, Layout, Row} from "antd";

interface OwnProps {
    children: ReactNode,
}

type Props = OwnProps;

const EmptyLayout: FunctionComponent<Props> = ({children}) => {
    return (
        <Layout style={{minHeight: "100vh"}}>
            <Row justify={"center"} align={"middle"} style={{height: "calc(100vh - 250px)"}}>
                <Col className="gutter-row" span={8}>
                    {children}
                </Col>
            </Row>
        </Layout>
    );
};

export default EmptyLayout;

