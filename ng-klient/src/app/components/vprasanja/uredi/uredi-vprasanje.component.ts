import {Component, OnInit} from "@angular/core";
import {Vprasanje} from "../../../models/Vprasanje";
import {VprasanjaStoritev} from "../../../storitve/vprasanja.storitev";
import {ActivatedRoute, Router} from "@angular/router";
import {MozenOdgovor} from "../../../models/MozenOdgovor";
import {EditVprasanjeRequest} from "../../../models/request/EditVprasanjeRequest";

@Component({
    selector: "app-uredi-vpr-page",
    moduleId: module.id,
    templateUrl: "uredi-vprasanje.component.html"
})
export class UrediVprasanjeComponent implements OnInit {
    static vprasanjaStatic: VprasanjaStoritev;
    vprasanje: Vprasanje;
    mozniOdgovori: MozenOdgovor[];
    steviloVnosnihPolj: number;
    shranjeno: boolean;

    constructor(private route: ActivatedRoute, private vprasanja: VprasanjaStoritev, private router: Router) {
        UrediVprasanjeComponent.vprasanjaStatic = vprasanja;
    }

    ngOnInit(): void {
        this.shranjeno = false;
        this.vprasanje = new Vprasanje();
        this.mozniOdgovori = [];
        this.steviloVnosnihPolj = 0;
        this.pridobiId();
    }

    dodajVnosnoPolje(vrednost: string, id: number) {
        this.steviloVnosnihPolj++;

        const parent: HTMLElement = document.getElementById("mozni-odgovori");

        const div: HTMLElement = document.createElement("DIV");
        div.id = "div-vpr_" + this.steviloVnosnihPolj;

        const input: HTMLInputElement = <HTMLInputElement>document.createElement("INPUT");
        input.name = "mozni-odgovor";
        input.title = "Možni odgovor";
        input.value = vrednost ? vrednost : "";
        input.setAttribute("data-id", (id ? id.toString() : "0"));
        const a: HTMLAnchorElement = <HTMLAnchorElement>document.createElement("A");
        a.addEventListener("click", this.izbrisiVnosnoPolje);
        a.href = "javascript:void(0);";
        a.innerHTML = "X";

        const span = document.createElement("SPAN");
        span.innerHTML = "&#160;";

        div.appendChild(input);
        div.appendChild(span);
        div.appendChild(a);
        parent.appendChild(div);

    }

    izbrisiVnosnoPolje(event) {
        const target = event.target || event.srcElement || event.currentTarget;
        const div = target.parentElement;

        const odgovorId = +Array.from(div.children)
            .filter((item: HTMLElement) => {
                return item.tagName === "INPUT";
            })
            .map((item: HTMLElement) => {
                return item.getAttribute("data-id");
            })[0];
        if (odgovorId !== 0) {
            UrediVprasanjeComponent.vprasanjaStatic.izbrisiMozenOdgovor(odgovorId).then(
                () => {
                    div.remove();
                },
                (err) => {
                    console.error(err);
                }
            );
        } else {
            div.remove();
        }
    }

    submitFormo() {
        if (!this.vprasanje) {
            return false;
        }

        const inputs = Array.from(document.getElementsByName("mozni-odgovor"));
        const results = inputs
        // .map((item: HTMLInputElement) => item.value)
            .filter((item: HTMLInputElement) => {
                return item.value !== null && item.value !== undefined && item.value !== "";
            })
            .map((item: HTMLInputElement) => {
                return new MozenOdgovor(+item.getAttribute("data-id"), item.value);
            });
        const podatki = new EditVprasanjeRequest(this.vprasanje.id, this.vprasanje.vprasanje, results);
        this.vprasanja.urediVprasanje(podatki).then(
            () => {
                this.shranjeno = true;
            },
            (err) => {
                console.error(err);
            }
        );
    }

    pojdiNazajNaSeznam() {
        // noinspection JSIgnoredPromiseFromCall
        this.router.navigate(["upravljaj"]);
    }

    private pridobiId() {
        this.route.params.subscribe((params) => {
            const id = +params["id"];
            this.vprasanja.pridobiEnoVprasanje(id).then(
                (vprasanje) => {
                    this.vprasanje = vprasanje;
                    this.zacetnaVnosnaPolja();
                },
                (err) => {
                    console.error(err);
                }
            );
        });
    }

    private zacetnaVnosnaPolja() {
        const mozni: MozenOdgovor[] = this.vprasanje.seznamMoznihOdgovorov;
        mozni.forEach(item => {
            this.dodajVnosnoPolje(item.tipOdgovora, item.id);
        });
    }

}
