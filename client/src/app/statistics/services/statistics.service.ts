import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { CategoryService } from 'src/app/home/home/add-transaction/services/category.service';
import { Category } from 'src/app/models/category.model';
import { Statistic } from 'src/app/models/statistic.model';
import { Transaction } from 'src/app/models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor(private categoryService: CategoryService) {}

  public calculateTotalExpense(
    transactions: Transaction[],
    start: Moment,
    end: Moment
  ): number {
    let total = 0;
    for (const transaction of transactions) {
      if (
        transaction.type === 'expense' &&
        moment(transaction.transactionDate).isBetween(start, end)
      ) {
        total += transaction.amount.valueOf();
      }
    }

    return total;
  }
  public calculateCategoryStats(
    categories: Category[],
    transactions: Transaction[],
    start: Moment,
    end: Moment
  ) {
    let statistics: Statistic[] = [];
    const totalAmount = this.calculateTotalExpense(transactions, start, end);
    const expenseCategories = categories.filter((c) => c.type === 'expense');
    for (const category of expenseCategories) {
      const amount = transactions.reduce((acc, item) => {
        if (
          item.categories.some((c) => c._id === category._id) &&
          moment(item.transactionDate).isBetween(start, end)
        ) {
          return acc + item.amount.valueOf();
        } else {
          return acc;
        }
      }, 0);
      if (amount) {
        statistics.push({
          category: category.name,
          amount,
          precentage: Math.round((amount / totalAmount) * 10000) / 100,
        });
      }
    }
    return statistics;
  }
}
