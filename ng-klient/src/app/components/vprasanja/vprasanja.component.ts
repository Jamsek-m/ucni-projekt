import {Component, OnInit} from "@angular/core";
import {Vprasanje} from "../../models/Vprasanje";
import {Router} from "@angular/router";
import {VprasanjaStoritev} from "../../storitve/vprasanja.storitev";
import {StorageStoritev} from "../../storitve/storage.storitev";

@Component({
    selector: "app-vprasanja-page",
    moduleId: module.id,
    templateUrl: "vprasanja.component.html",
    styleUrls: ["vprasanja.component.css"]
})
export class VprasanjaComponent implements OnInit {
    // konstante
    private KEY_LIMIT = "vprasanja-limit";
    private DEFAULT_LIMIT = 5;
    // podatki za prikaz
    seznamVprasanj: Vprasanje[];
    limit: number;
    trenutnaStran: number;
    seznamVsehStrani: number[];


    constructor(private router: Router, private vprasanja: VprasanjaStoritev, private storage: StorageStoritev) {

    }

    private static posodobiSteviloStrani(stStrani: number) {
        return Array(stStrani).fill(0).map((x, i) => i + 1);
    }

    ngOnInit(): void {
        this.seznamVsehStrani = [];
        this.seznamVprasanj = [];
        const shranjenLimit = this.storage.getItem(this.KEY_LIMIT);
        this.limit = shranjenLimit ? shranjenLimit : this.DEFAULT_LIMIT;
        this.pojdiNaStran(1);
    }

    nastaviLimit(noviLimit: number) {
        this.limit = noviLimit;
        this.storage.shraniItem(this.KEY_LIMIT, this.limit);
        this.pojdiNaStran(1);
    }

    izberiVprasanje(id: number) {
        this.router.navigate(["vprasanja", id, "statistika"]);
    }

    pojdiNaStran(stran: number) {
        this.trenutnaStran = stran;
        this.pridobiStranVprasanj(stran);
    }

    pojdiNaNovoVprasanje() {
        this.router.navigate(["/vprasanja/novo"]);
    }

    private pridobiStranVprasanj(stran: number) {
        const offset: number = (stran - 1) * this.limit;
        this.vprasanja.pridobiVprasanjaPoStraneh(this.limit, offset)
            .then(
                (vprasanja) => {
                    this.seznamVprasanj = vprasanja.telo.seznam;
                    this.seznamVsehStrani = VprasanjaComponent.posodobiSteviloStrani(vprasanja.glava.stStrani);
                },
                (err) => {
                    console.error(err);
                }
            );
    }

}
