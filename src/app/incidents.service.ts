import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class IncidentsService {
  API_URL  =  'http://192.168.43.182:8000';
  constructor(private _http: HttpClient) { }

  incidents() {
    return this._http.get(`${this.API_URL}/getIncidents/`).pipe(
      map(result => result)
    );
  }
}
