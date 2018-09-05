import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { IProperty } from '../../../models/property.model';

@Component({
  selector: 'app-general-filters',
  templateUrl: './general-filters.component.html',
  styleUrls: ['./general-filters.component.scss'],
})
export class GeneralFiltersComponent implements OnInit {
  @Output()
  filters = new EventEmitter();
  @Output()
  resetAll = new EventEmitter();
  constructor(public menuCtr: MenuController) {}
  isFilterApply = false;
  caseFilter: string;
  hopeProperty: IProperty = {
    minPrice: 0,
    numBathrooms: 0,
    numCars: 0,
    numRooms: 0,
    space: 0,
  };
  rent = false;
  sell = false;
  old = false;
  notOld = false;
  garden = false;
  noGarden = false;
  lowLevel = false;
  noMatterLevel = false;
  elevator = false;
  noElevator = false;
  allServices = false;
  notAllServices = false;
  open = false;
  close = false;

  ngOnInit() {}
  goBack() {
    console.log(this.hopeProperty);
    if (this.isFilterApply) {
      this.isFilterApply = false;
    } else {
      this.menuCtr.close('filters');
    }
  }
  sendFilters() {
    if (this.rent !== this.sell) {
      this.hopeProperty.isRent = this.rent;
    } else {
      this.hopeProperty.isRent = undefined;
    }
    if (this.old !== this.notOld) {
      this.hopeProperty.isOld = this.old;
    } else {
      this.hopeProperty.isOld = undefined;
    }
    if (this.garden !== this.noGarden) {
      this.hopeProperty.hasGarden = this.garden;
    } else {
      this.hopeProperty.hasGarden = undefined;
    }
    if (this.lowLevel !== this.noMatterLevel) {
      this.hopeProperty.isLowLevel = this.lowLevel;
    } else {
      this.hopeProperty.isLowLevel = undefined;
    }
    if (this.elevator !== this.noElevator) {
      this.hopeProperty.hasElevator = this.elevator;
    } else {
      this.hopeProperty.hasElevator = undefined;
    }
    if (this.allServices !== this.notAllServices) {
      this.hopeProperty.allServices = this.allServices;
    } else {
      this.hopeProperty.allServices = undefined;
    }
    if (this.open !== this.close) {
      this.hopeProperty.isClose = this.close;
    } else {
      this.hopeProperty.isClose = undefined;
    }
    console.log(this.hopeProperty);
    this.filters.emit(this.hopeProperty);
  }
  reset() {
    this.rent = false;
    this.sell = false;
    this.old = false;
    this.notOld = false;
    this.garden = false;
    this.noGarden = false;
    this.lowLevel = false;
    this.noMatterLevel = false;
    this.elevator = false;
    this.noElevator = false;
    this.allServices = false;
    this.notAllServices = false;
    this.open = false;
    this.close = false;
    this.hopeProperty = {
      minPrice: 0,
      numBathrooms: 0,
      numCars: 0,
      numRooms: 0,
      space: 0,
    };
    this.resetAll.emit();
  }
}
