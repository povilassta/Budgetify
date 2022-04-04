import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Transaction } from './transaction.model';

@Component({
  selector: 'app-transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.sass'],
})
export class TransactionCardComponent implements OnInit {
  @Input() transaction!: Transaction;

  constructor() {}

  public formatDate(date: Date) {
    return moment(date).format('DD.MM.YYYY');
  }

  ngOnInit(): void {}
}
