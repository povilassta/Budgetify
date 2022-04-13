import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import * as moment from 'moment';
import { LoginType } from '../interfaces/logintype.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BASE_URL: string = 'http://localhost:3000/login/';
  constructor(private http: HttpClient) {}

  public login(email: string, password: string): Observable<any> {
    return this.http
      .post<LoginType>(this.BASE_URL, { email, password })
      .pipe(tap((res: LoginType) => this.setSession(res)));
  }

  public isLoggedIn(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  public logout(): void {
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('token');
    localStorage.removeItem('name');
  }

  private getExpiration(): moment.Moment {
    const expiration = localStorage.getItem('expiresAt');
    const expiresAt = JSON.parse(localStorage.getItem('expiresAt') || '{}');
    return moment(expiresAt);
  }

  private setSession(res: LoginType): void {
    const expiresAt = moment().add(1, 'h');
    localStorage.setItem('token', res.token);
    localStorage.setItem('expiresAt', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('name', res.name);
  }
}
