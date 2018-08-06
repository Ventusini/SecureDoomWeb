import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { MosquittoWebSocketService } from '../mosquitto-web-socket.service';
import { Paho } from 'ng2-mqtt';
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

    this.mqtt.connect();
    this.mqtt.client.onMessageArrived = (message: Paho.MQTT.Message) => {
      let response = JSON.parse(message.payloadString);
      console.log(response)
    }

    //var mapObject = document.getElementById("mapObject");
    //var mapInfo = mapObject.contentDocument;
    //var house = mapObject.contentDocument.getElementById("path13950");
    //console.log("Object: "+mapObject);
    //console.log("Info: "+mapInfo);
    //console.log("Element: "+house);
    //let map = document.getElementById("mapObject");
    //console.log(map.contentDocument.getElementById("path13950"));
  }
}
