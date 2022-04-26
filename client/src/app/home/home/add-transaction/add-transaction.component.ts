import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Category } from 'src/app/models/category.model';
import { Transaction } from 'src/app/models/transaction.model';
import { CommunicationService } from '../account-card/services/communication.service';
import { TransactionService } from '../transaction-card/services/transaction.service';
import { CategoryService } from './services/category.service';

@UntilDestroy()
@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.sass'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class AddTransactionComponent implements OnInit {
  public transactionForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    categories: new FormControl(null, [Validators.required]),
    amount: new FormControl(null, [Validators.required, Validators.min(0.01)]),
    transactionDate: new FormControl(
      new Date().toISOString().substring(0, 10),
      [Validators.required]
    ),
    payee: new FormControl(''),
    description: new FormControl(''),
  });
  public maxDate = new Date();
  public categories!: Category[];
  public isExpense: boolean = true;
  public transaction!: Transaction;
  public title!: string;

  constructor(
    private categoryService: CategoryService,
    private communicationService: CommunicationService,
    private transactionService: TransactionService
  ) {}

  public ngOnInit(): void {
    this.title = this.transaction ? 'Edit Transaction' : 'Add Transaction';
    this.categoryService
      .getCategories()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (data) => {
          this.categories = data.filter(
            (category) => category.type === 'expense'
          );
          if (this.transaction) {
            this.setInitialValues();
          }
        },
      });
  }

  private setInitialValues(): void {
    this.changeType(this.transaction.type);
    const initialCategories = this.categories.filter((c) =>
      this.transaction.categories.some((cat) => cat._id === c._id)
    );
    this.transactionForm.setValue({
      title: this.transaction?.title,
      categories: initialCategories,
      amount: this.transaction?.amount,
      transactionDate: new Date(
        this.transaction?.transactionDate ||
          new Date().toISOString().substring(0, 10)
      ).toISOString(),
      payee: this.transaction?.payee,
      description: this.transaction?.description,
    });
    this.isExpense = this.transaction?.type === 'expense' ? true : false;
  }

  public trackBy(item: Category): string {
    return item._id;
  }

  public closeOverlay(): void {
    this.communicationService.callCloseOverlay();
  }

  public updateValues(): void {
    this.communicationService.callUpdateValues();
  }

  public changeType(type: string): void {
    if (type === 'expense') {
      this.isExpense = true;
      this.categories = this.categoryService.categories.filter(
        (category) => category.type === 'expense'
      );
    } else {
      this.isExpense = false;
      this.categories = this.categoryService.categories.filter(
        (category) => category.type === 'income'
      );
    }
  }

  public onSubmit(): void {
    const { title, amount, categories, transactionDate, payee, description } =
      this.transactionForm.value;
    const categoryIds = categories.map((c: Category) => c._id);
    const type = this.isExpense ? 'expense' : 'income';
    if (this.transaction) {
      this.transactionService
        .updateTransaction(this.transaction._id, {
          title,
          amount,
          categories: categoryIds,
          transactionDate,
          payee,
          description,
          type,
        })
        .subscribe(() => {
          this.communicationService.callOpenSnackbar(
            'Transaction updated successfully'
          );
          this.updateValues();
          this.closeOverlay();
        });
    } else {
      this.transactionService
        .postTransaction({
          title,
          amount,
          categories: categoryIds,
          transactionDate,
          payee,
          description,
          type,
        })
        .subscribe(() => {
          this.communicationService.callOpenSnackbar(
            'Transaction added successfully'
          );
          this.updateValues();
          this.closeOverlay();
        });
    }
  }
}
