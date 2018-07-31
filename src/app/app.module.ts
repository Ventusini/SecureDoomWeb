import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppRoutingModule} from  './app-routing.module';

import { AppComponent } from './app.component';
import { MapListComponent } from './map-list/map-list.component';
import { GeneralMapComponent } from './general-map/general-map.component';
import { GraphListComponent } from './graph-list/graph-list.component';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { CarFlowService } from './car-flow.service';

@NgModule({
  declarations: [
    AppComponent,
    MapListComponent,
    GeneralMapComponent,
    GraphListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [CarFlowService],
  bootstrap: [AppComponent]
})
export class AppModule { }
