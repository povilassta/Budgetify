export interface TransactionPost {
  title: string;
  type: string;
  transactionDate: Date;
  amount: Number;
  categories: string[];
  payee: string;
  description: string;
}
