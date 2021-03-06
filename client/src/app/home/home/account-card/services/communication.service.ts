import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  private componentMethodCallSource = new Subject<void>();
  private overlayCloseCallSource = new Subject<void>();
  private updateValuesCallSource = new Subject<void>();

  public componentMethodCalled$ = this.componentMethodCallSource.asObservable();
  public overlayCloseCalled$ = this.overlayCloseCallSource.asObservable();
  public updateValuesCalled$ = this.updateValuesCallSource.asObservable();

  public callComponentMethod(): void {
    this.componentMethodCallSource.next();
  }

  public callCloseOverlay(): void {
    this.overlayCloseCallSource.next();
  }

  public callUpdateValues(): void {
    this.updateValuesCallSource.next();
  }

  constructor() {}
}
