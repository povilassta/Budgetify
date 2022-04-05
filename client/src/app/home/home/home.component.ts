import { Component, OnInit } from '@angular/core';
import { throwStatement } from '@babel/types';
import { Account } from '../../models/account.model';
import { AccountService } from './account-card/services/accounts.service';
import { TransactionService } from './transaction-card/services/transaction.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  public accounts!: Account[];
  public transactions!: Transaction[];
  public value: string = '';

  public trackBy(index: number, item: Account | Transaction): string {
    return item._id;
  }

  constructor(
    private accountsService: AccountService,
    public transactionService: TransactionService
  ) {}

  public ngOnInit(): void {
    this.accountsService.getAccounts().subscribe({
      next: (data) => (this.accounts = data),
      complete: () => {
        this.transactionService
          .getTransactions(this.accounts[0]._id)
          .subscribe();
      },
    });
  }
}
