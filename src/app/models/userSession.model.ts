export interface IUserSession {
  type?:
    | 'administrator'
    | 'buyer'
    | 'seller'
    | 'adviser'
    | 'management'
    | 'maker';
  name?: string;
  id?: string;
  password?: string;
}
