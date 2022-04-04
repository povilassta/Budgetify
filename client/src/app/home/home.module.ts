import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { AccountCardComponent } from './home/account-card/account-card.component';
import { TransactionCardComponent } from './home/transaction-card/transaction-card.component';
import { FormsModule } from '@angular/forms';
import { SearchFilterPipe } from '../search-filter.pipe';

@NgModule({
  declarations: [
    HomeComponent,
    AccountCardComponent,
    TransactionCardComponent,
    SearchFilterPipe,
  ],
  imports: [CommonModule, SharedModule, FormsModule],
})
export class HomeModule {}
