import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '../../../services/user-session.service';
import { IScheduleGet, ISchedule } from '../../../models/schedule.model';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ScheduleService } from '../../../services/schedule.service';

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
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scheduleService: ScheduleService,
    private userSessionService: UserSessionService,
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
    }
  }

  dateSelect(event) {
    if (event) {
      this.schedule.day = event.value._i.date;
      this.schedule.month = event.value._i.month;
      this.schedule.year = event.value._i.year;
    }
  }
  hourFormat(pmAm) {
    console.log(pmAm);
    if (pmAm === 'pm' && this.schedule.hour && this.schedule.hour < 12) {
      this.schedule.hour = this.schedule.hour + 12;
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
    this.scheduleService.newSchedule(<ISchedule>this.schedule).subscribe(() => {
      const toast: NavigationExtras = {
        queryParams: { res: ' Evento Creado' },
      };
      // this.navCtr.navigateRoot('list-schedule-admin');
      /**
       * Es para recargar el componente previo
       */
      this.router
        .navigateByUrl('/RefrshComponent', {
          skipLocationChange: true,
        })
        .then(() => this.router.navigate(['list-schedule-admin'], toast));
    });
  }
  editSchedule() {
    this.scheduleService.putSchedule(<ISchedule>this.schedule).subscribe(() => {
      const toast: NavigationExtras = {
        queryParams: { res: ' Evento Editado' },
      };
      // this.navCtr.navigateRoot('list-schedule-admin');
      /**
       * Es para recargar el componente previo
       */
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
