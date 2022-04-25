import {
  Overlay,
  OverlayPositionBuilder,
  OverlayRef,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CommunicationService } from '../home/home/account-card/services/communication.service';
import { CategoryService } from '../home/home/add-transaction/services/category.service';
import { Category } from '../models/category.model';
import { SearchFilterPipe } from '../search-filter.pipe';
import { AddCategoryComponent } from './add-category/add-category.component';

@UntilDestroy()
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass'],
  providers: [SearchFilterPipe],
})
export class CategoriesComponent implements OnInit {
  public categories!: Category[];
  public value: string = '';
  private overlayRef!: OverlayRef;

  public trackBy(index: number, item: Category): string {
    return item._id;
  }

  constructor(
    public categoryService: CategoryService,
    private overlay: Overlay,
    private positionBuilder: OverlayPositionBuilder,
    private communicationService: CommunicationService,
    private _snackBar: MatSnackBar
  ) {
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

    this.communicationService.openSnackbarCalled$
      .pipe(untilDestroyed(this))
      .subscribe((message: string) => {
        this.openSnackBar(message);
      });
  }

  public openSnackBar(message: string): void {
    this._snackBar.open(message, 'Close', {
      duration: 5000,
      verticalPosition: 'top',
    });
  }

  public closeOverlay(): void {
    if (this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
  }

  public filterCategories(type?: string): void {
    this.categories = this.categoryService.filterCategories(type);
  }

  public createCategoryCreateOverlay(): void {
    this.overlayRef = this.overlay.create({
      height: '100%',
      hasBackdrop: true,
      positionStrategy: this.positionBuilder.global().top().right(),
    });
    const overlayPortal = new ComponentPortal(AddCategoryComponent);
    this.overlayRef.attach(overlayPortal);
    this.overlayRef
      .backdropClick()
      .pipe(untilDestroyed(this))
      .subscribe(() => this.overlayRef.detach());
  }

  public updateValues(): void {
    this.categoryService
      .getCategories()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (data) => (this.categories = data),
      });
  }

  public ngOnInit(): void {
    this.updateValues();
  }
}
