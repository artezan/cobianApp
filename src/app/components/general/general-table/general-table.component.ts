import {
  Component,
  OnInit,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  AfterViewInit,
  IterableDiffers,
  DoCheck,
} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { TableColumsModel } from '../../../models/tableColums.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-general-table',
  templateUrl: './general-table.component.html',
  styleUrls: ['./general-table.component.scss'],
})
export class GeneralTableComponent implements OnInit, OnChanges, AfterViewInit {
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
  isIcon = false;
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
  iterableDiffer;

  constructor(private _iterableDiffers: IterableDiffers) {
    // Assign the data to the data source for the table to render
    this.iterableDiffer = this._iterableDiffers.find([]).create(null);
  }

  ngOnInit() {
    // TICKETS.map(item => item.timestamp);
    // this.dataSource.sort = this.sort;
  }
  // ve los cambios en array lenght = 0
  /* ngDoCheck() {
    const changes = this.iterableDiffer.diff(this.rows);
    if (changes) {
      console.log(changes);
      this.dataSource = new MatTableDataSource(changes.collection);
      this.realData = changes.collection;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  } */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.columns) {
      if (changes.columns.currentValue) {
        this.displayedColumns = changes.columns.currentValue.map(
          colum => colum.prop,
        );
      }
    }
    if (changes.rows) {
      if (changes.rows.currentValue) {
        this.dataSource = new MatTableDataSource(changes.rows.currentValue);
        this.realData = changes.rows.currentValue;
        // paginator works !!
        setTimeout(() => (this.dataSource.paginator = this.paginator));
        this.dataSource.sort = this.sort;
        console.log(this.dataSource.data);
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
    this.dataSource = new MatTableDataSource(this.realData);
    const dayFinded = this.dataSource.data.filter(
      item => new Date(item.timestamp).getDate() === +day,
    );
    this.dataSource = new MatTableDataSource(dayFinded);
    if (!day) {
      this.dataSource = new MatTableDataSource(this.realData);
    }
  }
  filterByYear(year: number) {
    this.dataSource = new MatTableDataSource(this.realData);
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
    if (!status) {
      this.dataSource = new MatTableDataSource(this.realData);
    } else {
      this.dataSource = new MatTableDataSource(this.realData);
      const stateFinded = this.dataSource.data.filter(
        item => item.status.toLowerCase() === status.toLowerCase(),
      );
      this.dataSource = new MatTableDataSource(stateFinded);
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
  // sort despues de iniciar
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
