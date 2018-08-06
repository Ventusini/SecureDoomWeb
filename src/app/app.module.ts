import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppRoutingModule} from  './app-routing.module';

import { AppComponent } from './app.component';
import { MapListComponent } from './map-list/map-list.component';
import { GeneralMapComponent } from './general-map/general-map.component';
import { GraphListComponent } from './graph-list/graph-list.component';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { CarFlowService } from './car-flow.service';
import { IncidentsService } from './incidents.service';
import { IncidentsChartComponent } from './incidents-chart/incidents-chart.component';
import { CarsFlowChartComponent } from './cars-flow-chart/cars-flow-chart.component';

import { Observable } from 'rxjs';

import {
  IMqttMessage,
  MqttModule,
  IMqttServiceOptions
} from 'ngx-mqtt';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'm12.cloudmqtt.com',
  port: 12094,
  path: '/'
};

@NgModule({
  declarations: [
    AppComponent,
    MapListComponent,
    GeneralMapComponent,
    GraphListComponent,
    IncidentsChartComponent,
    CarsFlowChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS)
  ],
  providers: [CarFlowService, IncidentsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
