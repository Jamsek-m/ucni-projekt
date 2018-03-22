import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Vprasanje} from "../models/Vprasanje";
import {VprasanjeResponse} from "../models/response/VprasanjeResponse";
import {NovoVprasanjeRequest} from "../models/request/NovoVprasanjeRequest";
import {EditVprasanjeRequest} from "../models/request/EditVprasanjeRequest";
import {environment} from "../../environments/environment";

@Injectable()
export class VprasanjaStoritev {
    private BASE_URL: string = environment.api;
    private URL_VPRASANJA = `${environment.api}/v1/vprasanja`;
    private URL_STAT = `${environment.api}/v1/statistika`;
    private URL_MOZ_ODG = `${environment.api}/v1/mozni-odgovori`;

    private headers: HttpHeaders;

    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders({
            "Content-Type": "application/json"
        });
    }


    public pridobiVprasanjaPoStraneh(limit: number, offset: number): Promise<any> {
        console.log("ENV: ", environment.production);
        const url = `${this.URL_VPRASANJA}?limit=${limit}&offset=${offset}`;
        return this.http.get(url, {headers: this.headers})
            .toPromise()
            .then(res => res as VprasanjeResponse);
    }

    public pridobiEnoVprasanje(id: number): Promise<any> {
        const url = `${this.URL_VPRASANJA}/${id}`;
        return this.http.get(url, {headers: this.headers})
            .toPromise()
            .then(res => res as Vprasanje);
    }

    public pridobiNakljucnoVprasanje(): Promise<any> {
        const url = `${this.URL_VPRASANJA}/random`;
        return this.http.get(url, {headers: this.headers})
            .toPromise()
            .then(res => res as Vprasanje);
    }

    public pridobiStatistikoVprasanja(id: number): Promise<any> {
        const url = `${this.URL_STAT}/${id}`;
        return this.http.get(url, {headers: this.headers})
            .toPromise();
    }

    public shraniVprasanje(vprasanje: NovoVprasanjeRequest): Promise<any> {
        const podatki = JSON.stringify(vprasanje);
        return this.http.post(this.URL_VPRASANJA, podatki, {headers: this.headers})
            .toPromise();
    }

    public urediVprasanje(vprasanje: EditVprasanjeRequest): Promise<any> {
        const podatki = JSON.stringify(vprasanje);
        return this.http.put(`${this.URL_VPRASANJA}/${vprasanje.id}`, podatki, {headers: this.headers})
            .toPromise();
    }

    public izbrisiMozenOdgovor(id: number) {
        return this.http.delete(`${this.URL_MOZ_ODG}/${id}`, {headers: this.headers})
            .toPromise();
    }

    public izbrisiVprasanje(id: number) {
        return this.http.delete(`${this.URL_VPRASANJA}/${id}`, {headers: this.headers})
            .toPromise();
    }

}
