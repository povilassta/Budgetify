import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Transaction } from '../transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  public transactions!: Transaction[];

  constructor(private http: HttpClient) {}

  public getTransactions(accountId: string): Observable<any> {
    return this.http
      .get(`http://localhost:3000/accounts/${accountId}/transactions`)
      .pipe(tap({ next: (res: any) => (this.transactions = res) }));
  }
}
