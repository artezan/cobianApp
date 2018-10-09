import { ISchedule } from './schedule.model';
import { IOfert } from './ofert.model';
import { ICredit } from './credit.model';
import { IStatusBuyerProperty } from './statusBuyerProperty.model';

export interface IAdministrator {
  timestamp?: string;
  name?: string;
  password?: string;
  schedule?: ISchedule[];
  email?: string;
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
  email?: string;
}
export interface IEvents {
  data?: {
    oferts?: IOfert;
    credits?: ICredit;
    schedules?: ISchedule;
    sbps?: IStatusBuyerProperty;
  };
  type?: string;
  time?: any;
}
