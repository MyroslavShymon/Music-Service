import {makeAutoObservable} from "mobx";


class ConnectAdmin {

    constructor() {
        makeAutoObservable(this, {}, {deep: true});
    }

}


export default new ConnectAdmin();