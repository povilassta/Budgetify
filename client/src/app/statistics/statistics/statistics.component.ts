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
import { CategoryStatistic } from 'src/app/models/category-statistic.model';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/home/home/add-transaction/services/category.service';
import { switchMap } from 'rxjs';
import { Chart, registerables } from 'chart.js';

@UntilDestroy()
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.sass'],
})
export class StatisticsComponent implements OnInit {
  public accounts!: Account[];
  public statistics!: CategoryStatistic[];
  public transactions!: Transaction[];
  public categories!: Category[];
  public currency: string = 'EUR'; // initial value gets updated when activeAccount is retrieved
  public amount!: number;
  public range: FormGroup = new FormGroup({
    start: new FormControl(moment().subtract(1, 'months')),
    end: new FormControl(moment()),
  });
  public displayedColumns: string[] = ['category', 'amount', 'precentage'];
  public categoriesChart!: Chart;

  constructor(
    public accountService: AccountService,
    private transactionService: TransactionService,
    public statisticsService: StatisticsService,
    private communicationService: CommunicationService,
    private categoryService: CategoryService
  ) {
    Chart.register(...registerables);
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
    this.updateChart();
  }

  public updateChart(): void {
    this.categoriesChart.data.labels = this.statistics.map((st) => st.category);
    this.categoriesChart.data.datasets.forEach((dataset) => {
      dataset.data = this.statistics.map((st) => st.amount);

      this.categoriesChart.update();
    });
  }

  public createChart(): void {
    this.categoriesChart = new Chart('categoriesChart', {
      type: 'bar',
      data: {
        labels: this.statistics.map((st) => st.category),
        datasets: [
          {
            data: this.statistics.map((st) => st.amount),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: this.currency,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
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
        this.createChart();
      });
  }
}
