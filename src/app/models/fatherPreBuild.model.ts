import { IPreBuild } from './preBuild';

export interface IFatherPre {
  preBuild?: IPreBuild[];
  name?: string;
  timestamp?: Date;
  city?: string;
  notes?: string;
  _id?: string;
  numOfChild?: number;
}
