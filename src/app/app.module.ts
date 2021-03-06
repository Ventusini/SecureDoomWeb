import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppRoutingModule} from  './app-routing.module';

import { AppComponent } from './app.component';
import { MapListComponent } from './map-list/map-list.component';
import { GeneralMapComponent } from './general-map/general-map.component';
import { GraphListComponent } from './graph-list/graph-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CarFlowService } from './car-flow.service';
import { IncidentsService } from './incidents.service';
import { IncidentsChartComponent } from './incidents-chart/incidents-chart.component';
import { CarsFlowChartComponent } from './cars-flow-chart/cars-flow-chart.component';
import { MosquittoWebSocketService } from './services/mosquitto-web-socket.service';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    AppComponent,
    MapListComponent,
    GeneralMapComponent,
    GraphListComponent,
    IncidentsChartComponent,
    CarsFlowChartComponent,
    ControlPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [CarFlowService, IncidentsService, MosquittoWebSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
