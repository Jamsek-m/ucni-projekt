import {RouterModule, Routes} from "@angular/router";
import {IndexComponent} from "./components/index/index.component";
import {NgModule} from "@angular/core";
import {VprasanjaComponent} from "./components/vprasanja/vprasanja.component";
import {StatistikaComponent} from "./components/vprasanja/statistika/statistika.component";


const routes: Routes = [
    {path: "", component: IndexComponent},
    {path: "upravljaj", component: VprasanjaComponent},
    {path: "vprasanja/:id/statistika", component: StatistikaComponent},
    {path: "*", component: IndexComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
