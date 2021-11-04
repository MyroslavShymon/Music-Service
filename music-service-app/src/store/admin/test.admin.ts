import {makeAutoObservable} from "mobx";


class TestAdmin {

    constructor() {
        makeAutoObservable(this, {}, {deep: true});
    }

}


export default new TestAdmin();