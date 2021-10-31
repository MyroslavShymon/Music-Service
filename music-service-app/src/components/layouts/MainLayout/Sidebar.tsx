import React, {FunctionComponent, useState} from 'react';
import Sider from "antd/es/layout/Sider";
import {Menu} from "antd";
import {menu} from "./menu.constant";
import {NavLink, useLocation} from 'react-router-dom';

interface OwnProps {
}

type Props = OwnProps;

const Sidebar: FunctionComponent<Props> = (props) => {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState<boolean>(false);

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
            </Menu>
        </Sider>
    );
};

export default Sidebar;
