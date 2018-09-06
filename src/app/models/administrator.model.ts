import { ISchedule } from './schedule.model';

export interface IAdministrator {
  timestamp?: string;
  name?: string;
  password?: string;
  schedule?: ISchedule[];
  //   goal?:;
  _id?: string;
}
export interface IAdministratorPOST {
  timestamp?: string;
  name?: string;
  password?: string;
  schedule?: string[];
  //   goal?:;
  _id?: string;
}
