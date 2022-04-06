import { Component, OnInit } from '@angular/core';
import { Account } from '../../models/account.model';
import { AccountService } from './account-card/services/accounts.service';
import { TransactionService } from './transaction-card/services/transaction.service';
import { Transaction } from '../../models/transaction.model';
import { CommunicationService } from './account-card/services/communication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  public accounts!: Account[];
  public filteredTransactions!: Transaction[];
  public value: string = '';

  public trackBy(index: number, item: Account | Transaction): string {
    return item._id;
  }

  public filterTransactions(type?: string): void {
    this.filteredTransactions =
      this.transactionService.filterTransactions(type);
  }

  constructor(
    private accountsService: AccountService,
    public transactionService: TransactionService,
    private communicationService: CommunicationService
  ) {
    this.communicationService.componentMethodCalled$.subscribe(() => {
      this.filterTransactions();
    });
  }

  public ngOnInit(): void {
    this.accountsService.getAccounts().subscribe({
      next: (data) => (this.accounts = data),
      complete: () => {
        this.transactionService
          .getTransactions(this.accounts[0]._id)
          .subscribe({
            next: (data) => {
              this.filteredTransactions = data;
            },
          });
      },
    });
  }
}
