import {PagesConstants} from "../../../core/constants/pages.constants";
import {Route} from "react-router-dom";
import AdminLayout from "../../../components/layouts/AdminLayout";
import EmptyLayout from "../../../components/layouts/EmptyLayout";
import MainLayout from "../../../components/layouts/MainLayout";
import React, {ReactNode} from "react";
import {RoutesConstants} from "../../../core/constants/routes";

export function checkRouteTypeHandler(type: PagesConstants, path: RoutesConstants, component: ReactNode){
    switch (type) {
        case PagesConstants.ADMIN:
            return <Route key={path} path={path} exact
            render={() => <AdminLayout>{component}</AdminLayout>}
            />
        case PagesConstants.EMPTY:
            return <Route key={path} path={path} exact
            render={() => <EmptyLayout>{component}</EmptyLayout>}/>
        case PagesConstants.MAIN:
            return <Route key={path} path={path} exact
            render={() => <MainLayout>{component}</MainLayout>}/>
        default:
            return <Route key={path} path={path} exact
            render={() => <EmptyLayout>{component}</EmptyLayout>}/>
    }
}