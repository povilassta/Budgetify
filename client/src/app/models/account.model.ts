import { Transaction } from './transaction.model';

export interface Account {
  _id: string;
  title: string;
  description: string;
  currency: {
    _id: string;
    name: string;
    code: string;
  };
  transactions: Transaction[];
}
