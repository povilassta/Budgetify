import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from '../../../models/transaction.model';

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
