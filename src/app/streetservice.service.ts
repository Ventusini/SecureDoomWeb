import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StreetserviceService {
  API_URL  =  'http://127.0.0.1:8000';
  constructor(private _http: HttpClient) {
      
   }
   getStreets() {
    return this._http.get(`${this.API_URL}/getStreets/`).pipe(
      map(result => result)
    );
  }
}
