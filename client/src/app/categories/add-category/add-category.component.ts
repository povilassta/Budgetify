import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CommunicationService } from 'src/app/home/home/account-card/services/communication.service';
import { CategoryService } from 'src/app/home/home/add-transaction/services/category.service';
import { Category } from 'src/app/models/category.model';

@UntilDestroy()
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.sass'],
})
export class AddCategoryComponent implements OnInit {
  public categoryForm: FormGroup = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, this.validateCategoryName()],
      updateOn: 'submit',
    }),
  });
  public isExpense: boolean = true;
  public categories!: Category[];
  constructor(
    private communicationService: CommunicationService,
    private categoryService: CategoryService
  ) {}

  public closeOverlay(): void {
    this.communicationService.callCloseOverlay();
  }

  public updateValues(): void {
    this.communicationService.callUpdateValues();
  }

  public openSnackbar(message: string): void {
    this.communicationService.callOpenSnackbar(message);
  }

  public onSubmit(): void {
    const { name } = this.categoryForm.value;
    const type = this.isExpense ? 'expense' : 'income';
    this.categoryService.insertCategory({ name, type }).subscribe({
      next: () => {
        this.openSnackbar('Category added successfully');
        this.updateValues();
        this.closeOverlay();
      },
      error: (err: any) => {},
    });
  }

  private validateCategoryName(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (
        this.categories?.some((c) => {
          return (
            c.name === control.value &&
            c.type === (this.isExpense ? 'expense' : 'income')
          );
        })
      ) {
        return { alreadyExist: true };
      } else {
        return null;
      }
    };
  }

  ngOnInit(): void {
    this.categoryService
      .getCategories()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res: Category[]) => {
          this.categories = res;
        },
      });
  }
}
