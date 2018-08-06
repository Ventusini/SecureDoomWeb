import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapListComponent } from './map-list/map-list.component';
import { GeneralMapComponent } from './general-map/general-map.component';
import { GraphListComponent } from './graph-list/graph-list.component';
import { IncidentsChartComponent } from './incidents-chart/incidents-chart.component';
import { CarsFlowChartComponent } from './cars-flow-chart/cars-flow-chart.component';
const routes: Routes = [
    { path: '', redirectTo: 'gmap', pathMatch: 'full' },
    { path: 'gmap', component: GeneralMapComponent },
    { path: 'maps', component: MapListComponent },
    { path: 'incidents', component: IncidentsChartComponent },
    { path: 'ED', component: CarsFlowChartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }