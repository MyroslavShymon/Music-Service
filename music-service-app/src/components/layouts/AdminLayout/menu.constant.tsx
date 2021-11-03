import {IMenu} from "../environment/menu.interface";
import {RoutesConstants} from "../../../core/constants/routes";
import {CustomerServiceOutlined, HomeOutlined, OrderedListOutlined} from "@ant-design/icons";

export const menu: IMenu[] = [
    {
        title: "Main",
        icon: <HomeOutlined style={{fontSize: "150%"}}/>,
        link: RoutesConstants.ADMINMAIN
    },
    {
        title: "Test",
        icon: <OrderedListOutlined style={{fontSize: "150%"}}/>,
        link: RoutesConstants.ADMINTEST
    },
    {
        title: "Genre",
        icon: <CustomerServiceOutlined style={{fontSize: "150%"}}/>,
        link: RoutesConstants.ADMINGENRE
    },
]