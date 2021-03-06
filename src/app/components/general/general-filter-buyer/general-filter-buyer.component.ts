import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IBuyer } from '../../../models/buyer.model';

@Component({
  selector: 'app-general-filter-buyer',
  templateUrl: './general-filter-buyer.component.html',
  styleUrls: ['./general-filter-buyer.component.scss'],
})
export class GeneralFilterBuyerComponent implements OnInit {
  status: string;
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
  dayInput: number;
  monthInput: number;
  yearInput: number;
  propInput: string;
  @Output()
  filters = new EventEmitter();
  @Output()
  resetAll = new EventEmitter();
  @Output()
  closeMenu = new EventEmitter();
  @Input()
  isDesktop: boolean;
  @Input()
  propertiesName: string[];

  constructor() {}

  ngOnInit() {}
  applyFilters() {
    this.filters.emit({
      day: this.dayInput,
      month: this.monthInput,
      year: this.yearInput,
      status: this.status,
      property: this.propInput,
    });
  }
  reset() {
    this.resetAll.emit();
    this.dayInput = null;
    this.monthInput = null;
    this.yearInput = null;
    this.status = undefined;
    this.propInput = undefined;
  }
  goBack() {
    if (!this.isDesktop) {
      this.closeMenu.emit();
    }
  }
}
