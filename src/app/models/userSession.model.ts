export interface IUserSession {
  type?: 'administrator' | 'buyer' | 'seller' | 'adviser' | 'management';
  name?: string;
  id?: string;
  password?: string;
}
