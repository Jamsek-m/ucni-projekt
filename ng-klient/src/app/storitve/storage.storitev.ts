import {Injectable} from "@angular/core";

@Injectable()
export class StorageStoritev {

    constructor() {

    }

    public shraniItem(tag: string, value: any) {
        localStorage.setItem(tag, JSON.stringify(value));
    }

    public getItem(tag: string) {
        return JSON.parse(localStorage.getItem(tag));
    }

}
