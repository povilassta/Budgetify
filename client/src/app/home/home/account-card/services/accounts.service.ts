import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AccountPost } from 'src/app/models/account-post.model';
import { Account } from '../../../../models/account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private BASE_URL: string = 'http://localhost:3000/accounts/';
  public accounts: Account[] = [];
  public activeAccount: Account = this.accounts[0];

  constructor(private http: HttpClient) {}

  public getAccounts(): Observable<Account[]> {
    return this.http.get(this.BASE_URL).pipe(
      tap({
        next: (res: any) => {
          this.accounts = res;
        },
      })
    );
  }

  public postAccount(data: AccountPost): Observable<any> {
    return this.http.post(this.BASE_URL, data);
  }

  public deleteAccount(accountId: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}${accountId}`);
  }

  public activateAccount(id: string): void {
    const account = this.accounts.find((el) => el._id === id);
    this.activeAccount = account!;
  }

  public getActiveAccountCurrency(): string {
    return this.activeAccount.currency.code;
  }

  public calculateBalance(account: Account) {
    let sum = 0;
    for (let transaction of account.transactions) {
      if (transaction.type === 'income') {
        sum += transaction.amount.valueOf();
      } else if (transaction.type === 'expense') {
        sum -= transaction.amount.valueOf();
      }
    }
    return sum;
  }
}
