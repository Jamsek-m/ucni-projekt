import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Vprasanje} from "../models/Vprasanje";

@Injectable()
export class VprasanjaStoritev {
    private URL = "http://localhost:8080/v1/vprasanja";
    private headers: HttpHeaders;

    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders({
            "Content-Type": "application/json"
        });
    }

    public pridobiVsaVprasanja(): Promise<any> {
        return this.http.get(this.URL, {headers: this.headers})
            .toPromise()
            .then(res => res as Vprasanje[]);
    }

    public pridobiNakljucnoVprasanje(): Promise<any> {
        const url = `${this.URL}/random`;
        return this.http.get(url, {headers: this.headers})
            .toPromise()
            .then(res => res as Vprasanje);
    }



}
