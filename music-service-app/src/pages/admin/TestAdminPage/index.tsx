import React, { FunctionComponent } from 'react';
import {observer} from "mobx-react-lite";

interface OwnProps {}

type Props = OwnProps;

const TestAdminPage: FunctionComponent<Props> = (props) => {

    return (<div>TestAdminPage</div>);
};

export default observer(TestAdminPage);
