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
  day?: number;
  month?: number;
  year?: number;
  goals?: [
    {
      nameGoal: string;
      isComplete: boolean;
    }
  ];
  _id?: string;
  notificationOneSignal?: string[];
  typeOfGoal?:
    | 'goals'
    | 'salesTotal'
    | 'costOfSales'
    | 'rentTotal'
    | 'costOfRent'
    | 'rentSalesTotal'
    | 'rentSalesCost';
  quantitative?: number;
}
