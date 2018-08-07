import { Injectable } from '@angular/core';
import { Paho } from 'ng2-mqtt';
@Injectable({
  providedIn: 'root'
})
export class MosquittoWebSocketService {
  private _client: Paho.MQTT.Client;

  constructor() { }

  public get client(): Paho.MQTT.Client {
    return this._client;
  }
  public connect(type): void {
    this._client = new Paho.MQTT.Client("m12.cloudmqtt.com", 32094, "web_futtzqnc_vn6Udf7NH9Zq");
    if(type=="s"){
      this.client.connect({
        useSSL: true,
        userName: "futtzqnc",
        password: "vn6Udf7NH9Zq",
        onSuccess: this.onConnected.bind(this)
      });
    }
    else{
      this.client.connect({
        useSSL: true,
        userName: "futtzqnc",
        password: "vn6Udf7NH9Zq",
        //onSuccess: this.send_message.bind(this)
      });
    }

    this.client.onConnectionLost = (responseObject: Object) => {
      console.log('Connection lost.');
    };
  }

  public onConnected(): void {
    console.log('Connected to broker.');
    this.client.subscribe('topic2/timedate', () => { })
    //let message = new Paho.MQTT.Message("Hello");
    //message.destinationName = "topic2/timedate";
    //this.client.send(message);
  }
  public send_message(msg): void {
		let message = new Paho.MQTT.Message(msg);
    message.destinationName = "topic2/timedate";
    this.client.send(message);
	}
}
