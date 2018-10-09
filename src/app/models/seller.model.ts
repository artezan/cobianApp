import { IProperty } from './property.model';

import { ISchedule } from './schedule.model';

export interface ISeller {
  /**
   * Nombre
   */
  name?: string;
  lastName?: string;
  /**
   * Propiedades
   */
  property?: IProperty[];
  /**
   * Calendario
   */
  schedule?: ISchedule[];
  /**
   * Notificaciones guardadas
   */
  // notification?: INotification[];
  password?: string;
  timestamp?: Date;
  /**
   * Vende o Renta
   */
  isRenter?: boolean;
  /**
   * city
   */
  city?: string;
  _id?: string;
  email?: string;
}
