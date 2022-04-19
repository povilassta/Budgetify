import { Component, OnInit } from '@angular/core';
import { Account } from '../../models/account.model';
import { AccountService } from './account-card/services/accounts.service';
import { TransactionService } from './transaction-card/services/transaction.service';
import { Transaction } from '../../models/transaction.model';
import { CommunicationService } from './account-card/services/communication.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  Overlay,
  OverlayPositionBuilder,
  OverlayRef,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';
import { TransactionViewComponent } from './transaction-view/transaction-view.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { switchMap } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  public isOpen: boolean = false;
  public accounts!: Account[];
  public filteredTransactions!: Transaction[];
  public value: string = '';
  private overlayRef!: OverlayRef;
  private currentTransaction!: Transaction;

  public trackBy(index: number, item: Account | Transaction): string {
    return item._id;
  }

  public filterTransactions(type?: string): void {
    this.filteredTransactions =
      this.transactionService.filterTransactions(type);
  }

  constructor(
    private accountsService: AccountService,
    public transactionService: TransactionService,
    private communicationService: CommunicationService,
    private overlay: Overlay,
    private positionBuilder: OverlayPositionBuilder
  ) {
    this.communicationService.componentMethodCalled$
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.filterTransactions();
      });
    this.communicationService.overlayCloseCalled$
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.closeOverlay();
      });
    this.communicationService.updateValuesCalled$
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.updateValues();
      });
    this.communicationService.openEditTransactionOverlay$
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.overlayRef.detach();
        const componentRef = this.overlayRef.attach(
          new ComponentPortal(AddTransactionComponent)
        );
        componentRef.instance.transaction = this.currentTransaction;
        this.overlayRef
          .backdropClick()
          .pipe(untilDestroyed(this))
          .subscribe(() => this.overlayRef.detach());
      });
    this.communicationService.openEditAccountOverlay$
      .pipe(untilDestroyed(this))
      .subscribe((account) => {
        this.createAccountEditOverlay(account);
      });
  }

  public createTransactionCreateOverlay(): void {
    this.overlayRef = this.overlay.create({
      height: '100%',
      hasBackdrop: true,
      positionStrategy: this.positionBuilder.global().top().right(),
    });
    const overlayPortal = new ComponentPortal(AddTransactionComponent);
    this.overlayRef.attach(overlayPortal);
    this.overlayRef
      .backdropClick()
      .pipe(untilDestroyed(this))
      .subscribe(() => this.overlayRef.detach());
  }

  public createTransactionViewOverlay(transaction: Transaction): void {
    this.currentTransaction = transaction;
    this.overlayRef = this.overlay.create({
      height: '100%',
      hasBackdrop: true,
      positionStrategy: this.positionBuilder.global().top().right(),
    });
    const overlayPortal = new ComponentPortal(TransactionViewComponent);
    const componentRef = this.overlayRef.attach(overlayPortal);
    componentRef.instance.transaction = transaction; // pass transaction data to overlay
    this.overlayRef
      .backdropClick()
      .pipe(untilDestroyed(this))
      .subscribe(() => this.overlayRef.detach());
  }

  public createAccountCreateOverlay(): void {
    this.overlayRef = this.overlay.create({
      height: '100%',
      hasBackdrop: true,
      positionStrategy: this.positionBuilder.global().top().right(),
    });
    const overlayPortal = new ComponentPortal(AddAccountComponent);
    this.overlayRef.attach(overlayPortal);
    this.overlayRef
      .backdropClick()
      .pipe(untilDestroyed(this))
      .subscribe(() => this.overlayRef.detach());
  }

  public closeOverlay(): void {
    if (this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
  }

  public createAccountEditOverlay(account: Account): void {
    this.overlayRef = this.overlay.create({
      height: '100%',
      hasBackdrop: true,
      positionStrategy: this.positionBuilder.global().top().right(),
    });
    const componentRef = this.overlayRef.attach(
      new ComponentPortal(AddAccountComponent)
    );
    componentRef.instance.account = account;
    this.overlayRef
      .backdropClick()
      .pipe(untilDestroyed(this))
      .subscribe(() => this.overlayRef.detach());
  }

  private updateValues(): void {
    this.accountsService
      .getAccounts()
      .pipe(
        switchMap((accounts) => {
          this.accounts = accounts;
          if (
            this.accounts.some(
              (a) => a._id === this.accountsService.activeAccount._id
            )
          ) {
            return this.transactionService.getTransactions(
              this.accountsService.activeAccount._id
            );
          } else {
            this.accountsService.activateAccount(accounts[0]._id);
            return this.transactionService.getTransactions(accounts[0]._id);
          }
        })
      )
      .pipe(untilDestroyed(this))
      .subscribe((transactions) => {
        this.filteredTransactions = transactions;
      });
  }

  public ngOnInit(): void {
    this.accountsService
      .getAccounts()
      .pipe(
        switchMap((accounts) => {
          this.accounts = accounts;
          return this.transactionService.getTransactions(accounts[0]._id);
        })
      )
      .pipe(untilDestroyed(this))
      .subscribe((transactions) => {
        this.filteredTransactions = transactions;
      });
  }
}
