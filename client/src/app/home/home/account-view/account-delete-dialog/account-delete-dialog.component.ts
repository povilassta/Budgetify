import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Account } from 'src/app/models/account.model';
import { AccountService } from '../../account-card/services/accounts.service';
import { CommunicationService } from '../../account-card/services/communication.service';

@UntilDestroy()
@Component({
  selector: 'app-account-delete-dialog',
  templateUrl: './account-delete-dialog.component.html',
  styleUrls: ['./account-delete-dialog.component.sass'],
})
export class AccountDeleteDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Account,
    private accountService: AccountService,
    private communicationService: CommunicationService
  ) {}

  private callUpdateValues(): void {
    this.communicationService.callUpdateValues();
  }

  public callCloseOverlay(): void {
    this.communicationService.callCloseOverlay();
  }

  public deleteAccount(): void {
    this.accountService.deleteAccount(this.data._id).subscribe((data: any) => {
      this.callUpdateValues();
      this.callCloseOverlay();
    });
  }

  ngOnInit(): void {}
}
