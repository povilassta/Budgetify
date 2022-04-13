import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AccountService } from 'src/app/home/home/account-card/services/accounts.service';
import { TransactionService } from 'src/app/home/home/transaction-card/services/transaction.service';
import { Account } from 'src/app/models/account.model';
import { Transaction } from 'src/app/models/transaction.model';
import { StatisticsService } from '../services/statistics.service';
import * as moment from 'moment';
import { CommunicationService } from 'src/app/home/home/account-card/services/communication.service';
import { Statistic } from 'src/app/models/statistic.model';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/home/home/add-transaction/services/category.service';
import { switchMap } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.sass'],
})
export class StatisticsComponent implements OnInit {
  public accounts!: Account[];
  public statistics!: Statistic[];
  public transactions!: Transaction[];
  public categories!: Category[];
  public currency: string = 'EUR'; // initial value gets updated when activeAccount is retrieved
  public amount!: number;
  public range: FormGroup = new FormGroup({
    start: new FormControl(moment().subtract(1, 'months')),
    end: new FormControl(moment()),
  });
  public displayedColumns: string[] = ['category', 'amount', 'precentage'];

  constructor(
    public accountService: AccountService,
    private transactionService: TransactionService,
    public statisticsService: StatisticsService,
    private communicationService: CommunicationService,
    private categoryService: CategoryService
  ) {
    this.communicationService.componentMethodCalled$
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.updateCalcs();
        this.currency = this.accountService.activeAccount.currency.code;
      });
  }

  public trackBy(index: number, item: Account): string {
    return item._id;
  }

  public updateCalcs() {
    this.transactions = this.transactionService.transactions;
    this.amount = this.statisticsService.calculateTotalExpense(
      this.transactions,
      this.range.value.start,
      this.range.value.end
    );
    this.statistics = this.statisticsService.calculateCategoryStats(
      this.categories,
      this.transactions,
      this.range.value.start,
      this.range.value.end
    );
  }

  public ngOnInit(): void {
    this.accountService
      .getAccounts()
      .pipe(
        switchMap((accounts) => {
          this.accounts = accounts;
          return this.transactionService.getTransactions(accounts[0]._id);
        }),
        switchMap((transactions) => {
          this.transactions = transactions;
          return this.categoryService.getCategories();
        })
      )
      .pipe(untilDestroyed(this))
      .subscribe((categories) => {
        this.categories = categories;
        this.amount = this.statisticsService.calculateTotalExpense(
          this.transactions,
          this.range.value.start,
          this.range.value.end
        );
        this.statistics = this.statisticsService.calculateCategoryStats(
          this.categories,
          this.transactions,
          this.range.value.start,
          this.range.value.end
        );
        this.currency = this.accountService.activeAccount.currency.code;
      });
  }
}
