import React, {FunctionComponent, useState} from 'react';
import Sider from "antd/es/layout/Sider";
import {Menu} from "antd";
import {menu} from "./menu.constant";
import {NavLink, useHistory, useLocation} from 'react-router-dom';
import {RoutesConstants} from "../../../core/constants/routes";
import user from "../../../store/user";
import {EnterOutlined, LogoutOutlined} from "@ant-design/icons";
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
    console.log("location.pathname", location.pathname)
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
                {
                    user.isAdmin &&
                    <Menu.Item
                        onClick={() => history.push(RoutesConstants.ADMINMAIN)}
                        icon={<EnterOutlined/>}>
                        Admin page
                    </Menu.Item>
                }
                <Menu.Item onClick={logout} icon={<LogoutOutlined/>}>Logout</Menu.Item>

            </Menu>
        </Sider>
    );
};

export default observer(Sidebar);
