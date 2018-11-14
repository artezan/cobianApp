import { IPreBuild } from './preBuild';

export interface IPreBuyer {
  _id?: string;
  name?: any;
  lastName?: string;
  password?: any;
  timestamp?: Date;
  email?: string;
  preBuild?: IPreBuild[];
  phone?: number;
}
