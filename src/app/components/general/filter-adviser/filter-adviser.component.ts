import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-filter-adviser',
  templateUrl: './filter-adviser.component.html',
  styleUrls: ['./filter-adviser.component.scss'],
})
export class FilterAdviserComponent implements OnInit {
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
  hourStartInput: number;
  hourEndInput: number;
  city: string;
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
      status: this.status,
      hourEnd: this.hourEndInput,
      hourStart: this.hourStartInput,
      city: this.city,
    });
  }
  reset() {
    this.resetAll.emit();
    this.dayInput = null;
    this.monthInput = null;
    this.yearInput = null;
    this.hourEndInput = null;
    this.hourStartInput = null;
    this.status = undefined;
    this.city = undefined;
  }
  goBack() {
    if (!this.isDesktop) {
      this.closeMenu.emit();
    }
  }
}
