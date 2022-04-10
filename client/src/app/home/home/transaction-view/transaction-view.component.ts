import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/transaction.model';
import { AccountService } from '../account-card/services/accounts.service';
import { Category } from '../../../models/category.model';
import { CommunicationService } from '../account-card/services/communication.service';

@Component({
  selector: 'app-transaction-view',
  templateUrl: './transaction-view.component.html',
  styleUrls: ['./transaction-view.component.sass'],
})
export class TransactionViewComponent implements OnInit {
  @Input() transaction!: Transaction;

  constructor(
    public accountService: AccountService,
    public communicationService: CommunicationService
  ) {}

  public trackBy(item: Category): string {
    return item._id;
  }

  public callCloseOverlay(): void {
    this.communicationService.callCloseOverlay();
  }

  ngOnInit(): void {}
}
