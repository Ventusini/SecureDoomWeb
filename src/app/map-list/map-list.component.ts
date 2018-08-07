import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { MosquittoWebSocketService } from '../mosquitto-web-socket.service';
import { Paho } from 'ng2-mqtt';
import * as SVG from 'svg.js';
import { SvgBase } from '../classes/svg-base';
import { HttpErrorResponse } from '../../../node_modules/@angular/common/http';
export interface Foo {
  bar: string;
}

@Component({
  selector: 'app-map-list',
  templateUrl: './map-list.component.html',
  styleUrls: ['./map-list.component.css'],
})
export class MapListComponent implements OnInit {
  constructor(private mqtt: MosquittoWebSocketService) {
  
   }
  
  ngOnInit() {
    let draw = SVG('drawing').size(1920, 1080);  
    let svg = new SvgBase();
    //Declare Rooms
    const borderColor : string = "#424242"
    const houseColor : string = "#F4FF81"
    const grassColor : string = "#558B2F";
    const streetColor : string =  "#9E9E9E";
    const magneticColor : string = "#2979FF";
    const danger : string = "#FF6D00";
    let streets=[];
    let houses=[];
    //Houses
    let housePos=0;
    var i=0;
    //let house1 = svg.drawRect(120, 50, 0, 50, houseColor, draw)
    //let house2 = svg.drawRect(120, 50, 0, 125, houseColor, draw)
    //Left
    for(i=0; i<10;i++){
      houses[i]=svg.drawRect(120, 50,0,(50+housePos), houseColor, draw)
      housePos+=75;
    }
    //Right
    housePos=0;
    for(i=0; i<10;i++){
      houses[10+i]=svg.drawRect(120, 50,300,(50+housePos), houseColor, draw)
      housePos+=75;
    }
    //Grass
    let grassPos=0;
    //Left
    for(i=0; i<9;i++){
      svg.drawRect(120,25,0,(100+grassPos), grassColor, draw)
      grassPos+=75;
    }
    //Right
    grassPos=0;
    for(i=0; i<9;i++){
      svg.drawRect(120,25,300,(100+grassPos), grassColor, draw)
      grassPos+=75;
    }
    //let sideGrass1 = svg.drawRect(120,25,0,100, grassColor, draw)
    //let sideGrass2 = svg.drawRect(120,25,0,175, grassColor, draw)
    let frontGrassLeft = svg.drawRect(40, 725,120,50, grassColor, draw)
    let frontGrassRight = svg.drawRect(40, 725,260,50, grassColor, draw)
    //Street
    let posStreet=0;
    for(i=0; i<4;i++){
      streets[i]=svg.drawRect(100, 181.25,160,(50+posStreet), streetColor, draw)
      posStreet+=181.25;
    }

    //let street = svg.drawRect(100, 725,160,50, streetColor, draw)
    
    //Lines

    //let border = svg.drawLine(300, 770, 300, 55, 6, borderColor, draw)

    const borders = [ 
      //Area Borders
      [0,50,418,50], [0,54,0,774], [418,54,418,774],[0,776,418,776],
      //Street
      [160, 770, 160, 55],[260, 770, 260, 55],
      //Front Grass Lines
      [120, 770, 120, 55],[300, 770, 300, 55],      
    ];
    // Draw border lines
    for(var i  = 0; i < borders.length; i++){
      svg.drawLine(borders[i][0], borders[i][1], borders[i][2], borders[i][3], 6, borderColor, draw)
    }

    //houses[10].animate().attr({ fill: danger })
    this.mqtt.connect("s");
    //this.mqtt.send_message("Hola");
    this.mqtt.client.onMessageArrived = (message: Paho.MQTT.Message) => {
      let response = JSON.parse(message.payloadString);
      console.log(response)
      if(response.house.pir){
        streets[response.house.id].animate().attr({ fill: danger })
      }
      else{
        streets[response.house.id].animate().attr({ fill: streetColor })
      }
      if(response.house.magnetico){
        houses[response.house.id].animate().attr({ fill : magneticColor })
      }
      else{
        houses[response.house.id].animate().attr({ fill : houseColor })
      }
    }
  }
}
