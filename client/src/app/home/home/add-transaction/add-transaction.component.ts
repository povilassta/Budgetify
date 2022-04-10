import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Category } from 'src/app/models/category.model';
import { AccountService } from '../account-card/services/accounts.service';
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
  public categories!: Category[];
  public selectedCategories!: Category[];
  public isExpense: boolean = true;

  constructor(
    private categoryService: CategoryService,
    private communicationService: CommunicationService,
    private accountService: AccountService,
    private transactionService: TransactionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryService
      .getCategories()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (data) =>
          (this.categories = data.filter(
            (category) => category.type === 'expense'
          )),
      });
  }

  public trackBy(item: Category) {
    return item._id;
  }

  public closeOverlay() {
    this.communicationService.callCloseOverlay();
  }

  public changeType(type: string) {
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

  public onSubmit() {
    const { title, amount, categories, transactionDate, payee, description } =
      this.transactionForm.value;
    const categoryIds = categories.map((c: Category) => c._id);
    const type = this.isExpense ? 'expense' : 'income';
    console.log(categoryIds);
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
      .subscribe((data: any) => {
        this.router
          .navigateByUrl('/RefreshComponent', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/']);
          });
      });
  }
}
