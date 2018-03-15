import {RouterModule, Routes} from "@angular/router";
import {IndexComponent} from "./components/index/index.component";
import {NgModule} from "@angular/core";
import {VprasanjaComponent} from "./components/vprasanja/vprasanja.component";
import {StatistikaComponent} from "./components/vprasanja/statistika/statistika.component";
import {Napaka404Component} from "./components/napake/404/404.component";
import {NovoVprasanjeComponent} from "./components/vprasanja/novo/novo-vprasanje.component";
import {UrediVprasanjeComponent} from "./components/vprasanja/uredi/uredi-vprasanje.component";


const routes: Routes = [
    {path: "", component: IndexComponent},
    {path: "upravljaj", component: VprasanjaComponent},
    {path: "vprasanja/:id/statistika", component: StatistikaComponent},
    {path: "vprasanja/:id/uredi", component: UrediVprasanjeComponent},
    {path: "vprasanja/novo", component: NovoVprasanjeComponent},
    {path: "404", component: Napaka404Component},
    {path: "**", redirectTo: "/404"}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
