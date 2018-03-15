import {Component, OnInit} from "@angular/core";
import {VprasanjaStoritev} from "../../storitve/vprasanja.storitev";
import {Vprasanje} from "../../models/Vprasanje";
import {OdgovorStoritev} from "../../storitve/odgovor.storitev";

@Component({
    selector: "app-index-page",
    moduleId: module.id,
    templateUrl: "index.component.html",
    styleUrls: ["index.component.css"]
})
export class IndexComponent implements OnInit {
    vprasanje: Vprasanje;
    odgovorZabelezen: boolean;

    constructor(private vprasanja: VprasanjaStoritev, private odgovori: OdgovorStoritev) {
        this.vprasanje = new Vprasanje();
    }

    ngOnInit(): void {
        this.pridobiVprasanje();
        this.odgovorZabelezen = false;
    }

    pridobiVprasanje() {
        this.vprasanja.pridobiNakljucnoVprasanje().then(
            (vprasanje) => {
                this.vprasanje = vprasanje;
            },
            (err) => {
                console.error(err);
            }
        );
    }

    shraniOdgovor(idOdgovora: number) {
        this.odgovori.shraniOdgovorNaVprasanje(this.vprasanje.id, idOdgovora)
            .then(
                (odgovor) => {
                    this.odgovorZabelezen = true;
                },
                (err) => {
                    console.error(err);
                }
            );
    }

}
