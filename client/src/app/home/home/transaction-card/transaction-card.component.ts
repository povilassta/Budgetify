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

  ngOnInit(): void {}
}
