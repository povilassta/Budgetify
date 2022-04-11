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

@NgModule({
  declarations: [
    HomeComponent,
    AccountCardComponent,
    TransactionCardComponent,
    AddTransactionComponent,
    TransactionViewComponent,
    AccountViewComponent,
  ],
  imports: [CommonModule, SharedModule, FormsModule],
})
export class HomeModule {}
