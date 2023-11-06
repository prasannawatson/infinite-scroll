import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

const baseUrl = 'http://localhost:3000/';
@Injectable()
export class SearchService {
  constructor(private httpService: HttpClient) {}
  fetchData(urlPath:any): Observable<any>{
    const apiURl = baseUrl + urlPath; 
  // const headers = new HttpHeaders().set('Content-Type', 'application/json');
  //return this.httpService.get(apiURl)
  return this.httpService.get('assets/json/app.json');
  }
}
