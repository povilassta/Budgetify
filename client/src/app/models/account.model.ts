import { Currency } from './currency.model';
import { Transaction } from './transaction.model';

export interface Account {
  _id: string;
  title: string;
  description: string;
  currency: Currency;
  transactions: Transaction[];
}
