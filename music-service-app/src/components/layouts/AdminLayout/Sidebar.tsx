import React, {FunctionComponent, useState} from 'react';
import {Menu} from "antd";
import {NavLink, useHistory, useLocation} from "react-router-dom";
import {EnterOutlined, LogoutOutlined} from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import {menu} from "./menu.constant";
import user from "../../../store/user";
import {RoutesConstants} from "../../../core/constants/routes";
import {observer} from "mobx-react-lite";

interface OwnProps {
}

type Props = OwnProps;

const Sidebar: FunctionComponent<Props> = (props) => {
    const location = useLocation();
    const history = useHistory();
    const [collapsed, setCollapsed] = useState<boolean>(false);

    const logout = () => {
        user.logout()
        history.push(RoutesConstants.LOGIN)
    }
    return (
        <Sider className={"sidebar"} collapsible onCollapse={() => setCollapsed(!collapsed)}>
            <div className="logo"/>
            <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
                {menu.map(item =>
                    <Menu.Item key={item.link} icon={item.icon}>
                        <NavLink to={item.link}>
                            {item.title}
                        </NavLink>
                    </Menu.Item>
                )}
                <Menu.Item
                    key={RoutesConstants.MAIN}
                    onClick={() => history.push(RoutesConstants.MAIN)}
                    icon={<EnterOutlined/>}>
                    Main page
                </Menu.Item>
                <Menu.Item key={"logout"} onClick={logout} icon={<LogoutOutlined/>}>Logout</Menu.Item>
            </Menu>
        </Sider>
    );
};

export default observer(Sidebar);
