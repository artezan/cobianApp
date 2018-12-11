import {
  Component,
  OnInit,
  EventEmitter,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  BuyersFilters,
  PropertyFilter,
  OnlyDates,
  AdvFilter,
} from '../../../_config/_helpers';
import { BuyerService } from '../../../services/buyer.service';
import { IBuyer } from '../../../models/buyer.model';
import { PropertyService } from '../../../services/property.service';
import { IProperty } from '../../../models/property.model';
import { MakerService } from '../../../services/maker.service';
import { IMaker } from '../../../models/maker.model';
import { map } from 'rxjs/internal/operators/map';
import { AdviserService } from '../../../services/adviser.service';
import { IAdviser } from '../../../models/adviser.model';

export interface SearchDialog {
  header: string;
  body?: string;
  hideButtonCancel?: boolean;
  okButton?: string;
  rows?: any[];
  isMultiple?: boolean;
  typeFilter:
    | 'filter-buyer'
    | 'filter-prop'
    | 'filter-prop2'
    | 'filter-makers'
    | 'filter-adv';
  columns: {
    name: string;
    prop: string;
    type: string;
  }[];
  itemsIdDisable?: string[];
  filtersDetail?: boolean;
  selectedItems?: any[];
}

@Component({
  selector: 'app-search-select',
  templateUrl: './search-select.component.html',
  styleUrls: ['./search-select.component.scss'],
})
export class SearchSelectComponent implements OnInit {
  isLoad = true;
  numOfFilters = 0;
  message: string;
  buttons = new EventEmitter();
  arrSelect = [];
  ratingResult = new EventEmitter();
  statusChange = new EventEmitter();
  statusTicket: string;
  buyers: IBuyer[];
  properties: IProperty[];
  makers: IMaker[];
  advisers: IAdviser[];
  public dataInput: SearchDialog;
  private dataInput2: SearchDialog;
  constructor(
    public dialogRef: MatDialogRef<SearchSelectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SearchDialog,
    private buyerService: BuyerService,
    private propService: PropertyService,
    private makersService: MakerService,
    private advService: AdviserService,
  ) {
    // recibe items
    this.dataInput = data;
    // tipo de items
    if (this.dataInput.typeFilter === 'filter-buyer') {
      // busca todos los items
      buyerService.getBuyerAll().subscribe(b => (this.buyers = b));
    } else if (this.dataInput.typeFilter === 'filter-prop') {
      propService.getAllSpecial().subscribe(prop => (this.properties = prop));
    } else if (this.dataInput.typeFilter === 'filter-prop2') {
      propService.getAll().subscribe(prop => (this.properties = prop));
    } else if (this.dataInput.typeFilter === 'filter-makers') {
      makersService
        .getMakerAll()
        .pipe(
          map(arr =>
            arr.map((maker: any) => {
              if (maker.build) {
                maker.buildName = <any>maker.build.name;
              } else {
                maker.buildName = <any>'';
              }
              return maker;
            }),
          ),
        )
        .subscribe(m => (this.makers = m));
    } else if (this.dataInput.typeFilter === 'filter-adv') {
      advService
        .getAdviserAll()
        .pipe(
          map(arr =>
            arr.map((adviser: any) => {
              adviser.numOfBuyer = `Número de Clientes: ${
                adviser.buyer.length
              }`;
              adviser.range = `Disponible de ${adviser.hourStart} a ${
                adviser.hourEnd
              }`;
              return adviser;
            }),
          ),
        )
        .subscribe(a => (this.advisers = a));
    }
  }
  /*   onNoClick(): void {
    this.dialogRef.close();
  } */
  buttonsResponse(options: boolean) {
    this.buttons.emit({ options: options, arrSelect: this.arrSelect });
  }

  ngOnInit() {}
  // buyers
  async getFilters(filters: {
    day: number;
    month: number;
    year: number;
    status: string;
    property;
  }) {
    if (await this.getBuyerAll()) {
      const buyersFinded = this.dataInput.rows.filter(buyer =>
        BuyersFilters(buyer, filters),
      );
      //  setea buyers
      this.dataInput.rows = buyersFinded;
      // num filters
      let numFilters = 0;
      if (filters.day) {
        numFilters++;
      }
      if (filters.month) {
        numFilters++;
      }
      if (filters.year) {
        numFilters++;
      }
      if (filters.status) {
        numFilters++;
      }
      this.numOfFilters = numFilters;
    }
  }
  getFiltersProp(filters: IProperty) {
    const advFinded = this.properties.filter(prop => {
      const temp = PropertyFilter(filters, prop);
      this.numOfFilters = temp.numOfFilters;
      return temp.isHope;
    });
    //  setea buyers
    this.dataInput.rows = advFinded;
  }
  getFiltersAdv(filters: {
    day: number;
    month: number;
    year: number;
    status: string;
    hourStart: number;
    hourEnd: number;
    city: string;
  }) {
    const advFinded = this.advisers.filter(adv => AdvFilter(adv, filters));
    //  setea buyers
    this.dataInput.rows = advFinded;
    // num filters
    let numFilters = 0;
    if (filters.day) {
      numFilters++;
    }
    if (filters.month) {
      numFilters++;
    }
    if (filters.year) {
      numFilters++;
    }
    if (filters.status) {
      numFilters++;
    }
    if (filters.hourEnd) {
      numFilters++;
    }
    if (filters.hourStart) {
      numFilters++;
    }
    this.numOfFilters = numFilters;
  }
  async getBuyerAll() {
    this.isLoad = false;
    // const buyers = await this.buyerService.getBuyerAll().toPromise();
    this.dataInput.rows = this.buyers;
    this.isLoad = true;
    return await true;
  }
  getPropAll() {
    this.dataInput.rows = this.properties;
  }
  formatDates(dateInput: Date): string {
    const day: string = new Date(dateInput).getDate().toString();
    const month: string = (new Date(dateInput).getMonth() + 1).toString();
    const year: string = new Date(dateInput).getFullYear().toString();
    const date = day + '/' + month + '/' + year;
    return date;
  }
  ionChangeCheckBox(row, isChecked) {
    if (isChecked) {
      this.arrSelect.push(row);
    } else {
      const index = this.arrSelect.findIndex(item => item._id);
      if (index !== -1) {
        console.log(this.arrSelect);
        this.arrSelect.splice(index, 1);
        console.log(this.arrSelect);
      }
    }
  }
  ionChangeRadioButton(row) {
    this.arrSelect[0] = row;
  }
  async search(str: string) {
    if (this.dataInput.typeFilter === 'filter-buyer') {
      this.dataInput.rows = this.buyers;
    } else if (this.dataInput.typeFilter === 'filter-prop') {
      this.dataInput.rows = this.properties;
    } else if (this.dataInput.typeFilter === 'filter-prop2') {
      this.dataInput.rows = this.properties;
    } else if (this.dataInput.typeFilter === 'filter-makers') {
      this.dataInput.rows = this.makers;
    } else if (this.dataInput.typeFilter === 'filter-adv') {
      this.dataInput.rows = this.advisers;
    }
    if (str === undefined) {
    } else {
      const searchString = row => {
        return (
          Object.values(row).filter(
            v =>
              v
                .toString()
                .toLocaleLowerCase()
                .indexOf(str.toLocaleLowerCase()) >= 0,
          ).length > 0
        );
      };
      const filter = this.dataInput.rows.filter(row => searchString(row));
      this.dataInput.rows = filter;
    }
  }
  // _helpers
  isDisable(idInput: string) {
    if (
      this.dataInput.itemsIdDisable &&
      this.dataInput.itemsIdDisable.length > 0
    ) {
      return this.dataInput.itemsIdDisable.some(id => id === idInput);
    } else {
      return false;
    }
  }
}
