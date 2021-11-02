import React, {FunctionComponent, useEffect, useState} from 'react';
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import {PagesConstants} from "./core/constants/pages.constants";
import EmptyLayout from "./components/layouts/EmptyLayout";
import {authRoutes, publicRoutes, RoutesConstants} from "./core/constants/routes";
import MainLayout from "./components/layouts/MainLayout";
import user from "./store/user";
import {observer} from "mobx-react-lite";

interface OwnProps {
}

type Props = OwnProps;

const AppRouter: FunctionComponent<Props> = (props) => {
    const [isAuth, setIsAuth] = useState<boolean>(!!user.getToken());
    // let history = useHistory();

    return (
        <Switch>
            {
                publicRoutes.map(({path, component, type}) =>
                    <Route key={path} path={path}
                           render={() => type === PagesConstants.MAIN ? <MainLayout>{component}</MainLayout> :
                               <EmptyLayout>{component}</EmptyLayout>} exact/>//TODO
                )
            }
            {
                isAuth &&
                authRoutes.map(({path, component, type}) =>
                    <Route key={path} path={path}
                           render={() => type === PagesConstants.MAIN ? <MainLayout>{component}</MainLayout> :
                               <EmptyLayout>{component}</EmptyLayout>} exact/>//TODO
                )
            }
            {isAuth ? <Redirect to={RoutesConstants.MAIN}/> : <Redirect to={RoutesConstants.LOGIN}/>}
        </Switch>
    );
};

export default observer(AppRouter);
