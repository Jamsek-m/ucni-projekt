import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {OdgovorStoritev} from "../../../storitve/odgovor.storitev";
import {VprasanjaStoritev} from "../../../storitve/vprasanja.storitev";
import {Vprasanje} from "../../../models/Vprasanje";
import {Odgovor} from "../../../models/Odgovor";

@Component({
    selector: "app-statistika-page",
    moduleId: module.id,
    templateUrl: "statistika.component.html",
    styleUrls: ["statistika.component.css"]
})
export class StatistikaComponent implements OnInit {
    vprasanje: Vprasanje;
    seznamOdgovorov: Odgovor[];
    seznamStatistike;

    constructor(private router: Router, private route: ActivatedRoute,
                private odgovori: OdgovorStoritev, private vprasanja: VprasanjaStoritev) {

    }

    ngOnInit(): void {
        this.vprasanje = new Vprasanje();
        this.seznamOdgovorov = [];
        this.seznamStatistike = [];
        this.pridobiParamId();
    }

    pojdiNazaj() {
        // noinspection JSIgnoredPromiseFromCall
        this.router.navigate(["/upravljaj"]);
    }

    urediVprasanje() {
        // noinspection JSIgnoredPromiseFromCall
        this.router.navigate(["vprasanja", this.vprasanje.id, "uredi"]);
    }

    izbrisiVprasanje() {
        if (this.vprasanje.id !== 0) {
            this.vprasanja.izbrisiVprasanje(this.vprasanje.id).then(
                () => {
                    // noinspection JSIgnoredPromiseFromCall
                    this.router.navigate(["upravljaj"]);
                },
                (err) => {
                    console.error(err);
                }
            );
        }
    }

    izbrisiOdgovor(id: number) {
        this.odgovori.izbrisiOdgovor(id).then(
            () => {
                this.pridobiParamId();
            },
            (err) => {
                console.error(err);
            }
        );
    }

    private pridobiParamId() {
        this.route.params.subscribe(params => {
            const id = +params["id"];
            this.vprasanja.pridobiEnoVprasanje(id).then(
                (vprasanje) => {
                    this.vprasanje = vprasanje;
                },
                (err) => {
                    console.error(err);
                }
            );
            this.vprasanja.pridobiStatistikoVprasanja(id).then(
                (stats) => {
                    this.seznamStatistike = stats;
                },
                (err) => {
                    console.error(err);
                }
            );
            this.odgovori.poisciOdgovoreVprasanja(id).then(
                (odgovori) => {
                    this.seznamOdgovorov = odgovori;
                },
                (err) => {
                    console.error(err);
                }
            );
        });
    }

}
