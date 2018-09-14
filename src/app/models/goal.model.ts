import { IAdviser } from './adviser.model';

export interface IGoal {
  /**
   * Descripcion de meta
   */
  content?: string;
  /**
   * Asesores
   */
  adviser?: IAdviser[];
  /**
   * Estado de la meta
   */
  status?: 'verde' | 'gris' | 'amarillo' | 'rojo' | 'azul';
  /**
   * Datos Cuantitativos
   */
  dataNumber?: number[];
  /**
   * Cumplido o no
   */
  isComplete?: boolean;
  /**
   * Por Gerencia
   */
  isByManagement?: boolean;
  /**
   * titulo
   */
  title?: string;
  timestamp?: Date;
  dateLimit?: string;
  day?: number;
  month?: number;
  year?: number;
  _id?: string;
  goalNumber?: number;
  currentNumber?: number;
}
