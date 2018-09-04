import { ISchedule } from './schedule.model';
import { IAdviser } from './adviser.model';
import { IProperty } from './property.model';
import { IStatusBuyerProperty } from './statusBuyerProperty.model';
import { ICredit } from './credit.model';

export interface IBuyer {
  name?: string;
  fatherLastName?: string;
  motherLastName?: string;
  password?: any;
  timestamp?: Date;
  email?: string;
  phone?: number;
  /**
   * Edad
   */
  years?: number;
  /**
   * Sexo
   */
  isMale?: boolean;
  /**
   * Número de miembros de familia
   */
  numOfFamily?: number;
  /**
   * estado civil
   */
  isSingle?: boolean;
  /**
   * Tipos de Vivienda casa, departamento, terreno,
   * nave industrial, etc., con la posibilidad de agregar alguna opción que no aparezca dentro del listado.
   */
  typeOfProperty?: string;
  /**
   * Espacio de vivienda
   */
  space?: number;
  /**
   * Etiquetas
   */
  tag?: string[];
  /**
   *  eventos programados
   */
  schedule?: ISchedule[];
  /**
   * Creditos
   */
  credit?: ICredit[];
  /**
   * Documentos
   */
  files?: string[];
  /**
   * Lista de sugerencias
   */
  property?: IProperty[];
  /**
   * Asesores
   */
  adviser?: IAdviser[];
  /**
   * Notificaciones guardadas
   */
  // notification?: INotification[];
  /**
   * es Renta?
   */
  isRenter?: boolean;
  /**
   * Fecha posible
   */
  dateToBuy?: string;
  /**
   * Zona de compra/renta
   */
  zone?: string;
  /**
   * Costo minimo
   */
  minPrice?: number;
  /**
   * Costo maximo
   */
  maxPrice?: number;
  /**
   * num recamaras
   */
  numRooms?: number;
  /**
   * num de lugares para estacionaminto
   */
  numCars?: number;
  /**
   * Nueva o usada
   */
  isOld?: boolean;
  /**
   * un fraccionamiento cerrado
   */
  isClose?: boolean;
  /**
   * numero de banos
   */
  numBathrooms?: number;
  /**
   * jardin
   */
  hasGarden?: boolean;
  /**
   * Si se desea recámara en planta baja
   */
  isLowLevel?: boolean;
  /**
   * Elevador
   */
  hasElevator?: boolean;
  /**
   * todos servicios
   */
  allServices?: boolean;
  /**
   * Forma de compra FOVISSTE, IMSS, contado, PEMEX, Infonavit, aliados, otros
   */
  wayToBuy?: string;
  /**
   * Ofertas
   */
  // ofert?: IOfert[];
  /**
   * Estado buyer/property
   */
  statusBuyerProperty?: any[];
  /**
   * ciudad
   */
  city?: string;
  _id?: string;
}
