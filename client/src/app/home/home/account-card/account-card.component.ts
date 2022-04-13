import { Component, Input, OnInit } from '@angular/core';
import { TransactionService } from '../transaction-card/services/transaction.service';
import { Account } from '../../../models/account.model';
import { AccountService } from './services/accounts.service';
import { CommunicationService } from './services/communication.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  Overlay,
  OverlayPositionBuilder,
  OverlayRef,
} from '@angular/cdk/overlay';
import { AccountViewComponent } from '../account-view/account-view.component';
import { ComponentPortal } from '@angular/cdk/portal';

@UntilDestroy()
@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.sass'],
})
export class AccountCardComponent implements OnInit {
  @Input() public account!: Account;
  private overlayRef!: OverlayRef;

  public onCardClick(): void {
    this.accountService.activateAccount(this.account._id);
    this.transactionService
      .getTransactions(this.account._id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => this.communicationService.callComponentMethod(), // Update transactions variable in home component
      });
  }

  constructor(
    public accountService: AccountService,
    public transactionService: TransactionService,
    private communicationService: CommunicationService,
    private overlay: Overlay,
    private positionBuilder: OverlayPositionBuilder
  ) {
    this.communicationService.overlayCloseCalled$
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.closeOverlay();
      });
  }

  public ngOnInit(): void {
    const firstAccount = this.accountService.accounts[0];
    this.accountService.activateAccount(firstAccount._id);
  }

  public calculateBalance(account: Account) {
    let sum = 0;
    for (let transaction of account.transactions) {
      if (transaction.type === 'income') {
        sum += transaction.amount.valueOf();
      } else if (transaction.type === 'expense') {
        sum -= transaction.amount.valueOf();
      }
    }
    return sum;
  }

  public createAccountViewOverlay($event: MouseEvent, account: Account): void {
    $event.stopPropagation();
    this.overlayRef = this.overlay.create({
      height: '100%',
      hasBackdrop: true,
      positionStrategy: this.positionBuilder.global().top().right(),
    });
    const overlayPortal = new ComponentPortal(AccountViewComponent);
    const componentRef = this.overlayRef.attach(overlayPortal);
    componentRef.instance.account = account;
    this.overlayRef
      .backdropClick()
      .pipe(untilDestroyed(this))
      .subscribe(() => this.overlayRef.detach());
  }

  public closeOverlay(): void {
    if (this.overlayRef.hasAttached()) this.overlayRef.detach();
  }
}
