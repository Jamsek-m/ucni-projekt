import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Vprasanje} from "../models/Vprasanje";
import {VprasanjeResponse} from "../models/response/VprasanjeResponse";

@Injectable()
export class VprasanjaStoritev {
    private URL = "http://localhost:8080/v1/vprasanja";
    private URL_STAT = "http://localhost:8080/v1/statistika";
    private headers: HttpHeaders;

    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders({
            "Content-Type": "application/json"
        });
    }

    public pridobiVsaVprasanja(): Promise<any> {
        return this.http.get(this.URL, {headers: this.headers})
            .toPromise()
            .then(res => res as VprasanjeResponse);
    }

    public pridobiVprasanjaPoStraneh(limit: number, offset: number) {
        const url = `${this.URL}?limit=${limit}&offset=${offset}`;
        return this.http.get(url, {headers: this.headers})
            .toPromise()
            .then(res => res as VprasanjeResponse);
    }

    public pridobiEnoVprasanje(id: number) {
        const url = `${this.URL}/${id}`;
        return this.http.get(url, {headers: this.headers})
            .toPromise()
            .then(res => res as Vprasanje);
    }

    public pridobiNakljucnoVprasanje(): Promise<any> {
        const url = `${this.URL}/random`;
        return this.http.get(url, {headers: this.headers})
            .toPromise()
            .then(res => res as Vprasanje);
    }

    public pridobiStatistikoVprasanja(id: number) {
        const url = `${this.URL_STAT}/${id}`;
        return this.http.get(url, {headers: this.headers})
            .toPromise();
    }



}
