import {
  Component,
  OnInit,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TableColumsModel } from '../../../models/tableColums.model';

@Component({
  selector: 'app-general-table',
  templateUrl: './general-table.component.html',
  styleUrls: ['./general-table.component.scss'],
})
export class GeneralTableComponent implements OnInit, OnChanges {
  months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;
  @Input()
  isDesktop = true;
  @Input()
  showFilterByStatus = true;
  @Input()
  columns: TableColumsModel[];
  @Input()
  rows: any[];
  @Output()
  editButton = new EventEmitter<Array<any>>();
  @Output()
  deletedButton = new EventEmitter<Array<any>>();
  @Output()
  detailsButton = new EventEmitter<Array<any>>();
  @Output()
  mailButton = new EventEmitter<Array<any>>();
  @Output()
  ratingButton = new EventEmitter<Array<any>>();
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  realData;
  @Input()
  filterByDayInput: number;
  @Input()
  filterByMonthInput: number;
  @Input()
  filterByYearInput: number;
  @Input()
  filterByStateInput: string;

  constructor() {
    // Assign the data to the data source for the table to render
  }

  ngOnInit() {
    // TICKETS.map(item => item.timestamp);
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (changes.columns) {
      if (changes.columns.currentValue) {
        this.displayedColumns = changes.columns.currentValue.map(
          colum => colum.prop,
        );
        console.log(this.displayedColumns);
      }
    }
    if (changes.rows) {
      if (changes.rows.currentValue) {
        console.log(changes.rows.currentValue);
        this.dataSource = new MatTableDataSource(changes.rows.currentValue);
        this.realData = changes.rows.currentValue;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    }
    if (changes.filterByDayInput) {
      if (changes.filterByDayInput.currentValue) {
        this.filterByDay(changes.filterByDayInput.currentValue);
      } else {
        this.filterByDay(null);
      }
    }
    if (changes.filterByMonthInput) {
      if (changes.filterByMonthInput.currentValue) {
        this.filterByMonth(changes.filterByMonthInput.currentValue);
      } else {
        this.filterByMonth(null);
      }
    }
    if (changes.filterByYearInput) {
      if (changes.filterByYearInput.currentValue) {
        this.filterByYear(changes.filterByYearInput.currentValue);
      } else {
        this.filterByYear(null);
      }
    }
    if (changes.filterByStateInput) {
      if (changes.filterByStateInput.currentValue) {
        this.filterByState(changes.filterByStateInput.currentValue);
      } else {
        this.filterByState(null);
      }
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  filterByDay(day: number) {
    if (this.dataSource.data.length === 0) {
      this.dataSource = new MatTableDataSource(this.realData);
    }
    const dayFinded = this.dataSource.data.filter(
      item => new Date(item.timestamp).getDate() === +day,
    );
    this.dataSource = new MatTableDataSource(dayFinded);
    if (!day) {
      this.dataSource = new MatTableDataSource(this.realData);
    }
  }
  filterByYear(year: number) {
    if (this.dataSource.data.length === 0) {
      this.dataSource = new MatTableDataSource(this.realData);
    }
    const dayFinded = this.dataSource.data.filter(
      item => new Date(item.timestamp).getFullYear() === +year,
    );
    this.dataSource = new MatTableDataSource(dayFinded);
    if (!year) {
      this.dataSource = new MatTableDataSource(this.realData);
    }
  }
  filterByMonth(month: number) {
    this.dataSource = new MatTableDataSource(this.realData);
    const dayFinded = this.dataSource.data.filter(
      item => new Date(item.timestamp).getMonth() === +month,
    );
    this.dataSource = new MatTableDataSource(dayFinded);
    if (isNaN(month)) {
      this.dataSource = new MatTableDataSource(this.realData);
    }
  }
  filterByState(status) {
    const data = [];
    console.log(this.dataSource);
    if (!status) {
      this.dataSource = new MatTableDataSource(this.realData);
    } else {
      this.dataSource = new MatTableDataSource(this.realData);
      this.dataSource.data.forEach(item => {
        item.properties.forEach(element => {
          if (element.propertyStatus === status) {
            data.push(item);
          }
        });
      });
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
    }
  }
  formatDates(dateInput: Date): string {
    const day: string = new Date(dateInput).getDate().toString();
    const month: string = (new Date(dateInput).getMonth() + 1).toString();
    const year: string = new Date(dateInput).getFullYear().toString();
    const date = day + '/' + month + '/' + year;
    return date;
  }
  getArray(numberItems: number): number[] {
    return Array(numberItems).fill(1);
  }
  onSelect(item) {
    console.log(item);
  }
  deletedItem(item) {
    this.deletedButton.emit(item);
  }
  mailItem(item) {
    this.mailButton.emit(item);
  }
  ratingItem(item) {
    this.ratingButton.emit(item);
  }
  editItem(item) {
    this.editButton.emit(item);
  }
  detailsItem(item) {
    this.detailsButton.emit(item);
  }
}
