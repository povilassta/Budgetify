import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommunicationService } from 'src/app/home/home/account-card/services/communication.service';
import { CategoryService } from 'src/app/home/home/add-transaction/services/category.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-category-delete-dialog',
  templateUrl: './category-delete-dialog.component.html',
  styleUrls: ['./category-delete-dialog.component.sass'],
})
export class CategoryDeleteDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Category,
    private communicationService: CommunicationService,
    private categoryService: CategoryService
  ) {}

  private callUpdateValues(): void {
    this.communicationService.callUpdateValues();
  }

  private callOpenSnackbar(message: string): void {
    this.communicationService.callOpenSnackbar(message);
  }

  public deleteCategory(): void {
    this.categoryService.deleteCategory(this.data._id).subscribe({
      next: () => {
        this.callUpdateValues();
        this.callOpenSnackbar('Category deleted successfully');
      },
      error: (err: any) => {
        this.callOpenSnackbar(`Deletion failed: ${err.error.message}`);
      },
    });
  }

  ngOnInit(): void {}
}
