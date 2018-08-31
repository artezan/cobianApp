import { IBuyer } from '../models/buyer.model';
import { IProperty } from '../models/property.model';
/**
 *
 * @param buyer comprador
 * @param properties propiedades
 * @param percentage % minimo
 */
export function CalcPercentage(
  buyer: IBuyer,
  properties: IProperty[],
  percentage: number,
) {
  const propertiesMatch: IProperty[] = [];
  properties.forEach(property => {
    let sumTotal = 0;
    let items = 17;
    if (buyer.isRenter === property.isRent) {
      sumTotal++;
    }
    if (
      buyer.typeOfProperty.toLocaleLowerCase().trim() ===
      property.typeOfProperty.toLocaleLowerCase().trim()
    ) {
      sumTotal++;
    }
    if (buyer.space <= property.space) {
      sumTotal++;
    }
    if (buyer.dateToBuy === property.dateToBuy) {
      sumTotal++;
    }
    if (
      buyer.zone.toLocaleLowerCase().trim() ===
      property.zone.toLocaleLowerCase().trim()
    ) {
      sumTotal++;
    }
    if (buyer.minPrice >= property.minPrice) {
      sumTotal++;
    }
    if (buyer.maxPrice >= property.maxPrice) {
      sumTotal++;
    }
    if (buyer.numRooms === property.numRooms) {
      sumTotal++;
    }
    if (buyer.numCars <= property.numCars) {
      sumTotal++;
    }
    if (buyer.isOld === property.isOld) {
      sumTotal++;
    }
    if (buyer.isClose === property.isClose) {
      sumTotal++;
    }
    if (buyer.numBathrooms <= property.numBathrooms) {
      sumTotal++;
    }
    if (buyer.hasGarden === property.hasGarden) {
      sumTotal++;
    }
    if (buyer.isLowLevel === property.isLowLevel) {
      sumTotal++;
    }
    if (buyer.hasElevator === property.hasElevator) {
      sumTotal++;
    }
    if (buyer.allServices === property.allServices) {
      sumTotal++;
    }
    if (
      buyer.wayToBuy.toLocaleLowerCase().trim() ===
      property.wayToBuy.toLocaleLowerCase().trim()
    ) {
      sumTotal++;
    }
    if (buyer.tag.length !== 0 && property.tag.length !== 0) {
      buyer.tag.forEach(tag => {
        items++;
        const isFind = property.tag.find(
          t => t.toLocaleLowerCase().trim() === tag.toLocaleLowerCase().trim(),
        );
        if (isFind) {
          sumTotal++;
        }
      });
    }
    const avr = (sumTotal / items) * 100;
    if (avr >= percentage) {
      // add % avr
      property['percentage'] = avr;
      propertiesMatch.push(property);
    }
  });
  properties.sort((a, b) => {
    return b.percentage - a.percentage;
  });
  return properties;
}
