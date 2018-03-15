
export class NovoVprasanjeRequest {

    public vprasanje: string;

    public mozniOdgovori: string[];

    constructor(vpr: string, odgs: string[]) {
        this.mozniOdgovori = odgs;
        this.vprasanje = vpr;
    }
}
