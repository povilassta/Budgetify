import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Currency } from 'src/app/models/currency.model';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  public currencies!: Currency[];
  private BASE_URL: string = 'http://localhost:3000/currency/';

  constructor(private http: HttpClient) {}

  public getCurrencies(): Observable<Currency[]> {
    return this.http.get(this.BASE_URL).pipe(
      tap({
        next: (res: any) => {
          this.currencies = res;
        },
      })
    );
  }
}
