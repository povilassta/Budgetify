import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Account } from 'src/app/models/account.model';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  private componentMethodCallSource = new Subject<void>();
  private overlayCloseCallSource = new Subject<void>();
  private updateValuesCallSource = new Subject<void>();
  private openEditTransactionOverlaySource = new Subject<void>();
  private openEditAccountOverlaySource = new Subject<Account>();
  private openSnackbarCallSource = new Subject<string>();

  public componentMethodCalled$ = this.componentMethodCallSource.asObservable();
  public overlayCloseCalled$ = this.overlayCloseCallSource.asObservable();
  public updateValuesCalled$ = this.updateValuesCallSource.asObservable();
  public openEditTransactionOverlay$ =
    this.openEditTransactionOverlaySource.asObservable();
  public openEditAccountOverlay$ =
    this.openEditAccountOverlaySource.asObservable();
  public openSnackbarCalled$ = this.openSnackbarCallSource.asObservable();

  public callOpenSnackbar(message: string): void {
    this.openSnackbarCallSource.next(message);
  }

  public callOpenEditAccountOverlay(account: Account): void {
    this.openEditAccountOverlaySource.next(account);
  }

  public callComponentMethod(): void {
    this.componentMethodCallSource.next();
  }

  public callCloseOverlay(): void {
    this.overlayCloseCallSource.next();
  }

  public callUpdateValues(): void {
    this.updateValuesCallSource.next();
  }

  public callOpenEditTransactionOverlay(): void {
    this.openEditTransactionOverlaySource.next();
  }

  constructor() {}
}
