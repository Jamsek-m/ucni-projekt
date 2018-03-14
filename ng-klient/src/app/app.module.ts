import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";


import {AppComponent} from "./app.component";
import {IndexComponent} from "./components/index/index.component";
import {VprasanjaStoritev} from "./storitve/vprasanja.storitev";
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {OdgovorStoritev} from "./storitve/odgovor.storitev";


@NgModule({
    declarations: [
        AppComponent,
        IndexComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule
    ],
    providers: [VprasanjaStoritev, OdgovorStoritev],
    bootstrap: [AppComponent]
})
export class AppModule {
}
