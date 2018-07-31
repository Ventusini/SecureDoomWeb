import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 

@Component({
  selector: 'app-map-list',
  templateUrl: './map-list.component.html',
  styleUrls: ['./map-list.component.css']
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
    let map = document.getElementById("mapObject");
    //console.log(map.contentDocument.getElementById("path13950"));
   }
}
