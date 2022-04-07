import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Transaction } from '../../../../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  public transactions!: Transaction[];
  public isIncomeFilter: boolean = false;
  public isExpenseFilter: boolean = false;

  constructor(private http: HttpClient) {}

  public getTransactions(accountId: string): Observable<any> {
    return this.http
      .get(`http://localhost:3000/accounts/${accountId}/transactions`)
      .pipe(
        tap({
          next: (res: any) => {
            this.transactions = res;
          },
        })
      );
  }

  public filterTransactions(type?: string): Transaction[] {
    if (!type) {
      this.isIncomeFilter = false;
      this.isExpenseFilter = false;
      return this.transactions;
    } else if (type === 'income') {
      this.isExpenseFilter = false;
      if (this.isIncomeFilter) {
        this.isIncomeFilter = false;
        return this.transactions;
      } else {
        this.isIncomeFilter = true;
        return this.transactions.filter((t) => t.type === 'income');
      }
    } else if (type === 'expense') {
      this.isIncomeFilter = false;
      if (this.isExpenseFilter) {
        this.isExpenseFilter = false;
        return this.transactions;
      } else {
        this.isExpenseFilter = true;
        return this.transactions.filter((t) => t.type === 'expense');
      }
    } else {
      return this.transactions;
    }
  }
}
