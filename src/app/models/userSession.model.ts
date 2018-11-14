export interface IUserSession {
  type?:
    | 'administrator'
    | 'buyer'
    | 'seller'
    | 'adviser'
    | 'management'
    | 'maker'
    | 'office'
    | 'preBuyer';
  name?: string;
  id?: string;
  password?: string;
  email?: string;
  token?: string;
}
