import {Component, OnInit} from "@angular/core";
import {Vprasanje} from "../../../models/Vprasanje";
import {VprasanjaStoritev} from "../../../storitve/vprasanja.storitev";
import {Router} from "@angular/router";
import {MozenOdgovor} from "../../../models/MozenOdgovor";

@Component({
    selector: "app-novo-vpr-page",
    moduleId: module.id,
    templateUrl: "novo-vprasanje.component.html"
})
export class NovoVprasanjeComponent implements OnInit {
    vprasanje: string;
    mozniOdgovori: MozenOdgovor[];
    steviloVnosnihPolj: number;

    constructor(private vprasanja: VprasanjaStoritev, private router: Router) {

    }

    ngOnInit(): void {
        this.vprasanje = "";
        this.mozniOdgovori = [];
        this.steviloVnosnihPolj = 1;
    }

    dodajVnosnoPolje() {
        this.steviloVnosnihPolj++;

        const parent: HTMLElement = document.getElementById("mozni-odgovori");

        const div: HTMLElement = document.createElement("DIV");
        div.id = "div-vpr_" + this.steviloVnosnihPolj;

        const element: HTMLInputElement = <HTMLInputElement>document.createElement("INPUT");
        element.name = "mozni-odgovor";
        element.title = "Možni odgovor";

        const a: HTMLAnchorElement = <HTMLAnchorElement>document.createElement("A");
        a.addEventListener("click", this.izbrisiVnosnoPolje);
        a.href = "javascript:void(0);";
        a.innerHTML = "X";

        const span = document.createElement("SPAN");
        span.innerHTML = "&#160;";

        div.appendChild(element);
        div.appendChild(span);
        div.appendChild(a);
        parent.appendChild(div);
    }

    izbrisiVnosnoPolje(event) {
        const target = event.target || event.srcElement || event.currentTarget;
        const div = target.parentElement;
        const id = div.id;
        div.remove();
    }

    submitFormo() {
        const inputs = Array.from(document.getElementsByName("mozni-odgovor"));
        const results = inputs.map((item: HTMLInputElement) => item.value);
        // TODO: dodaj shranjevanje
    }

}
