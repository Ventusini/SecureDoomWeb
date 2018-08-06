import { Component, OnInit } from '@angular/core';
import { CarFlowService } from '../car-flow.service';
import { IncidentsService } from '../incidents.service';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-incidents-chart',
  templateUrl: './incidents-chart.component.html',
  styleUrls: ['./incidents-chart.component.css']
})
export class IncidentsChartComponent implements OnInit {

  chart = [];

  constructor(private _incidents: IncidentsService) { }

  ngOnInit() {
    this._incidents.incidents()
    .subscribe(res => {
      let streets=[];
      let cFalseAlarm=[];
      let cIncident=[];
      let count=[0,0,0,0,0,0,0,0,0,0];
      let unique_array = []
      for(var i=0; i<res.length; i++){
        streets.push(res[i].street_name);
      }
      for(let i = 0;i < streets.length; i++){
        if(unique_array.indexOf(streets[i]) == -1){
            unique_array.push(streets[i])
        }
      }
      for(var i=0; i<res.length; i++){
        for(var l=0; l<unique_array.length; l++){
          if(unique_array[l]==res[i].street_name){
            count[l]++;
          }
        }
        console.log(count)
        streets[i]=res[i].street_name;
      }
      this.chart = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: unique_array,
          datasets: [
            { 
              data: count,
              fillColor: "red",
              fill: true
            },
            /*{ 
              data: [0,5,3],//temp_min,
              borderColor: "#ffcc00",
              fill: false
            },*/
          ]
        },
        options: {
          title:{
            text:'Incidents Chart',
            display: true,
            fontSize: 50
          },
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              scaleLabel:{
                labelString: 'Streets',
                display: true,
                fontSize: 40
              },
              display: true
            }],
            yAxes: [{
              scaleLabel:{
                labelString: 'Incidents',
                display: true,
                fontSize: 40
              },
              display: true,
              ticks: {
                beginAtZero: true
            },
            Color: '#777',
            }],
          }
        }
      });
    })
  }
}
