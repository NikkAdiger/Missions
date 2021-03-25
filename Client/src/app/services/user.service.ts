import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL = `${environment.apiUrl}/user`;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  login(username: string, password: string) {
    return this.httpClient.post<User>(`${this.baseURL}/login`, { username, password })
      .pipe(map((res: any) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        let token = '';
        if(res.data.token) {
          token = `Bearer ${res.data.token}`;   
          sessionStorage.setItem('token', token);
        }
        return token;
    }));
  }

  logout() {
      // remove user from local storage and set current user to null
      sessionStorage.removeItem('token');
      this.router.navigate(['/login']);    
  }
}
