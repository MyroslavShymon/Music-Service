import React, {FunctionComponent} from 'react';
import Title from "antd/es/typography/Title";
import "./index.less"
import AuthForm from "./AuthForm";
import useTimeout from "../../hooks/useTimeout";
import AlertForm from "./AlertForm";
import {useHistory} from "react-router-dom";
import {RoutesConstants} from "../../core/constants/routes";

interface OwnProps {
}

type Props = OwnProps;

const AuthPage: FunctionComponent<Props> = (props) => {
    const history = useHistory();
    const [showAlert, setShowAlert] = useTimeout(5000)

    return (
        <>
            <Title className={"login-page__title"}>
                {history.location.pathname === RoutesConstants.LOGIN ? "Login" : "Registration"}
            </Title>
            <AuthForm setShowAlert={setShowAlert}/>
            <AlertForm showAlert={showAlert}/>
        </>
    );
};

export default AuthPage;
