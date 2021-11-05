import React, {FunctionComponent, useEffect} from 'react';
import {Redirect, Switch} from "react-router-dom";
import {adminRoutes, authRoutes, publicRoutes, RoutesConstants} from "../core/constants/routes";
import user from "../store/user";
import {observer} from "mobx-react-lite";
import {checkRouteTypeHandler} from "./environment";

interface OwnProps {
}

type Props = OwnProps;

const AppRouter: FunctionComponent<Props> = (props) => {
    useEffect(() => {
        user.getToken()
    }, []);

    // const [isAuth, setIsAuth] = useState<boolean>(!!user.getToken());
    // console.log("user.isAdmin", user.isAdmin)
    // let history = useHistory();
    //TODO maybe bug

    return (
        <Switch>
            {
                publicRoutes.map(({path, component, type}) =>
                    checkRouteTypeHandler(type, path, component)
                )
            }
            {
                user.getToken() &&
                authRoutes.map(({path, component, type}) =>
                    checkRouteTypeHandler(type, path, component)
                )
            }
            {
                user.isAdmin &&
                adminRoutes.map(({path, component, type}) =>
                    checkRouteTypeHandler(type, path, component)
                )
            }
            {user.getToken() ? <Redirect to={RoutesConstants.MAIN}/> : <Redirect to={RoutesConstants.LOGIN}/>}
        </Switch>
    );
};

export default observer(AppRouter);
