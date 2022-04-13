import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Transaction } from 'src/app/models/transaction.model';
import { CommunicationService } from '../../account-card/services/communication.service';
import { TransactionService } from '../../transaction-card/services/transaction.service';

@Component({
  selector: 'app-transaction-delete-dialog',
  templateUrl: './transaction-delete-dialog.component.html',
  styleUrls: ['./transaction-delete-dialog.component.sass'],
})
export class TransactionDeleteDialogComponent implements OnInit {
  constructor(
    private transactionService: TransactionService,
    @Inject(MAT_DIALOG_DATA) public data: Transaction,
    private router: Router,
    private communicationService: CommunicationService
  ) {}

  ngOnInit(): void {}

  public deleteTransaction(): void {
    this.transactionService
      .deleteTransaction(this.data._id)
      .subscribe((data: any) => {
        this.router
          .navigateByUrl('/RefreshComponent', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/']);
          });
      });
    this.communicationService.callCloseOverlay();
  }
}
