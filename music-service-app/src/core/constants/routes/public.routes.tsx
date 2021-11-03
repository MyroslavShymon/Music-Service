import {IRoutes,} from "../../interfaces/route.interface";
import {RoutesConstants} from "./routes.constants";
import TestPage from "../../../pages/TestPage";
import {PagesConstants} from "../pages.constants";
import {AuthPage} from "../../../pages";
import TestStartPage from "../../../pages/TestStartPage";
import PreferencesPage from "../../../pages/PreferencesPage";

export const publicRoutes: IRoutes[] = [
    {
        component: <TestPage/>,
        path: RoutesConstants.TEST,
        type: PagesConstants.EMPTY
    },
    {
        component: <TestStartPage/>,
        path: RoutesConstants.TESTSTART,
        type: PagesConstants.EMPTY
    },
    {
        component: <AuthPage/>,
        path: RoutesConstants.LOGIN,
        type: PagesConstants.EMPTY
    },
    {
        component: <AuthPage/>,
        path: RoutesConstants.REGISTRATION,
        type: PagesConstants.EMPTY
    },
    {
        component: <PreferencesPage/>,
        path: RoutesConstants.PREFERENCES,
        type: PagesConstants.EMPTY
    }
]