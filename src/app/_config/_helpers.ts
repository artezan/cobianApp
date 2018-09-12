import { IBuyer } from '../models/buyer.model';
import { IProperty } from '../models/property.model';

// filtro prop match
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

// filtro buyers
export function BuyersFilters(
  buyer: IBuyer,
  filtersApply: {
    day: number;
    month: number;
    year: number;
    status: string;
  },
) {
  let isOK = true;
  const buyerDate = new Date(buyer.timestamp);
  // si existe
  if (filtersApply.day !== undefined && filtersApply.day !== null) {
    if (buyerDate.getDate() !== filtersApply.day) {
      isOK = false;
    }
  }
  // si existe
  if (filtersApply.month !== undefined && filtersApply.month !== null) {
    if (buyerDate.getMonth() !== filtersApply.month) {
      isOK = false;
    }
  }
  // si existe
  if (filtersApply.year !== undefined && filtersApply.year !== null) {
    if (buyerDate.getFullYear() !== filtersApply.year) {
      isOK = false;
    }
  }
  // si existe
  if (filtersApply.status !== undefined && filtersApply.status !== null) {
    if (buyer.statusBuyerProperty && buyer.statusBuyerProperty.length > 0) {
      const isFinded = buyer.statusBuyerProperty.findIndex(
        sbp => sbp.status === filtersApply.status,
      );
      if (isFinded === -1) {
        isOK = false;
      }
    } else {
      if (filtersApply.status !== 'gris') {
        isOK = false;
      }
    }
  }
  // end filters
  return isOK;
}

// filtro dates
export function OnlyDates(
  some: any,
  filtersApply: {
    day: number;
    month: number;
    year: number;
  },
) {
  let isOK = true;
  const buyerDate = new Date(some.timestamp);
  // si existe
  if (filtersApply.day !== undefined && filtersApply.day !== null) {
    if (buyerDate.getDate() !== filtersApply.day) {
      isOK = false;
    }
  }
  // si existe
  if (filtersApply.month !== undefined && filtersApply.month !== null) {
    if (buyerDate.getMonth() !== filtersApply.month) {
      isOK = false;
    }
  }
  // si existe
  if (filtersApply.year !== undefined && filtersApply.year !== null) {
    if (buyerDate.getFullYear() !== filtersApply.year) {
      isOK = false;
    }
  }
  // end filters
  return isOK;
}

// filtro dates
export function SellerFilter(
  some: any,
  filtersApply: {
    day: number;
    month: number;
    year: number;
    isRenter: boolean;
  },
) {
  let isOK = true;
  const buyerDate = new Date(some.timestamp);
  // si existe
  if (filtersApply.day !== undefined && filtersApply.day !== null) {
    if (buyerDate.getDate() !== filtersApply.day) {
      isOK = false;
    }
  }
  // si existe
  if (filtersApply.month !== undefined && filtersApply.month !== null) {
    if (buyerDate.getMonth() !== filtersApply.month) {
      isOK = false;
    }
  }
  // si existe
  if (filtersApply.year !== undefined && filtersApply.year !== null) {
    if (buyerDate.getFullYear() !== filtersApply.year) {
      isOK = false;
    }
  }
  // si existe
  if (filtersApply.isRenter !== undefined && filtersApply.isRenter !== null) {
    if (some.isRenter !== filtersApply.isRenter) {
      isOK = false;
    }
  }
  // end filters
  return isOK;
}
export function PropertyFilter(hopeProperty: IProperty, prop: IProperty) {
  const propRes: IProperty[] = [];
  let numFilters = 0;
  let num = 0;
  numFilters = 0;
  let isHope = true;
  // condiciones ve si existe
  if (hopeProperty.wayToBuy) {
    numFilters++;
    // ve si coincide
    if (hopeProperty.wayToBuy !== prop.wayToBuy) {
      isHope = false;
    }
  }
  if (hopeProperty.zone) {
    numFilters++;
    // ve si coincide
    if (hopeProperty.zone !== prop.zone) {
      isHope = false;
    }
  }
  if (hopeProperty.typeOfProperty) {
    numFilters++;
    // ve si coincide
    if (hopeProperty.typeOfProperty !== prop.typeOfProperty) {
      isHope = false;
    }
  }
  // solo ve si coincide
  if (hopeProperty.allServices !== undefined) {
    numFilters++;
    if (hopeProperty.allServices !== prop.allServices) {
      isHope = false;
    }
  }
  if (hopeProperty.hasElevator !== undefined) {
    numFilters++;
    if (hopeProperty.hasElevator !== prop.hasElevator) {
      isHope = false;
    }
  }
  if (hopeProperty.isLowLevel !== undefined) {
    numFilters++;
    if (hopeProperty.isLowLevel !== prop.isLowLevel) {
      isHope = false;
    }
  }
  if (hopeProperty.hasGarden !== undefined) {
    numFilters++;
    if (hopeProperty.hasGarden !== prop.hasGarden) {
      isHope = false;
    }
  }

  if (prop.numBathrooms < hopeProperty.numBathrooms) {
    isHope = false;
  }
  if (hopeProperty.numBathrooms > 0) {
    numFilters++;
  }
  if (hopeProperty.isClose !== undefined) {
    numFilters++;
    if (prop.isClose !== hopeProperty.isClose) {
      isHope = false;
    }
  }
  if (hopeProperty.isOld !== undefined) {
    numFilters++;
    if (prop.isOld !== hopeProperty.isOld) {
      isHope = false;
    }
  }

  if (prop.numCars < hopeProperty.numCars) {
    numFilters++;
    isHope = false;
  }
  if (hopeProperty.numCars > 0) {
    numFilters++;
  }
  if (prop.numRooms < hopeProperty.numRooms) {
    isHope = false;
  }
  if (hopeProperty.numRooms > 0) {
    numFilters++;
  }
  if (prop.space < hopeProperty.space) {
    isHope = false;
  }
  if (hopeProperty.space > 0) {
    numFilters++;
  }
  if (hopeProperty.isRent !== undefined) {
    numFilters++;
    if (prop.isRent !== hopeProperty.isRent) {
      isHope = false;
    }
  }

  if (hopeProperty.maxPrice) {
    numFilters++;
    if (prop.maxPrice > hopeProperty.maxPrice) {
      isHope = false;
    }
  }
  if (hopeProperty.minPrice > prop.minPrice) {
    isHope = false;
  }
  if (hopeProperty.minPrice > 0) {
    numFilters++;
  }
  // end condiciones
  // ve si sigue siendo true
  if (isHope) {
    num = numFilters;
    propRes.push(prop);
  }
  // end for
  console.log(numFilters);
  return { isHope: isHope, numOfFilters: numFilters };
}
export function FormatDatesFront(dateInput: Date): string {
  const day: string = new Date(dateInput).getDate().toString();
  const month: string = (new Date(dateInput).getMonth() + 1).toString();
  const year: string = new Date(dateInput).getFullYear().toString();
  const date = day + '/' + month + '/' + year;
  return date;
}
