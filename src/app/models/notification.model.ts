export interface INotification {
  timestamp?: Date;
  title?: string;
  // debe de ir quien lo envio y que hizo
  message?: string;
  // el que lo envia
  senderId?: string;
  // el/los que recibe
  receiversId?: string[];
  // los involucrados
  tags?: Array<
    | 'administrator'
    | 'buyer'
    | 'seller'
    | 'adviser'
    | 'management'
    | 'maker'
    | 'office'
  >;

  // quien ya lo vio
  readBy?: [{ readerId?: string; readAt?: Date }];
  // color
  status?: 'verde' | 'gris' | 'amarillo' | 'rojo' | 'azul';
  // icono
  type?: string;
  _id?: string;
}
