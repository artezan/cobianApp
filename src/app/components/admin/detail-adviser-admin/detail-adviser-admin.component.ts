import { Component, OnInit } from '@angular/core';
import { IAdviser } from '../../../models/adviser.model';
import { ActivatedRoute } from '@angular/router';
import { BuyerService } from '../../../services/buyer.service';
import { UserSessionService } from '../../../services/user-session.service';
import { AdviserService } from '../../../services/adviser.service';
import { FormatHoursFront, GetPercentGoal } from '../../../_config/_helpers';
import { SaleService } from '../../../services/sale.service';
import { ISale } from '../../../models/sale.model';

@Component({
  selector: 'app-detail-adviser-admin',
  templateUrl: './detail-adviser-admin.component.html',
  styleUrls: ['./detail-adviser-admin.component.scss'],
})
export class DetailAdviserAdminComponent implements OnInit {
  isLoad = false;
  isLiked = false;
  arrPropLikes: string[] = [];
  arrSBP: string[] = [];
  adviser: IAdviser;
  sales: ISale[];
  constructor(
    private route: ActivatedRoute,
    private adviserService: AdviserService,
    private salesService: SaleService,
  ) {
    this.route.queryParams.subscribe(params => {
      console.log(params.id);
      if (params.id) {
        this.getAdviserById(params.id);
      }
    });
  }

  ngOnInit() {}
  getAdviserById(id: string) {
    this.isLoad = false;
    this.adviserService.getAdviserById(id).subscribe(adv => {
      this.adviser = adv;
      this.salesService.getSaleByIdAdv(id).subscribe(sales => {
        console.log(this.adviser);
        this.sales = sales;
        this.isLoad = true;
      });

      if (adv.buyer && adv.buyer.length > 0) {
      }
    });
  }
  getPercentage(goals) {
    return GetPercentGoal(goals);
  }
  formatDates(dateInput: Date): string {
    const day: string = new Date(dateInput).getDate().toString();
    const month: string = (new Date(dateInput).getMonth() + 1).toString();
    const year: string = new Date(dateInput).getFullYear().toString();
    const date = day + '/' + month + '/' + year;
    return date;
  }
  formatHours(hours, minutes) {
    return FormatHoursFront(hours, minutes);
  }
}
