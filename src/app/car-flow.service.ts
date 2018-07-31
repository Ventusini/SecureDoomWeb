import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarFlowService {

  constructor(private _http: HttpClient) { }

  dailyCars() {
    return this._http.get("/api/data/2.5/history/city?q=Warren,OH&appid=b6907d289e10d714a6e88b30761fae22").pipe(
      map(result => result)
    );
  }
  weeklyCars(){

  }
  monthlyCars(){

  }
}
