import { IBuyer } from './buyer.model';
import { IProperty } from './property.model';

export interface IOfert {
  /**
   * Comprador
   */
  buyer?: IBuyer;
  /**
   * Propiedad
   */
  property?: IProperty;
  /**
   * aceptadas(rojo), rechazadas (rojo) , negociación (amarillo).
   */
  status?: 'amarillo' | 'rojo' | 'verde';
  timestamp?: string;
  /**
   * Notas extra
   */
  notes?: string;
  ofertPrice?: number;
  /**
   * Documentos
   */
  files?: string[];
  _id?: string;
  isAccept?: boolean;
  notificationOneSignal?: string[];
  apartOfert?: number;
  wayToBuy?: string;
}
