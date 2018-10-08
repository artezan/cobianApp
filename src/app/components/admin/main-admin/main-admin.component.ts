import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '../../../_config/_animations';
import { UserSessionService } from '../../../services/user-session.service';
import { AdministratorService } from '../../../services/administrator.service';
import { ISchedule } from '../../../models/schedule.model';
import { OfertService } from '../../../services/ofert.service';
import { CreditService } from '../../../services/credit.service';
import { ScheduleService } from '../../../services/schedule.service';
import { StatusBuyerPropertyService } from '../../../services/status-buyer-property.service';
import { IOfert } from '../../../models/ofert.model';
import { ICredit, ICreditGet } from '../../../models/credit.model';
import {
  IStatusBuyerProperty,
  IStatusBuyerPropertyGet,
} from '../../../models/statusBuyerProperty.model';
import { Platform } from '@ionic/angular';
import { FormatHoursFront, DiffDays } from '../../../_config/_helpers';
import { map, timeInterval } from 'rxjs/operators';

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None,
})
export class MainAdminComponent implements OnInit {
  segment = 'movementsSegment';
  isLoad = false;
  schedule: ISchedule[];
  scheduleToShow: ISchedule[] = [];
  isAll: boolean;
  allData: {
    data: {
      oferts?: IOfert;
      credits?: ICreditGet;
      schedules?: ISchedule;
      sbps?: IStatusBuyerPropertyGet;
    };
    type: string;
    time: any;
  }[] = [];
  allDataBackUp: {
    data: {
      oferts?: IOfert;
      credits?: ICreditGet;
      schedules?: ISchedule;
      sbps?: IStatusBuyerPropertyGet;
    };
    type: string;
    time: any;
  }[] = [];
  isDesktop = false;
  pageNumber = 1;
  titleButton = 'Cargar más';
  matButtonToggleGroup: 'ofert' | 'schedule' | 'credit' | 'sbp' | 'all' = 'all';
  filterTime: 7 | 14 | 30;
  isSpinner = false;

  constructor(
    private userSessionService: UserSessionService,
    private adminService: AdministratorService,
    private ofertService: OfertService,
    private creditService: CreditService,
    private scheduleService: ScheduleService,
    private sbpService: StatusBuyerPropertyService,
    private platform: Platform,
  ) {
    this.isDesktop = platform.is('desktop');
    console.log(this.isDesktop);
    //  schedule de hoy y vincularlo a calendario general
    this.getScheduleToday();

    // historial de movimientos
    // this.getOfert();
    this.getAll(this.pageNumber);
  }

  ngOnInit() {}
  getAll(pageNumber) {
    this.adminService.getAdminEvents(pageNumber).subscribe(allData => {
      if (allData.length > 0) {
        if (pageNumber === 1) {
          this.allData = <any>allData;
          this.allDataBackUp = this.allData;
        } else {
          this.allData = <any>[...this.allData, ...allData];
          this.allDataBackUp = this.allData;
        }
      } else {
        this.titleButton = 'Son todos los Eventos';
      }
      this.isSpinner = false;
      this.isLoad = true;
    });
  }
  loadMore() {
    this.matButtonToggleGroup = 'all';
    this.filterTime = undefined;
    this.isSpinner = true;
    this.allData = this.allDataBackUp;
    this.pageNumber++;
    this.getAll(this.pageNumber);
  }

  // filters
  getFiltersGeneral() {
    this.allData = this.allDataBackUp;
    this.getByType(this.matButtonToggleGroup);
    this.getByTime(this.filterTime);
  }
  getByType(type: 'ofert' | 'schedule' | 'credit' | 'sbp' | 'all') {
    if (type === 'all') {
    } else {
      const filter = this.allData.filter(data => data.type === type);
      this.allData = filter;
    }
  }
  getByTime(time: 7 | 14 | 30) {
    if (time !== undefined) {
      const filterDay = (timeData: Date) => {
        const diff = DiffDays(timeData);
        if (diff <= time) {
          return true;
        } else {
          return false;
        }
      };
      const filter = this.allData.filter(data => filterDay(data.time));
      this.allData = filter;
      // console.log('time', filter);
    }
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
  segmentChanged(segment) {
    this.segment = segment.detail.value;
  }
  getScheduleToday() {
    const adminId = this.userSessionService.userSession.value.id;
    this.scheduleService
      .getSchedule()
      .pipe(
        map(s => s.filter(f => f.administrator && f.administrator === adminId)),
      )
      .subscribe(schedule => {
        this.schedule = schedule;
        const dateToday = new Date();
        this.getByDay(
          dateToday.getFullYear(),
          dateToday.getMonth(),
          dateToday.getDate(),
        );
      });
  }
  getByDay(year: number, month: number, day: number) {
    const isFinded = this.schedule.filter(
      s => s.day === day && s.month === month && s.year === year,
    );
    this.scheduleToShow = isFinded;
  }
  getAllSchedule() {
    if (this.isAll === true) {
      this.scheduleToShow = this.schedule;
    } else {
      const dateToday = new Date();
      this.getByDay(
        dateToday.getFullYear(),
        dateToday.getMonth(),
        dateToday.getDate(),
      );
    }
  }
}

/*   getOfert() {
    this.ofertService.getOfert().subscribe(oferts => {
      this.creditService.getCredit().subscribe(credits => {
        this.scheduleService.getSchedule().subscribe(s => {
          this.sbpService.getStatusBuyerProperty().subscribe(sbps => {
            this.allData = <any>this.getMerge(oferts, credits, s, sbps);
            this.allDataBackUp = this.allData;
            this.isLoad = true;
          });
        });
      });
    });
  } */
/*  getMerge(
    oferts: IOfert[],
    credits: ICredit[],
    schedules: ISchedule[],
    sbps: IStatusBuyerProperty[],
  ) {
    const allData: {
      data: {
        oferts?: IOfert;
        credits?: ICredit;
        schedules?: ISchedule;
        sbps?: IStatusBuyerProperty;
      };
      type: string;
      time: any;
    }[] = [];
    oferts.forEach(ofert => {
      allData.push({
        type: 'ofert',
        time: ofert.timestamp,
        data: { oferts: ofert },
      });
    });
    schedules.forEach(schedule => {
      if (!schedule.administrator && !schedule.personal) {
        allData.push({
          type: 'schedule',
          time: schedule.timestamp.toString(),
          data: { schedules: schedule },
        });
      }
    });
    credits.forEach(credit => {
      allData.push({
        type: 'credit',
        time: credit.timestamp.toString(),
        data: { credits: credit },
      });
    });
    sbps.forEach(sbp => {
      allData.push({
        type: 'sbp',
        time: sbp.timestamp.toString(),
        data: { sbps: sbp },
      });
    });
    allData.sort((a, b) => {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return <any>new Date(b.time) - <any>new Date(a.time);
    });
    console.log(allData);
    return allData;
  } */
