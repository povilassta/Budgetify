export interface Account {
  _id: string;
  title: string;
  description: string;
  currency: {
    _id: string;
    name: string;
    code: string;
  };
}
