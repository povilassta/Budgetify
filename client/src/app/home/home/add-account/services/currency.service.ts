import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Currency } from 'src/app/models/currency.model';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  public currencies!: Currency[];

  constructor(private http: HttpClient) {}

  public getCurrencies(): Observable<Currency[]> {
    return this.http.get('http://localhost:3000/currency').pipe(
      tap({
        next: (res: any) => {
          this.currencies = res;
        },
      })
    );
  }
}
