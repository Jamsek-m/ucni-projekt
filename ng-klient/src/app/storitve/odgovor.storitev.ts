import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Odgovor} from "../models/Odgovor";

@Injectable()
export class OdgovorStoritev {
    private URL = "http://localhost:8080/v1/odgovori";
    private headers: HttpHeaders = new HttpHeaders({
        "Content-Type": "application/json"
    });

    constructor(private http: HttpClient) {

    }

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




}
