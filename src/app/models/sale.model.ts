import { IProperty } from './property.model';
import { IBuyer } from './buyer.model';
import { IAdviser } from './adviser.model';
import { ISeller } from './seller.model';

export interface ISale {
  /**
   * Fecha de la venta
   */
  timestamp?: Date;
  /**
   *  propiedad
   */
  property?: IProperty;
  /**
   * Comprador
   */
  buyer?: IBuyer;
  /**
   *  Asesor
   */
  adviser?: IAdviser;
  /**
   *  vendedor
   */
  seller?: ISeller;
  /**
   * Notas
   */
  note?: string;
  /**
   * admin
   */
  price?: number;
  isRent?: boolean;
  _id?: string;
}
