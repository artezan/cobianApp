import { ISchedule } from './schedule.model';
export interface IManager {
  timestamp?: string;
  name?: string;
  lastname?: string;
  email?: string;
  password?: string;
  city?: string;
  schedule?: ISchedule;
  _id?: string;
  phone?: number;
}
