export interface Transaction {
  _id: string;
  title: string;
  type: string;
  transactionDate: Date;
  accountId: string;
  amount: Number;
  category: {
    _id: string;
    name: string;
    type: string;
    userId: string;
  };
}
