import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Vprasanje} from "../models/Vprasanje";
import {VprasanjeResponse} from "../models/response/VprasanjeResponse";
import {NovoVprasanjeRequest} from "../models/request/NovoVprasanjeRequest";
import {EditVprasanjeRequest} from "../models/request/EditVprasanjeRequest";

@Injectable()
export class VprasanjaStoritev {
    private URL = "http://localhost:8080/v1/vprasanja";
    private URL_STAT = "http://localhost:8080/v1/statistika";
    private URL_MOZ_ODG = "http://localhost:8080/v1/mozni-odgovori";
    private headers: HttpHeaders;

    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders({
            "Content-Type": "application/json"
        });
    }

    public pridobiVprasanjaPoStraneh(limit: number, offset: number): Promise<any> {
        const url = `${this.URL}?limit=${limit}&offset=${offset}`;
        return this.http.get(url, {headers: this.headers})
            .toPromise()
            .then(res => res as VprasanjeResponse);
    }

    public pridobiEnoVprasanje(id: number): Promise<any> {
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

    public pridobiStatistikoVprasanja(id: number): Promise<any> {
        const url = `${this.URL_STAT}/${id}`;
        return this.http.get(url, {headers: this.headers})
            .toPromise();
    }

    public shraniVprasanje(vprasanje: NovoVprasanjeRequest): Promise<any> {
        const podatki = JSON.stringify(vprasanje);
        return this.http.post(this.URL, podatki, {headers: this.headers})
            .toPromise();
    }

    public urediVprasanje(vprasanje: EditVprasanjeRequest): Promise<any> {
        const podatki = JSON.stringify(vprasanje);
        return this.http.put(`${this.URL}/${vprasanje.id}`, podatki, {headers: this.headers})
            .toPromise();
    }

    public izbrisiMozenOdgovor(id: number) {
        return this.http.delete(`${this.URL_MOZ_ODG}/${id}`, {headers: this.headers})
            .toPromise();
    }

    public izbrisiVprasanje(id: number) {
        return this.http.delete(`${this.URL}/${id}`, {headers: this.headers})
            .toPromise();
    }

}
