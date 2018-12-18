export interface IPost {
  timestamp?: Date;
  title?: string;
  content?: string;
  status?: Status;
  tags?: Tag[];
  uids?: string[];
  city?: string[];
  _id?: string;
}

type Status = 'gris' | 'verde' | 'rojo' | 'azul';

type Tag =
  | 'adviser'
  | 'management'
  | 'subManagement'
  | 'administrator'
  | 'office';
