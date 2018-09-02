import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-general-filters',
  templateUrl: './general-filters.component.html',
  styleUrls: ['./general-filters.component.scss']
})
export class GeneralFiltersComponent implements OnInit {
  constructor(public menuCtr: MenuController) {}
  isFilterApply = false;
  caseFilter: string;

  ngOnInit() {}
  goBack() {
    console.log(this.isFilterApply);
    if (this.isFilterApply) {
      this.isFilterApply = false;
    } else {
      this.menuCtr.close('filters');
    }
  }
}
