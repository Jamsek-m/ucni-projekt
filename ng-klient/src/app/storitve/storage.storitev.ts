import {Injectable} from "@angular/core";

@Injectable()
export class StorageStoritev {

    constructor() {}

    // noinspection JSMethodCanBeStatic
    public shraniItem(tag: string, value: any) {
        localStorage.setItem(tag, JSON.stringify(value));
    }

    // noinspection JSMethodCanBeStatic
    public getItem(tag: string) {
        return JSON.parse(localStorage.getItem(tag));
    }

}
