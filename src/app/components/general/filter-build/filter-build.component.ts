import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-filter-build',
  templateUrl: './filter-build.component.html',
  styleUrls: ['./filter-build.component.scss'],
})
export class FilterBuildComponent implements OnInit {
  isComplete: boolean;
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
  dayInput2: number;
  monthInput2: number;
  yearInput2: number;
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
      day2: this.dayInput2,
      month2: this.monthInput2,
      year2: this.yearInput2,
      isComplete: this.isComplete,
    });
  }
  reset() {
    this.resetAll.emit();
    this.dayInput = null;
    this.monthInput = null;
    this.yearInput = null;
    this.yearInput2 = null;
    this.monthInput2 = null;
    this.dayInput2 = null;
    this.isComplete = undefined;
  }
  goBack() {
    if (!this.isDesktop) {
      this.closeMenu.emit();
    }
  }
}
