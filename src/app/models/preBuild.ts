import { IPreBuyer } from './preBuyer';

export interface IPreBuild {
  _id?: string;
  fatherPreBuild?: string;
  name?: any;
  timestamp?: Date;
  preBuyer?: IPreBuyer[];
  timeLine?: [
    {
      dayToStart?: number;
      monthToStart?: number;
      yearToStart?: number;
      dayToEnd?: number;
      monthToEnd?: number;
      yearToEnd?: number;
      notes?: string;
      namePhase?: string;
      isComplete?: boolean;
      imgUrls?: string[];
      _id?: any;
    }
  ];
  /**
   * ciudad para filtar
   */
  city?: string;
  notes?: string;
  notificationOneSignal?: string[];
  imgUrls?: string[];
}
