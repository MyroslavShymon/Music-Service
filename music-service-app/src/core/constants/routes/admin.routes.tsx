import {IRoutes} from "../../interfaces/route.interface";
import {PagesConstants} from "../pages.constants";
import {RoutesConstants} from "./routes.constants";
import {AnswerAdminPage, GenreAdminPage, MainAdminPage, TestAdminPage} from "../../../pages/admin";

export const adminRoutes: IRoutes[] = [
    {
        component: <MainAdminPage/>,
        path: RoutesConstants.ADMINMAIN,
        type: PagesConstants.ADMIN
    },
    {
        component: <GenreAdminPage/>,
        path: RoutesConstants.ADMINGENRE,
        type: PagesConstants.ADMIN
    },
    {
        component: <TestAdminPage/>,
        path: RoutesConstants.ADMINTEST,
        type: PagesConstants.ADMIN
    },
    {
        component: <AnswerAdminPage/>,
        path: RoutesConstants.ADMINANSWER,
        type: PagesConstants.ADMIN
    },
]