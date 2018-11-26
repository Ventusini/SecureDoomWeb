import { Component, OnInit } from '@angular/core';
import * as SVG from 'svg.js';
import { SvgBase } from '../classes/svg-base';

@Component({
  selector: 'app-general-map',
  templateUrl: './general-map.component.html',
  styleUrls: ['./general-map.component.css']
})
export class GeneralMapComponent implements OnInit {

  constructor() {

  }
  public streets=[]
  public houses = []
  public coloni=[]
  public coloniOptions=[]
  public streetOptions=[]

  public borderColor : string = "#424242"
  public houseColor : string = "#F4FF81"
  public grassColor : string = "#558B2F";
  public streetColor : string =  "#9E9E9E";
  public magneticColor : string = "#2979FF";
  public danger : string = "#FF6D00";
  ngOnInit() {
    let draw = SVG('drawing').size(1400, 700);  
    let svg = new SvgBase();
    
    svg.drawRect(1200,700,50,40,this.grassColor, draw);
    let coloniPos=0;

    //Up 
    for(var i=0; i<4;i++){
      this.coloni[i]=svg.drawRect(250, 250, (50+coloniPos),40,this.streetColor, draw)
      svg.mouseOut(this.coloni[i],this.streetColor)
      svg.mouseOver(this.coloni[i],"#76FF03")
      coloniPos+=316.5;
      this.coloniOptions[i]=i
    }
    
    //Down
    coloniPos=0;
    for(var i=0; i<4;i++){
      this.coloni[i]=svg.drawRect(250, 250, (50+coloniPos),450,this.streetColor, draw)
      svg.mouseOut(this.coloni[i],this.streetColor)
      svg.mouseOver(this.coloni[i],"#76FF03")
      coloniPos+=316.5;
      this.coloniOptions[i]=i
    }

    //Houses Up Left
    let housesPos=0
    let coloniHouse=0
    for(var l=0; l<4; l++){
      for(var i=0; i<10;i++){
        svg.drawRect(50, 20, (80+coloniHouse),(40+housesPos),this.houseColor, draw)
        housesPos+=25.5;
        //this.housesOptions[i]=i
      }
      coloniHouse+=316
      housesPos=0
    }
    
    //Houses Up Right
    housesPos=0
    coloniHouse=0
    for(var l=0; l<4; l++){
      for(var i=0; i<10;i++){
        svg.drawRect(50, 20, (220+coloniHouse),(40+housesPos),this.houseColor, draw)
        housesPos+=25.5;
        //this.housesOptions[i]=i
      }
      coloniHouse+=316
      housesPos=0
    }
    
    //Houses Down Left
    housesPos=0
    coloniHouse=0
    for(var l=0; l<4; l++){
      for(var i=0; i<10;i++){
        svg.drawRect(50, 20, (80+coloniHouse),(450+housesPos),this.houseColor, draw)
        housesPos+=25.5;
        //this.housesOptions[i]=i
      }
      coloniHouse+=316
      housesPos=0
    }
    
    //Houses Down Right
    housesPos=0
    coloniHouse=0
    for(var l=0; l<4; l++){
      for(var i=0; i<10;i++){
        svg.drawRect(50, 20, (220+coloniHouse),(450+housesPos),this.houseColor, draw)
        housesPos+=25.5;
        //this.housesOptions[i]=i
      }
      coloniHouse+=316
      housesPos=0
    }
    housesPos=0
    //svg.drawRect(50, 20, 365,(40+housesPos),this.houseColor, draw)
    //Midle street
    for(var i=0; i<4;i++){
      this.coloni[i]=svg.drawRect(1200, 70,50,330,this.streetColor, draw)
      coloniPos+=316.5;
      this.coloniOptions[i]=i
    }
  }

}
