import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Account } from 'src/app/models/account.model';
import { Currency } from 'src/app/models/currency.model';
import { AccountService } from '../account-card/services/accounts.service';
import { CommunicationService } from '../account-card/services/communication.service';
import { CurrencyService } from './services/currency.service';

@UntilDestroy()
@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.sass'],
})
export class AddAccountComponent implements OnInit {
  public currencies!: Currency[];
  public account!: Account;
  public title!: string;
  public accountForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    currency: new FormControl(null, [Validators.required]),
    description: new FormControl(''),
  });

  constructor(
    private currencyService: CurrencyService,
    private communicationService: CommunicationService,
    private accountService: AccountService
  ) {}

  public setInitialValues(): void {
    this.accountForm.setValue({
      title: this.account.title,
      currency: this.currencies.find(
        (c) => c._id === this.account.currency._id
      ),
      description: this.account.description,
    });
  }

  public callCloseOverlay(): void {
    this.communicationService.callCloseOverlay();
  }

  public callUpdateValues(): void {
    this.communicationService.callUpdateValues();
  }

  public ngOnInit(): void {
    this.title = this.account ? 'Edit Account' : 'Create an Account';
    this.currencyService
      .getCurrencies()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (data) => {
          this.currencies = data;
          if (this.account) {
            this.setInitialValues();
          }
        },
      });
  }

  public onSubmit(): void {
    const { title, currency, description } = this.accountForm.value;
    if (this.account) {
      this.accountService
        .updateAccount(this.account._id, {
          title,
          currency: currency._id,
          description,
        })
        .subscribe((data: any) => {
          this.callUpdateValues();
          this.callCloseOverlay();
        });
    } else {
      this.accountService
        .postAccount({ title, currency: currency._id, description })
        .subscribe((data: any) => {
          this.callUpdateValues();
          this.callCloseOverlay();
        });
    }
  }
}
