import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/transaction.model';
import { AccountService } from '../account-card/services/accounts.service';
import { Category } from '../../../models/category.model';
import { CommunicationService } from '../account-card/services/communication.service';
import { TransactionDeleteDialogComponent } from './transaction-delete-dialog/transaction-delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-transaction-view',
  templateUrl: './transaction-view.component.html',
  styleUrls: ['./transaction-view.component.sass'],
})
export class TransactionViewComponent implements OnInit {
  @Input() transaction!: Transaction;

  constructor(
    public accountService: AccountService,
    public communicationService: CommunicationService,
    public dialog: MatDialog
  ) {}

  public trackBy(item: Category): string {
    return item._id;
  }

  public callCloseOverlay(): void {
    this.communicationService.callCloseOverlay();
  }

  public openDeleteDialog(): void {
    const dialogRef = this.dialog.open(TransactionDeleteDialogComponent, {
      data: this.transaction,
    });
  }

  ngOnInit(): void {}
}
