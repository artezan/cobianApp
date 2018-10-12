import {
  Component,
  OnInit,
  EventEmitter,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BuyersFilters } from '../../../_config/_helpers';
import { BuyerService } from '../../../services/buyer.service';
import { IBuyer } from '../../../models/buyer.model';

export interface SearchDialog {
  header: string;
  body?: string;
  hideButtonCancel?: boolean;
  okButton?: string;
  rows?: any[];
  isMultiple?: boolean;
  typeFilter: 'filter-buyer';
  columns: {
    name: string;
    prop: string;
    type: string;
  }[];
}

@Component({
  selector: 'app-search-select',
  templateUrl: './search-select.component.html',
  styleUrls: ['./search-select.component.scss'],
  encapsulation: ViewEncapsulation.None,
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
  public dataInput: SearchDialog;
  private dataInput2: SearchDialog;
  constructor(
    public dialogRef: MatDialogRef<SearchSelectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SearchDialog,
    private buyerService: BuyerService,
  ) {
    this.dataInput = data;
    if (this.dataInput.typeFilter === 'filter-buyer') {
      buyerService.getBuyerAll().subscribe(b => (this.buyers = b));
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
  async getBuyerAll() {
    this.isLoad = false;
    // const buyers = await this.buyerService.getBuyerAll().toPromise();
    this.dataInput.rows = this.buyers;
    this.isLoad = true;
    return await true;
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
        this.arrSelect.splice(index, 1);
      }
    }
  }
  async search(str: string) {
    if (str === undefined) {
      this.dataInput.rows = this.buyers;
    } else {
      if (this.dataInput.typeFilter === 'filter-buyer') {
        this.dataInput.rows = this.buyers;
        // if (await this.getBuyerAll()) {
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
        // }
      }
    }
  }
}
