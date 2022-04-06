import { Category } from './category.model';

export interface Transaction {
  _id: string;
  title: string;
  type: string;
  transactionDate: Date;
  accountId: string;
  amount: Number;
  category: Category;
}
