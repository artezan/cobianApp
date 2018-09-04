import { IBuyer } from './buyer.model';
import { IProperty } from './property.model';

export interface IStatusBuyerProperty {
  /**
   * Estado
   * gris: Autoperfilamiento
   * verde: Likes
   * amarillo: oferta, negociación
   * rojo: negociación aceptada
   * azul: post-venta
   */
  status?: 'verde' | 'gris' | 'amarillo' | 'rojo' | 'azul';
  buyer?: IBuyer | string;
  property?: IProperty | string;
  note?: string;
  timestamp?: Date;
  _id?: string;
}
export interface IStatusBuyerPropertyGet {
  /**
   * Estado
   * gris: Autoperfilamiento
   * verde: Likes
   * amarillo: oferta, negociación
   * rojo: negociación aceptada
   * azul: post-venta
   */
  status?: 'verde' | 'gris' | 'amarillo' | 'rojo' | 'azul';
  buyer?: IBuyer;
  property?: IProperty;
  note?: string;
  timestamp?: Date;
  _id?: string;
}
