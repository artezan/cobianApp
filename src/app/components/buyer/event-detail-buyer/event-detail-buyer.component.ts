import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserSessionService } from '../../../services/user-session.service';
import { BuyerService } from '../../../services/buyer.service';
import { ISchedule } from '../../../models/schedule.model';

@Component({
  selector: 'app-event-detail-buyer',
  templateUrl: './event-detail-buyer.component.html',
  styleUrls: ['./event-detail-buyer.component.scss'],
})
export class EventDetailBuyerComponent implements OnInit {
  schedule: ISchedule[];
  scheduleToShow: ISchedule[] = [];
  isAll: boolean;
  isOne: boolean;

  constructor(
    private route: ActivatedRoute,
    private userSessionService: UserSessionService,
    private buyerService: BuyerService,
  ) {
    const buyer = this.userSessionService.userSession.value;
    this.buyerService.getBuyerById(buyer.id).subscribe(b => {
      this.schedule = b.schedule;
      this.route.queryParams.subscribe(params => {
        if (params.year) {
          this.isOne = true;
          this.getByDay(+params.year, +params.month, +params.day);
        } else {
          this.isAll = false;
          this.getActualSchedule();
        }
      });
    });
  }

  ngOnInit() {}
  getByDay(year: number, month: number, day: number) {
    const isFinded = this.schedule.filter(
      s => s.day === day && s.month === month && s.year === year,
    );
    if (isFinded.length > 0) {
      this.scheduleToShow = isFinded;
    }
    this.isAll = false;
  }
  getAllSchedule() {
    if (this.isAll === true) {
      this.scheduleToShow = this.schedule;
    }
  }
  getActualSchedule() {
    if (this.isAll === false) {
      const date = new Date();
      const isFinded = this.schedule.filter(
        s => new Date(s.year, s.month, s.day) >= date,
      );
      this.scheduleToShow = isFinded;
    }
  }
}
