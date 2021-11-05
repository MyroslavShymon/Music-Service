import React, {FunctionComponent} from 'react';
import {Checkbox, Form, Input} from "antd";
import {formItemsConstant} from "./environment/formItems.constant";
import user from "../../store/user";
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";
import {TForm} from "../../core/types/form.type";
import {TSetState} from "../../core/types/setState.type";
import {RoutesConstants} from "../../core/constants/routes";
import SubmitFormItem from "./SubmitFormItem";
import {IUser} from "../../store/core/interfaces/response/User.interface.response";

interface OwnProps {
    setShowAlert: TSetState<boolean>
}

type Props = OwnProps;

const AuthForm: FunctionComponent<Props> = ({setShowAlert}) => {
    const history = useHistory()

    const onFinish = async (values: TForm<IUser>) => {
        if (history.location.pathname === RoutesConstants.REGISTRATION) {
            await user.registration(values)
            if (user.response.type === "success")
                history.push(RoutesConstants.TESTSTART)
        } else {
            await user.login(values)
            console.log("user.response.type", user.response.type, user)
            if (user.response.type === "success") {
                console.log("user.response.type", user.response.type, user)
                history.push(RoutesConstants.MAIN)
            }
        }
        setShowAlert(true)
    };

    // const onFinishFailed = (errorInfo: any) => {
    //     console.log('Failed:', errorInfo);
    // };

    return (
        <Form
            name="basic"
            initialValues={{remember: true}}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            layout={"vertical"}
            autoComplete="off"
        >
            {formItemsConstant.map(item =>
                history.location.pathname === RoutesConstants.LOGIN && 'registration' === item.pathname ? null :
                    <Form.Item
                        key={item.name}
                        label={item.label}
                        name={item.name}
                        rules={[{required: true, message: `Please input your ${item.name}!`}]}
                    >
                        <Input/>
                    </Form.Item>
            )}

            <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <SubmitFormItem/>
        </Form>
    );
};

export default observer(AuthForm);
