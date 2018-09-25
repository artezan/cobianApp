import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserSessionService } from '../../../services/user-session.service';
import { BuyerService } from '../../../services/buyer.service';
import { ISchedule } from '../../../models/schedule.model';
import { ScheduleService } from '../../../services/schedule.service';
import { FormatHoursFront, FormatDatesFront } from '../../../_config/_helpers';
import { IUserSession } from '../../../models/userSession.model';
import { AdviserService } from '../../../services/adviser.service';

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
  user: IUserSession;

  constructor(
    private route: ActivatedRoute,
    private userSessionService: UserSessionService,
    private buyerService: BuyerService,
    private scheduleService: ScheduleService,
    private adviserService: AdviserService,
  ) {
    this.user = this.userSessionService.userSession.value;
    if (this.user.type === 'buyer') {
      this.inti(this.user);
    } else if (this.user.type === 'adviser') {
      this.initAdv(this.user);
    }
  }

  private inti(buyer: IUserSession) {
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
  private initAdv(adv: IUserSession) {
    this.adviserService.getAdviserById(adv.id).subscribe(b => {
      console.log(b);
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
  respondSchedule(str: string, scheduleId: string) {
    const schedule = this.schedule.find(s => s._id === scheduleId);
    if (str === 'Aceptado') {
      schedule.status = 'amarillo';
    } else {
      schedule.status = 'gris';
    }
    schedule.note = str;
    this.scheduleService.putSchedule(schedule).subscribe(res => {
      if (res) {
        this.inti(this.user);
      }
    });
  }
  formatHours(hours, minutes) {
    return FormatHoursFront(hours, minutes);
  }
  formatDates(year, month, day) {
    const date = new Date();
    FormatDatesFront(date);
  }
}
