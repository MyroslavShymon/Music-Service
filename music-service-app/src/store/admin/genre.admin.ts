import {makeAutoObservable} from "mobx";


class GenreAdmin {

    constructor() {
        makeAutoObservable(this, {}, {deep: true});
    }

}


export default new GenreAdmin();