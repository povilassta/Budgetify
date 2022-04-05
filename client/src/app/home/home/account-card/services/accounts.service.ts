import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Account } from '../../../../models/account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  public accounts: Account[] = [];
  public activeAccount: Account = this.accounts[0];

  constructor(private http: HttpClient) {}

  public getAccounts(): Observable<Account[]> {
    return this.http.get('http://localhost:3000/accounts').pipe(
      tap({
        next: (res: any) => {
          this.accounts = res;
        },
      })
    );
  }

  public activateAccount(id: string): void {
    const account = this.accounts.find((el) => el._id === id);
    this.activeAccount = account!;
  }
}
