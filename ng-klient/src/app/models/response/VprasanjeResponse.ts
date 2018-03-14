import {Vprasanje} from "../Vprasanje";

export class VprasanjeResponse {
    public glava: Glava;
    public telo: Telo;
}

export class Telo {
    public seznam: Vprasanje[];
}

export class Glava {
    public steviloVsehZadetkov: number;
    public stNaStran: number;
    public stStrani: number;
    public trenutnaStran;
}
