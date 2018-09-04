export interface IProperty {
  /**
   * ya sea compra o renta.
   */
  isRent?: boolean;
  timestamp?: Date;
  name?: string;
  /**
   * tipo de propiedad departamento casa
   */
  typeOfProperty?: string;
  /**
   * num de Visitas
   */
  numVisit?: number;
  /**
   * Espacio de vivienda
   */
  space?: number;
  /**
   * Etiquetas
   */
  tag?: string[];
  /**
   * Documentos
   */
  files?: string[];
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
   * % Con buyer
   */
  percentage?: number;
  _id?: string;
}
