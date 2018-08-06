import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { Observable } from 'rxjs';

import {
  IMqttMessage,
  MqttModule,
  IMqttServiceOptions
} from 'ngx-mqtt';
export class AppModule { }

@Component({
  selector: 'app-map-list',
  templateUrl: './map-list.component.html',
  styleUrls: ['./map-list.component.css'],
  template: `
    <h1></h1>
  `
})
export class MapListComponent implements OnInit {
  constructor() {
  
   }


  ngOnInit() {
    
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
export class ExampleComponent implements OnDestroy {
  private subscription: Subscription;
  public message: string;

  constructor(private _mqttService: MqttService) {
    this.subscription = this._mqttService.observe('my/topic').subscribe((message: IMqttMessage) => {
      this.message = message.payload.toString();
    });
  }

  public unsafePublish(topic: string, message: string): void {
    this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}