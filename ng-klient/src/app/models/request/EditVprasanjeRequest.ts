import {MozenOdgovor} from "../MozenOdgovor";

export class EditVprasanjeRequest {

    public id: number;

    public vprasanje: string;

    public mozniOdgovori: MozenOdgovor[];

    constructor(id: number, vpr: string, odgs: MozenOdgovor[]) {
        this.mozniOdgovori = odgs;
        this.vprasanje = vpr;
        this.id = id;
    }
}
