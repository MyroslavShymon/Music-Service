import React from 'react';
import {observer} from "mobx-react-lite";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./AppRouter";

function App() {
    return (
        <BrowserRouter>
            {/*<div>*/}
            {/*    {test.test()}*/}
            {/*    <button onClick={() => test.add()}>add</button>*/}
            {/*</div>*/}
            <AppRouter/>
        </BrowserRouter>
    );
}

export default observer(App);