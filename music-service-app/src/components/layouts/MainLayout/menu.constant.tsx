import React from "react";
import {BookOutlined, CustomerServiceOutlined, HomeOutlined, SearchOutlined} from "@ant-design/icons";
import {IMenu} from "../environment/menu.interface";
import {RoutesConstants} from "../../../core/constants/routes";

export const menu: IMenu[] = [
    {
        title: "Home",
        icon: <HomeOutlined style={{fontSize: "150%"}}/>,
        link: RoutesConstants.MAIN
    },
    {
        title: "Search",
        icon: <SearchOutlined style={{fontSize: "150%"}}/>,
        link: RoutesConstants.SEARCH
    },
    {
        title: "Genres",
        icon: <CustomerServiceOutlined style={{fontSize: "150%"}}/>,
        link: RoutesConstants.GENRE
    },
    {
        title: "Libraries",
        icon: <BookOutlined style={{fontSize: "150%"}}/>,
        link: RoutesConstants.LIBRARY
    },
]