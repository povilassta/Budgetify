import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Account } from 'src/app/models/account.model';
import { AccountService } from '../account-card/services/accounts.service';
import { CommunicationService } from '../account-card/services/communication.service';
import { AccountDeleteDialogComponent } from './account-delete-dialog/account-delete-dialog.component';

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.sass'],
})
export class AccountViewComponent implements OnInit {
  @Input() account!: Account;

  constructor(
    public accountService: AccountService,
    private communicationService: CommunicationService,
    public dialog: MatDialog
  ) {}

  public callCloseOverlay(): void {
    this.communicationService.callCloseOverlay();
  }

  public openDeleteDialog(): void {
    const dialogRef = this.dialog.open(AccountDeleteDialogComponent, {
      data: this.account,
    });
  }

  public callEditAccount(): void {
    this.communicationService.callOpenEditAccountOverlay(this.account);
  }

  ngOnInit(): void {}
}
