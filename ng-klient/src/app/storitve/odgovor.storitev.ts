import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Odgovor} from "../models/Odgovor";
import {environment} from "../../environments/environment";

@Injectable()
export class OdgovorStoritev {
    private BASE_URL: string = environment.api;
    private URL = `${environment.api}/v1/odgovori`;
    private headers: HttpHeaders = new HttpHeaders({
        "Content-Type": "application/json"
    });

    constructor(private http: HttpClient) {}

    public shraniOdgovorNaVprasanje(idVprasanja: number, idOdgovora: number): Promise<any> {
        const podatki = JSON.stringify({
            idVprasanja: idVprasanja,
            odgovor: idOdgovora
        });
        return this.http.post(this.URL, podatki, {headers: this.headers})
            .toPromise()
            .then(res => res as Odgovor);
    }

    public poisciOdgovoreVprasanja(idVprasanja: number): Promise<any> {
        const url = `${this.URL}/vprasanje/${idVprasanja}`;
        return this.http.get(url, {headers: this.headers})
            .toPromise()
            .then(res => res as Odgovor[]);
    }

    public izbrisiOdgovor(id: number): Promise<any> {
        const url = `${this.URL}/${id}`;
        return this.http.delete(url, {headers: this.headers}).toPromise();
    }

}
