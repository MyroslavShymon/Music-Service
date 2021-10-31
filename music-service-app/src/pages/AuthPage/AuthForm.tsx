import React, {FunctionComponent} from 'react';
import {Button, Checkbox, Form, Input} from "antd";
import {formItemsConstant} from "./environment/formItems.constant";
import {IUser} from "../../core/interfaces/user.interface";
import user from "../../store/user";
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";
import {TForm} from "../../core/types/form.type";
import {TSetState} from "../../core/types/setState.type";
import {RoutesConstants} from "../../core/constants/routes";

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
                history.push('/test/1')
        }else{
            await user.login(values)
            if (user.response.type === "success")
                history.push(RoutesConstants.MAIN)
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

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    {history.location.pathname === RoutesConstants.LOGIN ? "Login" : "Registration"}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default observer(AuthForm);
