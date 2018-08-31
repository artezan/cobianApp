import { ISchedule } from './schedule.model';
import { IBuyer } from './buyer.model';

export interface IAdviser {
  name: any;
  lastName: string;
  password: any;
  timestamp: Date;
  email: string;
  /**
   *  eventos programados
   */
  schedule: ISchedule[];
  /**
   * hora disponible inicio
   */
  hourStart: number;
  /**
   * hora disponible fin
   */
  hourEnd: number;
  /**
   * Compradores asignados
   */
  buyer: IBuyer[];
  /**
   * Metas
   */
  // goal: IGoal[];
  /**
   * Notificaciones guardadas
   */
  // notification: INotification[];
  /**
   * Si vende o renta
   */
  isRenter: boolean;
  /**
   * ciudad para filtar
   */
  city: string;
}
