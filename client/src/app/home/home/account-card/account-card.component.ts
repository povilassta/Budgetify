import { Component, Input, OnInit } from '@angular/core';
import { TransactionService } from '../transaction-card/services/transaction.service';
import { Account } from '../../../models/account.model';
import { AccountService } from './services/accounts.service';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.sass'],
})
export class AccountCardComponent implements OnInit {
  @Input() public account!: Account;

  public onCardClick(): void {
    this.accountService.activateAccount(this.account._id);
    this.transactionService.getTransactions(this.account._id).subscribe();
  }

  constructor(
    public accountService: AccountService,
    public transactionService: TransactionService
  ) {}

  public ngOnInit(): void {
    const firstAccount = this.accountService.accounts[0];
    this.accountService.activateAccount(firstAccount._id);
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
