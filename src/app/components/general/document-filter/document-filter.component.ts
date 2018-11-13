import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-document-filter',
  templateUrl: './document-filter.component.html',
  styleUrls: ['./document-filter.component.scss']
})
export class DocumentFilterComponent implements OnInit {
  status: string;
  isBuyer;
  isAdviser;
  isSeller;
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
      isBuyer: this.isBuyer,
      isAdviser: this.isAdviser,
      isSeller: this.isSeller,
      status: this.status
    });
  }
  reset() {
    this.resetAll.emit();
    this.isBuyer = undefined;
    this.isAdviser = undefined;
    this.isSeller = undefined;
    this.status = undefined;
  }
  goBack() {
    if (!this.isDesktop) {
      this.closeMenu.emit();
    }
  }
}
