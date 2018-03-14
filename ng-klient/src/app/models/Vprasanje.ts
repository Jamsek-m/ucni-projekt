import {MozenOdgovor} from "./MozenOdgovor";
import {Odgovor} from "./Odgovor";

export class Vprasanje {
    public id: number;
    public vprasanje: string;
    public seznamMoznihOdgovorov: [MozenOdgovor];
    public odgovori: [Odgovor];

}
