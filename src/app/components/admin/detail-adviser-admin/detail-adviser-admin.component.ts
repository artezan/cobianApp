import { Component, OnInit } from '@angular/core';
import { IAdviser } from '../../../models/adviser.model';
import { ActivatedRoute } from '@angular/router';
import { BuyerService } from '../../../services/buyer.service';
import { UserSessionService } from '../../../services/user-session.service';
import { AdviserService } from '../../../services/adviser.service';
import { FormatHoursFront, GetPercentGoal } from '../../../_config/_helpers';

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
  constructor(
    private route: ActivatedRoute,
    private adviserService: AdviserService,
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

      console.log(this.adviser);
      this.isLoad = true;

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
