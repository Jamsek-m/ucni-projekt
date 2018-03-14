import {RouterModule, Routes} from "@angular/router";
import {IndexComponent} from "./components/index/index.component";
import {NgModule} from "@angular/core";


const routes: Routes = [
    {path: "", component: IndexComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
