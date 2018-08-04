import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class Api {
  // url: any = 'http://localhost:3000/api'; // DEV
  url: any = 'https://sktgame-service.herokuapp.com/api'; // Master

  constructor(public http: HttpClient) {

  }

  private header() {
    const header = new HttpHeaders();
    return header;
  }

  get(route: string) {
    return this.http.get(this.url + route, { headers: this.header() }).toPromise();
  }

  post(route: string, Body: any) {
    return this.http.post(this.url + route, Body, { headers: this.header() }).toPromise();
  }

  put(route: string, Body: any) {
    return this.http.put(this.url + route, Body, { headers: this.header() }).toPromise();
  }

  delete(route: string) {
    return this.http.delete(this.url + route, { headers: this.header() }).toPromise();
  }

}
