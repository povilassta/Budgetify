import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from '../../../models/transaction.model';
import { AccountService } from '../account-card/services/accounts.service';

@Component({
  selector: 'app-transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.sass'],
})
export class TransactionCardComponent implements OnInit {
  @Input() transaction!: Transaction;

  constructor(public accountService: AccountService) {}

  ngOnInit(): void {}
}
