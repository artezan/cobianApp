import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-filter-seller',
  templateUrl: './filter-seller.component.html',
  styleUrls: ['./filter-seller.component.scss'],
})
export class FilterSellerComponent implements OnInit {
  isRenter: boolean;
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
  @Output()
  filters = new EventEmitter();
  @Output()
  resetAll = new EventEmitter();
  @Output()
  closeMenu = new EventEmitter();
  @Input()
  isDesktop: boolean;

  constructor() {}

  ngOnInit() {}
  applyFilters() {
    this.filters.emit({
      day: this.dayInput,
      month: this.monthInput,
      year: this.yearInput,
      isRenter: this.isRenter,
    });
  }
  reset() {
    this.resetAll.emit();
    this.dayInput = null;
    this.monthInput = null;
    this.yearInput = null;
    this.isRenter = undefined;
  }
  goBack() {
    if (!this.isDesktop) {
      this.closeMenu.emit();
    }
  }
}
