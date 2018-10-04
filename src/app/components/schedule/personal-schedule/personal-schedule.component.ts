import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '../../../services/user-session.service';
import { IScheduleGet, ISchedule } from '../../../models/schedule.model';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ScheduleService } from '../../../services/schedule.service';
import { OnesignalService } from '../../../services/onesignal.service';
import { FormatDatesFront, FormatHoursFront } from '../../../_config/_helpers';

@Component({
  selector: 'app-personal-schedule',
  templateUrl: './personal-schedule.component.html',
  styleUrls: ['./personal-schedule.component.scss'],
})
export class PersonalScheduleComponent implements OnInit {
  hide = true;
  companyId: string;
  isNew = true;
  errorToShow = '';
  errorToShowMat = 'Dato obligatorio';
  schedule: IScheduleGet = {};
  item;
  // noti
  yearNoti: number;
  monthNoti: number;
  dayNoti: number;
  hourNoti: number;
  minuteNoti: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scheduleService: ScheduleService,
    private userSessionService: UserSessionService,
    private oneSignalService: OnesignalService,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.scheduleService.getScheduleById(params.id).subscribe(s => {
          this.schedule = <any>s;
          this.isNew = false;
        });
      } else {
        this.isNew = true;
      }
    });

    this.getUsuerType();
  }
  /**
   * asignar persona
   */
  getUsuerType() {
    const user = this.userSessionService.userSession.value;
    if (user.type === 'administrator') {
      this.schedule.administrator = user.id;
    } else {
      this.schedule.personal = user.id;
    }
  }

  dateSelect(event) {
    if (event) {
      this.schedule.day = event.value._i.date;
      this.schedule.month = event.value._i.month;
      this.schedule.year = event.value._i.year;
    }
  }
  dateSelect2(event) {
    if (event) {
      this.dayNoti = event.value._i.date;
      this.monthNoti = event.value._i.month;
      this.yearNoti = event.value._i.year;
    }
  }
  hourFormat(pmAm) {
    if (pmAm === 'pm' && this.schedule.hour && this.schedule.hour < 12) {
      this.schedule.hour = this.schedule.hour + 12;
    } else if (pmAm === 'am' && this.schedule.hour && this.schedule.hour > 12) {
      this.schedule.hour = this.schedule.hour - 12;
    }
  }
  hourFormat2(pmAm) {
    if (pmAm === 'pm' && this.hourNoti && this.hourNoti < 12) {
      this.hourNoti = this.hourNoti + 12;
    } else if (pmAm === 'am' && this.hourNoti && this.hourNoti > 12) {
      this.hourNoti = this.hourNoti - 12;
    }
  }
  /*   getAdvAll(item) {
    this.item = item;
    console.log(item);
    if (item === 'other') {
      this.advisers$ = this.adviserService.getAdviserAll();
      this.advisers$.subscribe(a => console.log(a));
    } else {
      this.schedule.adviser = item;
    }
  } */
  newSchedule() {
    const date = this.getDate2(
      this.schedule.day,
      this.schedule.month,
      this.schedule.year,
    );
    const hours = this.formatHour(this.schedule.hour, this.schedule.minute);
    this.scheduleService.newSchedule(<ISchedule>this.schedule).subscribe(s => {
      this.notificationBySchedule(
        'Evento Personal',
        `Tiene un evento pendiente con fecha: ${date} a las ${hours}`,
        undefined,
        [this.userSessionService.userSession.value.id],
        new Date(
          this.yearNoti,
          this.monthNoti,
          this.dayNoti,
          this.hourNoti,
          this.minuteNoti,
        ),
        s,
      );
      const toast: NavigationExtras = {
        queryParams: { res: ' Evento Creado' },
      };
      // this.navCtr.navigateRoot('list-schedule-admin');
      this.router
        .navigateByUrl('/RefrshComponent', {
          skipLocationChange: true,
        })
        .then(() => this.router.navigate(['list-schedule-admin'], toast));
    });
  }
  editSchedule() {
    const date = this.getDate2(
      this.schedule.day,
      this.schedule.month,
      this.schedule.year,
    );
    const hours = this.formatHour(this.schedule.hour, this.schedule.minute);
    this.schedule.notificationOneSignal = this.deleteOneSignal(this.schedule);
    this.scheduleService.putSchedule(<ISchedule>this.schedule).subscribe(() => {
      this.notificationBySchedule(
        'Evento Personal',
        `Tiene un evento pendiente con fecha: ${date} a las ${hours}`,
        undefined,
        [this.userSessionService.userSession.value.id],
        new Date(
          this.yearNoti,
          this.monthNoti,
          this.dayNoti,
          this.hourNoti,
          this.minuteNoti,
        ),
        <any>this.schedule,
      );
      const toast: NavigationExtras = {
        queryParams: { res: ' Evento Editado' },
      };
      // this.navCtr.navigateRoot('list-schedule-admin');
      this.router
        .navigateByUrl('/RefrshComponent', {
          skipLocationChange: true,
        })
        .then(() => this.router.navigate(['list-schedule-admin'], toast));
    });
  }

  getDate(day, month, year) {
    return new Date(year, month, day);
  }
  getDate2(day, month, year) {
    const d = new Date(year, month, day);
    return FormatDatesFront(d);
  }
  formatHour(h, m) {
    return FormatHoursFront(h, m);
  }
  private notificationBySchedule(
    title,
    message,
    tags: string[],
    reciversId: string[],
    date: Date,
    schedule: ISchedule,
  ) {
    // onesignal
    this.oneSignalService
      .postOneSignalBySchedule(title, message, date, tags, reciversId, 0)
      .subscribe(data => {
        if (!schedule.notificationOneSignal) {
          schedule.notificationOneSignal = [];
        }
        schedule.notificationOneSignal.push(data.id);
        this.scheduleService.putSchedule(schedule).subscribe();
      });
  }
  private deleteOneSignal(schedule) {
    /* const schedule = await this.scheduleService
      .getScheduleById(scheduleId)
      .toPromise(); */
    console.log(schedule);
    if (
      schedule.notificationOneSignal &&
      schedule.notificationOneSignal.length > 0
    ) {
      schedule.notificationOneSignal.forEach((idN, i) => {
        this.oneSignalService.deleteOneSignalSchedule(idN).subscribe();
      });
      return (schedule.notificationOneSignal = []);
    }
  }
  getPopMessage(event) {
    const isDisabled = (<HTMLInputElement>document.getElementById('submitUser'))
      .disabled;
    if (isDisabled) {
      this.errorToShow = 'Verificar datos ingresados';
    } else {
      this.errorToShow = '';
    }
  }
  getMatError($event) {
    if ($event.target.validity.valueMissing) {
      this.errorToShowMat = 'Dato obligatorio';
    }
    if ($event.target.validity.patternMismatch) {
      this.errorToShowMat = 'Solo números, letras, guiones y puntos\n';
    }
    if ($event.target.validity.tooShort) {
      this.errorToShowMat = 'Ingrese al menos 4 caracteres\n';
    }
    if ($event.target.validity.tooLong) {
      this.errorToShowMat = 'Máximo 255 caracteres\n';
    }
    if ($event.target.validity.rangeUnderflow) {
      this.errorToShowMat = 'Debe ser mayor a 0\n';
    }
  }
}
