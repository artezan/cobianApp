import { IBuyer } from './buyer.model';
import { IProperty } from './property.model';
import { IAdviser } from './adviser.model';

export interface ISchedule {
  /**
   * Fecha del Evento
   */
  day: number;
  month: number;
  year: number;
  hour: number;
  minute: number;
  timestamp: Date;
  /**
   * Titulo del evento
   */
  title: string;
  /**
   * Direccion
   */
  address: string;
  /**
   *  propiedad
   */
  property: IProperty;
  /**
   * Comprador
   */
  buyer: IBuyer;
  /**
   *  Asesor
   */
  adviser: IAdviser;
  /**
   *  Asesor
   */
  // seller: ISeller;
  /**
   * Estado
   */
  status: string;
  /**
   * Notas
   */
  note: string;
}
