import { Component, OnInit } from '@angular/core';
import { CarFlowService } from '../car-flow.service';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-cars-flow-chart',
  templateUrl: './cars-flow-chart.component.html',
  styleUrls: ['./cars-flow-chart.component.css']
})
export class CarsFlowChartComponent implements OnInit {
  
  chart : any[] = [];

  constructor(private _carsFlor: CarFlowService) { }

  ngOnInit() {
    this._carsFlor.dailyCars()
    .subscribe(res => {
      console.log(res)
      console.log(new Date(res[0].time).getHours())
      let inHours=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      let outHours=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      let hoursADay=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
      for(var i = 0; i<res.length; i++){
        for(var l=0; l<24; l++){
          if(new Date(res[i].time).getHours()==l){
            if(res[i].kind=="IN"){
              inHours[l]++;
            }
            else{
              outHours[l]++;
            } 
          }
        }
      }
      //console.log(hours)

      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: hoursADay,
          datasets: [
            { 
              label: "Entries",
              data: outHours,
              borderColor: "#689F38",
              fill: true
            },
            { 
              label: "Departures",
              data: inHours,//temp_min,
              borderColor: "#00838F",
              fill: false
            },
          ]
        },
        options: {
          title:{
            text:'Entries and Departures Chart',
            display: true,
            fontSize: 50
          },
          legend: {
            display: true,
            labels: {
              
            }
          },
          scales: {
            xAxes: [{
              scaleLabel:{
                labelString: 'Hours',
                display: true,
                fontSize: 40
              },
              display: true
            }],
            yAxes: [{
              scaleLabel:{
                labelString: 'Quantity',
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
