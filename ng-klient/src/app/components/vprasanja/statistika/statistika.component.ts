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
        this.router.navigate(["/upravljaj"]);
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
                    const seznam = odgovori.map((item: Odgovor) => {
                       return {
                           id: item.id,
                           ustvarjenOb: new Date(item.ustvarjenOb),
                           posodobljenOb: new Date(item.posodobljenOb),
                           odgovor: item.odgovor
                       };
                    });
                    this.seznamOdgovorov = odgovori;
                },
                (err) => {
                    console.error(err);
                }
            );
        });
    }

}
