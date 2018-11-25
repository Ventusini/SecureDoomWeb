import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { MosquittoWebSocketService } from '../services/mosquitto-web-socket.service';
import { Paho } from 'ng2-mqtt';
import * as SVG from 'svg.js';
import { SvgBase } from '../classes/svg-base';
import { HttpErrorResponse } from '@angular/common/http';
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
  public streets=[]
  public houses=[]
  public houseOptions=[]
  public streetOptions=[]

  public selectedHouse=0;
  public selectedStreet=0;  
  public magneticValue=0;
  public pirValue=0;
  public pirState : string="Deactivated";
  public magneticState : string="Deactivated";
  //Colors

  public borderColor : string = "#424242"
  public houseColor : string = "#F4FF81"
  public grassColor : string = "#558B2F";
  public streetColor : string =  "#9E9E9E";
  public magneticColor : string = "#2979FF";
  public danger : string = "#FF6D00";
  ngOnInit() {
    let draw = SVG('drawing').size(420, 800);  
    let svg = new SvgBase();
  
    //Houses
    let housePos=0;
    var i=0;
    //Left
    for(i=0; i<10;i++){
      this.houses[i]=svg.drawRect(120, 50,0,(50+housePos), this.houseColor, draw)
      housePos+=75;
      this.houseOptions[i]=i
    }
    //Right
    housePos=0;
    for(i=0; i<10;i++){
      this.houses[10+i]=svg.drawRect(120, 50,300,(50+housePos), this.houseColor, draw)
      housePos+=75;this.houseOptions[10+i]=10+i
    }
    //Grass
    let grassPos=0;
    //Left
    for(i=0; i<9;i++){
      svg.drawRect(120,25,0,(100+grassPos), this.grassColor, draw)
      grassPos+=75;
    }
    //Right
    grassPos=0;
    for(i=0; i<9;i++){
      svg.drawRect(120,25,300,(100+grassPos), this.grassColor, draw)
      grassPos+=75;
    }

    svg.drawRect(40, 725,120,50, this.grassColor, draw) //frontGrassLeft
    svg.drawRect(40, 725,260,50, this.grassColor, draw) //frontGrassRight

    //Street
    let posStreet=0;
    for(i=0; i<4;i++){
      this.streets[i]=svg.drawRect(100, 181.25,160,(50+posStreet), this.streetColor, draw)
      posStreet+=181.25;
      this.streetOptions[i]=i
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
      svg.drawLine(borders[i][0], borders[i][1], borders[i][2], borders[i][3], 6, this.borderColor, draw)
    }
    //this.mqtt.message=JSON.stringify({ house: { id: this.selectedHouse, magnetico:1 }, street: { id: this.selectedStreet, pir: 1 } });   
    this.mqtt.connect();
    this.Subscribe();
    //this.mqtt.disconnect();   
    //this.mqtt.connect();
    
    //this.mqtt.client.send(message)
  }
  ngOnDestroy() {
    if(this.mqtt.client.isConnected()){
      this.mqtt.disconnect();
    }
  }
  connect(){
    //console.log(this.mqtt.client.isConnected())
    if(this.mqtt.client.isConnected()){
      this.mqtt.unsubscribe();
    }
    this.mqtt.message=JSON.stringify({ house: { id: this.selectedHouse, magnetico: this.magneticValue }, street: { id: this.selectedStreet, pir: this.pirValue } });   
    try{
      this.mqtt.connect();
      this.Subscribe();
    }
    catch(e){
      console.log("Error: "+e)
    }

    
    console.log("nice")
  }
  Subscribe(){
    this.mqtt.client.onMessageArrived = (message: Paho.MQTT.Message) => {
      console.log("Hey")
      let response = JSON.parse(message.payloadString);
      console.log(response)
      if(response.street.pir){
        this.streets[response.street.id].animate().attr({ fill: this.danger })
      }
      else{
        this.streets[response.street.id].animate().attr({ fill: this.streetColor })
      }
      if(response.house.magnetico){
        this.houses[response.house.id].animate().attr({ fill : this.magneticColor })
      }
      else{
        this.houses[response.house.id].animate().attr({ fill : this.houseColor })
      }
    }
  }
  magneticInputChange(){
    if(this.magneticValue==1){
      this.magneticValue=0;
      this.magneticState="Deactivated"
    }
    else{
      this.magneticValue=1;
      this.magneticState="Activated"
    }
    console.log(this.magneticValue)
  }
  pirInputChange(){
    if(this.pirValue==1){
      this.pirValue=0;
      this.pirState="Deactivated"
    }
    else{
      this.pirValue=1;
      this.pirState="Activated"
    }
    console.log(this.pirValue)
  }
}