import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { MosquittoWebSocketService } from '../services/mosquitto-web-socket.service';
import { Paho } from 'ng2-mqtt';
import * as SVG from 'svg.js';
import { SvgBase } from '../classes/svg-base';
import { HttpErrorResponse } from '@angular/common/http';
import { StreetserviceService } from '../streetservice.service';

export interface Foo {
  bar: string;
}
@Component({
  selector: 'app-map-list',
  templateUrl: './map-list.component.html',
  styleUrls: ['./map-list.component.css'],
})
export class MapListComponent implements OnInit {
  constructor(private mqtt: MosquittoWebSocketService, private _streets: StreetserviceService) {
    
  }
  public streets=[]
  public houses=[]
  public houseOptions=[]
  public streetOptions=[]
  
  public colID=0
  public colOptions=[]
  public actualCol="San Mateo";

  public doorValue = 0;

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
    this._streets.getStreets()
    .subscribe(res => {
      for(let i=0; i<res.length; i++){
        console.log("Res", res)
        this.colOptions.push(res[i].name)
      }
    });

    console.log("Colony",this.colOptions);

    let draw = SVG('drawing').size(1400, 700);  
    let svg = new SvgBase();
    
    svg.drawRect(1200,700,50,40,this.grassColor, draw);

    //Entrance

    let entrance = svg.drawRect(50,150,0,290,this.borderColor, draw)

    //Houses 2.0 
    let housePos=0;
    var i=0;

    //Left
    for(var i=0; i<10;i++){
      this.houses[i]=svg.drawRect(100, 150, (50+housePos), 40, this.houseColor, draw)
      housePos+=122.5;
      this.houseOptions[i]=i
    }

    //Right
    housePos=0;
    for(var i=0; i<10;i++){
      this.houses[10+i]=svg.drawRect(100, 150, (50+housePos), 550, this.houseColor, draw)
      housePos+=122.5;this.houseOptions[10+i]=10+i
    }

    //Street
    let posStreet=0;
    for(i=0; i<4;i++){
      this.streets[i]=svg.drawRect(300, 150,(50+posStreet),290, this.streetColor, draw)
      posStreet+=300;
      this.streetOptions[i]=i
    }
    
    //Lines

    //let border = svg.drawLine(300, 770, 300, 55, 6, this.borderColor, draw)
      
    const borders = [ 
      //Area Borders
      [50,40,1250,40], [50,40,50,770], [50,697,1250,697],[1250,40,1250,770],
      //Street
      [50, 290, 1250, 290],[50, 440, 1250, 440],
      //Front Grass Lines
      [50, 190, 1250, 190],[50, 550, 1250, 550],
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
    //this.mqtt.door = JSON.stringify({colId: this.doorValue})
    this.mqtt.message=JSON.stringify({ house: { id: this.selectedHouse, magnetico: this.magneticValue, pir: this.pirValue } }); //street: { id: this.selectedStreet, pir: this.pirValue } });   
    try{
      this.mqtt.connect();
      this.Subscribe();
      console.log("nice")
    }
    catch(e){
      console.log("Error: "+e)
    }
  }
  Subscribe(){
    this.mqtt.client.onMessageArrived = (message: Paho.MQTT.Message) => {
      console.log("Hey")
      console.log(message.payloadString);
      let response = JSON.parse(message.payloadString);
      console.log(response)
      if(this.actualCol=="San Mateo"){
        if(response.house.pir){
          this.streets[response.house.id].animate().attr({ fill: this.danger })
        }
        else{
          this.streets[response.house.id].animate().attr({ fill: this.streetColor })
        }
        if(response.house.magnetico){
          this.houses[response.house.id].animate().attr({ fill : this.magneticColor })
        }
        else{
          this.houses[response.house.id].animate().attr({ fill : this.houseColor })
        }
      }
      else{
        this.otherColony()
      }
    }
  }
  otherColony(){
    for(var i=0; i<10;i++){
      this.houses[i].animate().attr({ fill : this.houseColor })
      this.streets[i].animate().attr({ fill: this.streetColor })
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