import { Component, OnInit } from '@angular/core';
import { Account } from './account-card/account.model';
import { AccountService } from './account-card/services/accounts.service';
import { TransactionService } from './transaction-card/services/transaction.service';
import { Transaction } from './transaction-card/transaction.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  public accounts!: Account[];
  public value: string = '';
  public isIncomeFilter: boolean = false;
  public isExpenseFilter: boolean = false;

  public trackBy(index: number, item: Account | Transaction): string {
    return item._id;
  }

  public getTransactions(type?: string): Transaction[] {
    if (!type) {
      return this.transactionService.transactions;
    }
    if (type === 'income') {
      this.isExpenseFilter = false;
      if (this.isIncomeFilter) {
        this.isIncomeFilter = false;
        return this.transactionService.transactions;
      } else {
        this.isIncomeFilter = true;
        return this.transactionService.transactions.filter((t) => {
          return t.type === 'income';
        });
      }
    } else {
      this.isIncomeFilter = false;
      if (this.isExpenseFilter) {
        this.isExpenseFilter = false;
        return this.transactionService.transactions;
      } else {
        this.isExpenseFilter = true;
        return this.transactionService.transactions.filter((t) => {
          return t.type === 'expense';
        });
      }
    }
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
