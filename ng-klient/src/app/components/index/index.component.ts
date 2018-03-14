import {Component, OnInit} from "@angular/core";
import {VprasanjaStoritev} from "../../storitve/vprasanja.storitev";
import {Vprasanje} from "../../models/Vprasanje";
import {OdgovorStoritev} from "../../storitve/odgovor.storitev";

@Component({
    selector: "app-index-page",
    moduleId: module.id,
    templateUrl: "index.component.html"
})
export class IndexComponent implements OnInit {
    vprasanje: Vprasanje;

    constructor(private vprasanja: VprasanjaStoritev, private odgovori: OdgovorStoritev) {
        this.vprasanje = new Vprasanje();
    }

    ngOnInit(): void {
        this.pridobiVprasanje();
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
                    console.log("Odgovor zabeležen: ", odgovor);
                },
                (err) => {
                    console.error(err);
                }
            );
    }

}
