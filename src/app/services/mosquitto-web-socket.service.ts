import { Injectable } from '@angular/core';
import { Paho } from 'ng2-mqtt';
@Injectable({
  providedIn: 'root'
})
export class MosquittoWebSocketService {
  private _client: Paho.MQTT.Client;

  constructor() { }
  public message: string
  public get client(): Paho.MQTT.Client {
    return this._client;
  }
  public connect(): void {
    this._client = new Paho.MQTT.Client("m12.cloudmqtt.com", 32094, "web_futtzqnc_vn6Udf7NH9Zq");
    
    this.client.connect({
      useSSL: true,
      userName: "futtzqnc",
      password: "vn6Udf7NH9Zq",
      onSuccess: this.onConnected.bind(this)
    });
    this.client.onConnectionLost = (responseObject: Object) => {
      console.log('Connection lost.');
    };
  }
  public onConnected(): void {  
    console.log('Connected to broker. #subscriber');
    this.client.subscribe('topic2/timedate', () => { })
    if(this.message!=null){
      let message = new Paho.MQTT.Message(this.message);
      message.destinationName = "topic2/timedate";
      this.client.send(message)
      console.log("Send")
    }
  }
  public disconnect(){
    this.client.disconnect();
  }
  public unsubscribe(){
    this.client.unsubscribe("topic2/timedate",{
      onSuccess: this.disconnect.bind(this),
    })
  }
}