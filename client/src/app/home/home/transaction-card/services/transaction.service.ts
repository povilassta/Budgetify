import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { TransactionPost } from 'src/app/models/transaction-post.model';
import { Transaction } from '../../../../models/transaction.model';
import { AccountService } from '../../account-card/services/accounts.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  public transactions!: Transaction[];
  public isIncomeFilter: boolean = false;
  public isExpenseFilter: boolean = false;
  private BASE_URL: string = `http://localhost:3000/accounts/`;

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {}

  public getTransactions(accountId: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}${accountId}/transactions`).pipe(
      tap({
        next: (res: any) => {
          this.transactions = res;
        },
      })
    );
  }

  public postTransaction(data: TransactionPost): Observable<any> {
    return this.http.post(
      `${this.BASE_URL}${this.accountService.activeAccount._id}/transactions`,
      data
    );
  }

  public deleteTransaction(transactionId: string) {
    return this.http.delete(
      `${this.BASE_URL}${this.accountService.activeAccount._id}/transactions/${transactionId}`
    );
  }

  public updateTransaction(
    transactionId: string,
    data: TransactionPost
  ): Observable<any> {
    return this.http.patch(
      `${this.BASE_URL}${this.accountService.activeAccount._id}/transactions/${transactionId}`,
      data
    );
  }

  private filterHelper(type: string): Transaction[] {
    type === 'income'
      ? (this.isExpenseFilter = false)
      : (this.isIncomeFilter = false);
    if (type === 'income' ? this.isIncomeFilter : this.isExpenseFilter) {
      type === 'income'
        ? (this.isIncomeFilter = false)
        : (this.isExpenseFilter = false);
      return this.transactions;
    } else {
      type === 'income'
        ? (this.isIncomeFilter = true)
        : (this.isExpenseFilter = true);
      return this.transactions.filter((t) => t.type === type);
    }
  }

  public filterTransactions(type?: string): Transaction[] {
    if (!type) {
      this.isIncomeFilter = false;
      this.isExpenseFilter = false;
      return this.transactions;
    } else {
      return this.filterHelper(type);
    }
  }
}
