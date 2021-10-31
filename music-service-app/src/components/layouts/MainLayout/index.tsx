import React, {FunctionComponent, ReactNode} from 'react';
import "./index.less";
import {Layout} from "antd";
import {Content} from "antd/es/layout/layout";
import Sidebar from "./Sidebar";

interface OwnProps {
    children: ReactNode
}

type Props = OwnProps;

const MainLayout: FunctionComponent<Props> = ({children}) => {

    return (
        <Layout>
            <Sidebar/>
            <Layout className="site-layout" style={{marginLeft: 200}}>
                <Content style={{minHeight: "100vh"}}>
                    <div className="site-layout-background" style={{padding: 24, textAlign: 'center'}}>
                        {children}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
