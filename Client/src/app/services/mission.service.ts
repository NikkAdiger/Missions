import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { Mission } from '../models/mission';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  baseURL = `${environment.apiUrl}/mission`;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  getAll(): Observable<any> {
    return this.httpClient.get(this.baseURL, this.getToken());
  }

  get(id: string): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/${id}`, this.getToken());
  }

  create(mission: Mission): Observable<any> {
    return this.httpClient.post(this.baseURL, mission, this.getToken());
  }

  update(id: string, mission: Mission): Observable<any> {
    return this.httpClient.put(`${this.baseURL}/${id}`, mission, this.getToken());
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.baseURL}/${id}`, this.getToken());
  }

  deleteAll(): Observable<any> {
    return this.httpClient.delete(this.baseURL, this.getToken());
  }

  searchById(id: string): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/${id}`, this.getToken());
  }

  checkToken() {
    let token = sessionStorage.getItem('token') || '';
    if(!token) this.router.navigate(['/login']);
  }

  getToken() {
    let token = sessionStorage.getItem('token') || '';
    if(token){
      return { headers: new HttpHeaders().set('Authorization', token) };
    } else {
      this.router.navigate(['/login']);
      return;
    }
  }

}
