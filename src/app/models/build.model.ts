import { IMaker } from './maker.model';

export interface IBuild {
  name?: string;
  timestamp?: Date;
  /**
   *  conograma
   */
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
      imagesData?: [
        {
          url?: string;
          notes?: string;
          date?: string | Date;
        }
      ];
      _id?: any;
    }
  ];
  /**
   * constructores
   */
  maker?: IMaker[];
  /**
   * notas
   */
  notes?: string;
  /**
   * ciudad para filtar
   */
  city?: string;
  _id?: string;
  notificationOneSignal?: string[];
}
