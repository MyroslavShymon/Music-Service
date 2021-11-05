import {IRoutes} from "../../interfaces/route.interface";
import {PagesConstants} from "../pages.constants";
import {RoutesConstants} from "./routes.constants";
import {GenrePage, LibraryPage, MainPage, SearchPage, TestPage} from "../../../pages";

export const authRoutes: IRoutes[] = [
    {
        component: <TestPage/>,
        path: RoutesConstants.TEST,
        type: PagesConstants.EMPTY
    },
    {
        component: <MainPage/>,
        path: RoutesConstants.MAIN,
        type: PagesConstants.MAIN
    },
    {
        component: <SearchPage/>,
        path: RoutesConstants.SEARCH,
        type: PagesConstants.MAIN
    },
    {
        component: <GenrePage/>,
        path: RoutesConstants.GENRE,
        type: PagesConstants.MAIN
    },
    {
        component: <LibraryPage/>,
        path: RoutesConstants.LIBRARY,
        type: PagesConstants.MAIN
    },
]