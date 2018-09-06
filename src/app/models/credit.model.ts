import { IBuyer } from './buyer.model';
import { IProperty } from './property.model';

export interface ICredit {
  /**
   * Comprador
   */
  buyer?: string;
  /**
   * Propiedad
   */
  property?: string;
  /**
   * status Gris Verde Amarillo Rojo
   */
  status?: 'verde' | 'gris' | 'amarillo' | 'rojo' | 'azul';
  timestamp?: Date;
  /**
   * Documentos para el credito
   */
  files?: string[];
  /**
   * Notas
   */
  notes?: string;
  _id?: string;
}
export interface ICreditGet {
  /**
   * Comprador
   */
  buyer?: IBuyer;
  /**
   * Propiedad
   */
  property?: IProperty;
  /**
   * status Gris Verde Amarillo Rojo
   */
  status?: 'verde' | 'gris' | 'amarillo' | 'rojo' | 'azul';
  timestamp?: Date;
  /**
   * Documentos para el credito
   */
  files?: string[];
  /**
   * Notas
   */
  notes?: string;
  _id?: string;
}
