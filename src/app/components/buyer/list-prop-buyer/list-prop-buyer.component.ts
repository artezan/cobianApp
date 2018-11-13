import { Component, OnInit } from '@angular/core';
import { BuyerService } from '../../../services/buyer.service';
import { PropertyService } from '../../../services/property.service';
import { UserSessionService } from '../../../services/user-session.service';
import { CalcPercentage, DiffDays } from '../../../_config/_helpers';
import { IProperty } from '../../../models/property.model';
import { NavigationExtras, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Observable, from } from 'rxjs';
// import { fuseAnimations } from '../../../_config/_animations';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-list-prop-buyer',
  templateUrl: './list-prop-buyer.component.html',
  styleUrls: ['./list-prop-buyer.component.scss'],
  // animations: fuseAnimations,
})
export class ListPropBuyerComponent implements OnInit {
  properties: IProperty[] = [];
  allProperties: Observable<IProperty[]>;
  isLoad = false;
  segment = 'match';
  numOfFilers = 0;
  constructor(
    private buyerService: BuyerService,
    private propertyService: PropertyService,
    private userSessionService: UserSessionService,
    private router: Router,
    public menuCtr: MenuController,
  ) {
    this.getPropertyMatch();
    this.getAllProperty();
  }

  ngOnInit() {}
  getPropertyMatch() {
    const buyer = this.userSessionService.userSession.value;
    this.propertyService.matchSearch(buyer.id).subscribe(val => {
      if (val) {
        console.log(val);
        this.getBuyer(buyer.id);
      }
    });
  }
  getAllProperty() {
    /*  this.allProperties = this.propertyService
      .getAll() */
    this.allProperties = new Observable<IProperty[]>(ob => {
      this.propertyService.getAll().subscribe(data => {
        ob.next(data.filter(p => !p.isBuy));
      });
    });
    this.numOfFilers = 0;
  }
  getBuyer(id) {
    this.buyerService.getBuyerById(id).subscribe(buyer => {
      console.log(buyer);
      const isApart = date => {
        if (date) {
          const days = 15 - DiffDays(date);
          if (days > 0) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      };
      // si apartado  debe de aparecer
      this.properties = CalcPercentage(buyer, buyer.property, 10).filter(
        p => !p.isBuy,
      );
      // si apartado NO debe de aparecer
      /* this.properties = CalcPercentage(buyer, buyer.property, 10).filter(
        p => !p.isBuy && !isApart(p.dateToApart),
      ); */
      this.isLoad = true;
    });
  }
  itemDetail(item: IProperty) {
    const data: NavigationExtras = { queryParams: { id: item._id } };
    this.router.navigate(['buyer-property-detail'], data);
  }
  segmentChanged(event) {
    this.segment = event.detail.value;
  }
  openMenu() {
    this.menuCtr.open('filters');
  }
  getFilters(hopeProperty: IProperty) {
    this.getAllProperty();
    const filters = this.setFilters(hopeProperty);
    // !!! crea obs
    this.allProperties = new Observable<IProperty[]>(ob => {
      ob.next(filters.propRes);
    });
  }
  setFilters(
    hopeProperty: IProperty,
  ): { propRes: IProperty[]; numFilters: number } {
    const propRes: IProperty[] = [];
    let numFilters = 0;
    let num = 0;
    this.allProperties.subscribe(properties => {
      properties.forEach(prop => {
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
      });
      this.numOfFilers = numFilters;
    });
    return { propRes: propRes, numFilters: num };
  }
  // helpers
}
