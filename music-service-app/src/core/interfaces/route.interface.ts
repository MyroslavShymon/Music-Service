import {ComponentType, FunctionComponent, ReactNode} from "react";
import {RouteComponentProps} from "react-router-dom";
import {RoutesConstants} from "../constants/routes/routes.constants";
import {PagesConstants} from "../constants/pages.constants";

export interface IRoutes {
    component: ReactNode,
    path: RoutesConstants,
    type: PagesConstants
}