import { IBuild } from './build.model';

export interface IMaker {
  name?: string;
  lastName?: string;
  email?: string;
  phone?: number;
  timestamp?: Date;
  password?: string;
  /**
   *  Obra
   */
  build?: IBuild;

  /**
   * ciudad para filtar
   */
  city?: string;
  _id?: string;
}
