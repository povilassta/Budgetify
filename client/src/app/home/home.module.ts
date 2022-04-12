import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { AccountCardComponent } from './home/account-card/account-card.component';
import { TransactionCardComponent } from './home/transaction-card/transaction-card.component';
import { FormsModule } from '@angular/forms';
import { SearchFilterPipe } from '../search-filter.pipe';
import { AddTransactionComponent } from './home/add-transaction/add-transaction.component';
import { TransactionViewComponent } from './home/transaction-view/transaction-view.component';
import { AccountViewComponent } from './home/account-view/account-view.component';
import { AddAccountComponent } from './home/add-account/add-account.component';
import { AccountDeleteDialogComponent } from './home/account-view/account-delete-dialog/account-delete-dialog.component';
import { TransactionDeleteDialogComponent } from './home/transaction-view/transaction-delete-dialog/transaction-delete-dialog.component';

@NgModule({
  declarations: [
    HomeComponent,
    AccountCardComponent,
    TransactionCardComponent,
    AddTransactionComponent,
    TransactionViewComponent,
    AccountViewComponent,
    AddAccountComponent,
    AccountDeleteDialogComponent,
    TransactionDeleteDialogComponent,
  ],
  imports: [CommonModule, SharedModule, FormsModule],
  exports: [AccountCardComponent],
})
export class HomeModule {}
