import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";


import {AppComponent} from "./app.component";
import {IndexComponent} from "./components/index/index.component";
import {VprasanjaStoritev} from "./storitve/vprasanja.storitev";
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {OdgovorStoritev} from "./storitve/odgovor.storitev";
import {VprasanjaComponent} from "./components/vprasanja/vprasanja.component";
import {StorageStoritev} from "./storitve/storage.storitev";
import {StatistikaComponent} from "./components/vprasanja/statistika/statistika.component";
import {Napaka404Component} from "./components/napake/404/404.component";
import {NovoVprasanjeComponent} from "./components/vprasanja/novo/novo-vprasanje.component";


@NgModule({
    declarations: [
        AppComponent,
        IndexComponent,
        VprasanjaComponent,
        StatistikaComponent,
        Napaka404Component,
        NovoVprasanjeComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule
    ],
    providers: [
        VprasanjaStoritev,
        OdgovorStoritev,
        StorageStoritev
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
