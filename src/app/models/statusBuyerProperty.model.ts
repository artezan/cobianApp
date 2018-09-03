import { IBuyer } from './buyer.model';
import { IProperty } from './property.model';

export interface IStatusBuyerProperty {
  /**
   * Estado
   * gris: Autoperfilamiento
   * verde: Likes
   * amarilla: oferta, negociación
   * roja: negociación aceptada
   * azul: post-venta
   */
  status?: 'verde' | 'gris' | 'amarilla' | 'roja' | 'azul';
  buyer?: IBuyer | string;
  property?: IProperty | string;
  note?: string;
  timestamp?: Date;
  _id?: string;
}
