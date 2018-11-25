import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MosquittoWebSocketService } from '../services/mosquitto-web-socket.service';
import { Paho } from 'ng2-mqtt';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {

  constructor(private mqtt: MosquittoWebSocketService) { }

  ngOnInit() {
    //this.mqtt.connect("");
    //this.mqtt.send_message("Hey");
    
  }

}