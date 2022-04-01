import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post('http://localhost:3000/login', { email, password })
      .pipe(tap((res) => this.setSession(res)));
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  logout() {
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('token');
  }

  getExpiration() {
    const expiration = localStorage.getItem('expiresAt');
    const expiresAt = JSON.parse(localStorage.getItem('expiresAt') || '{}');
    return moment(expiresAt);
  }

  private setSession(res: any) {
    const expiresAt = moment().add(1, 'h');
    localStorage.setItem('token', res.token);
    localStorage.setItem('expiresAt', JSON.stringify(expiresAt.valueOf()));
    console.log(JSON.stringify(expiresAt.valueOf()));
    console.log(Date.now());
  }
}
