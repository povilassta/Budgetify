import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
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
  public accountForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    currency: new FormControl(null, [Validators.required]),
    description: new FormControl(''),
  });

  constructor(
    private currencyService: CurrencyService,
    private communicationService: CommunicationService,
    private accountService: AccountService,
    private router: Router
  ) {}

  public callCloseOverlay(): void {
    this.communicationService.callCloseOverlay();
  }

  public ngOnInit(): void {
    this.currencyService
      .getCurrencies()
      .pipe(untilDestroyed(this))
      .subscribe({ next: (data) => (this.currencies = data) });
  }

  public onSubmit(): void {
    const { title, currency, description } = this.accountForm.value;
    this.accountService
      .postAccount({ title, currency: currency._id, description })
      .subscribe((data: any) => {
        this.router
          .navigateByUrl('/RefreshComponent', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/']);
          });
        this.callCloseOverlay();
      });
  }
}
