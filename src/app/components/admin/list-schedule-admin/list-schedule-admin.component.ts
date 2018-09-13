import { Component, OnInit } from '@angular/core';
import { ISchedule } from '../../../models/schedule.model';
import { BuyerService } from '../../../services/buyer.service';
import { UserSessionService } from '../../../services/user-session.service';
import { NavController, AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { ScheduleService } from '../../../services/schedule.service';
import { FormatDatesFront } from '../../../_config/_helpers';

@Component({
  selector: 'app-list-schedule-admin',
  templateUrl: './list-schedule-admin.component.html',
  styleUrls: ['./list-schedule-admin.component.scss'],
})
export class ListScheduleAdminComponent implements OnInit {
  month = [
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
  year: number;
  monthNumber: number;
  schedule: ISchedule[];
  isLoad = false;
  showFullCalendar = true;
  dateDaySelect;
  isAll: boolean;
  dayItem;
  constructor(
    private buyerService: BuyerService,
    private userSessionService: UserSessionService,
    private navController: NavController,
    private router: Router,
    private scheduleService: ScheduleService,
    public alertController: AlertController,
    private userService: UserSessionService,
  ) {
    this.monthNumber = new Date().getMonth();
    this.year = new Date().getFullYear();
  }
  ngOnInit() {
    /* const buyer = this.userSessionService.userSession.value;
    this.buyerService.getBuyerById(buyer.id).subscribe(b => {
      this.schedule = b.schedule;
      this.isLoad = true;
    }); */
    this.getEvents();
  }
  calendarSelect(item: { year: number; month: number; day: number }) {
    if (item.day !== 0) {
      const isFinded = this.schedule.filter(
        s =>
          s.day === item.day && s.month === item.month && s.year === item.year,
      );
      if (isFinded.length > 0) {
        this.dateDaySelect = FormatDatesFront(
          new Date(item.year, item.month, item.day),
        );
        this.schedule = isFinded;
        this.showFullCalendar = false;
        this.isAll = false;
        this.dayItem = item;
      } else {
        this.newEventByDate(item);
      }
    }
  }
  getEvents() {
    this.isLoad = false;

    this.isAll = true;
    this.scheduleService.getSchedule().subscribe(schedules => {
      const user = this.userService.userSession.value;
      console.log(schedules);
      if (user.type === 'administrator') {
        this.schedule = schedules;
      } else {
        schedules.forEach(s => {
          if (!s.administrator) {
            this.schedule.push(s);
          }
        });
      }
      this.schedule.sort((a, b) => {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return <any>new Date(b.timestamp) - <any>new Date(a.timestamp);
      });
      this.isLoad = true;
    });
  }
  newEventByDate(date?: { year: number; month: number; day: number }) {
    if (date) {
      const data: NavigationExtras = {
        queryParams: { day: date.day, month: date.month, year: date.year },
      };
      this.router.navigate(['new-edit-schedule'], data);
    } else {
      this.router.navigate(['new-edit-schedule']);
    }
  }
  newEventById(id: string) {
    const data: NavigationExtras = {
      queryParams: { id: id },
    };
    this.router.navigate(['new-edit-schedule'], data);
  }
  deleteEvent(id) {
    this.scheduleService
      .deltedScheduleById(id)
      .toPromise()
      .then(() => {
        this.getEvents();
      });
  }
  async presentAlertConfirm(id) {
    const alert = await this.alertController.create({
      header: 'Eliminar evento',
      message: `¿Desea eliminar evento ?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Sí',
          role: 'ok',
          handler: () => {
            /* this.deleted(buyer);
            this.getBuyerAll(); */
          },
        },
      ],
    });

    await alert.present();
    // IMPORTANTE ASYNC !!!!!
    await alert.onWillDismiss().then(res => {
      if (res.role === 'ok') {
        this.deleteEvent(id);
      }
    });
  }

  // _helpers
  backOne() {
    if (this.monthNumber === 0) {
      this.year--;
      this.monthNumber = 11;
    } else {
      this.monthNumber--;
    }
  }
  fowardOne() {
    if (this.monthNumber === 11) {
      this.year++;
      this.monthNumber = 0;
    } else {
      this.monthNumber++;
    }
  }
  formatDate(item) {
    return FormatDatesFront(item);
  }
  formatState(state: string) {
    if (state === 'verde') {
      return 'En espera de confirmación';
    } else if (state === 'amarillo') {
      return 'Confirmada en espera de asistencia';
    } else if (state === 'rojo') {
      return 'Cita pasada';
    } else if (state === 'azul') {
    }
  }
}
