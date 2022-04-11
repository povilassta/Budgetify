import { Component, Input, OnInit } from '@angular/core';
import { Account } from 'src/app/models/account.model';
import { AccountService } from '../account-card/services/accounts.service';
import { CommunicationService } from '../account-card/services/communication.service';

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.sass'],
})
export class AccountViewComponent implements OnInit {
  @Input() account!: Account;

  constructor(
    public accountService: AccountService,
    private communicationService: CommunicationService
  ) {}

  public callCloseOverlay(): void {
    this.communicationService.callCloseOverlay();
  }

  ngOnInit(): void {}
}
