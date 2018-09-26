import { Component, OnInit } from '@angular/core';
import { ISchedule } from '../../../models/schedule.model';
import { BuyerService } from '../../../services/buyer.service';
import { UserSessionService } from '../../../services/user-session.service';
import {
  NavController,
  AlertController,
  ToastController,
} from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ScheduleService } from '../../../services/schedule.service';
import { FormatDatesFront, FormatHoursFront } from '../../../_config/_helpers';
import { Storage } from '@ionic/storage';
import { IUserSession } from '../../../models/userSession.model';

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
  user: IUserSession;
  constructor(
    private buyerService: BuyerService,
    private userSessionService: UserSessionService,
    private navController: NavController,
    private router: Router,
    private scheduleService: ScheduleService,
    public alertController: AlertController,
    private userService: UserSessionService,
    private toastController: ToastController,
    private storage: Storage,
    public route: ActivatedRoute,
  ) {
    this.user = userService.userSession.value;
    this.monthNumber = new Date().getMonth();
    this.year = new Date().getFullYear();
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['res']) {
        this.presentToast(params['res']);
      }
    });
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
        this.schedule = schedules.filter(s => !s.personal);
      } else if (user.type === 'adviser') {
        this.schedule = schedules.filter(
          s =>
            (s.adviser && s.adviser._id === user.id) ||
            (s.personal && s.personal === user.id),
        );
        console.log(this.schedule);
      } else if (user.type === 'office') {
        this.schedule = schedules.filter(
          s => !s.administrator || (s.personal && s.personal === user.id),
        );
      } else if (user.type === 'seller') {
        this.schedule = schedules.filter(
          s =>
            (s.seller && s.seller._id === user.id) ||
            (s.personal && s.personal === user.id),
        );
        console.log(this.schedule);
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
  editEventPersonalById(id: string) {
    const data: NavigationExtras = {
      queryParams: { id: id },
    };
    this.router.navigate(['personal-schedule'], data);
  }
  deleteEvent(id) {
    this.scheduleService
      .deltedScheduleById(id)
      .toPromise()
      .then(() => {
        this.getEvents();
      });
  }
  // dialogs
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
  /**
   * Calificar visita
   */
  async presentAlertVisit(schedule: ISchedule) {
    const alert = await this.alertController.create({
      header: 'Calificar',
      subHeader: 'Califica la visita realizada',
      inputs: [
        {
          name: 'radio2',
          type: 'radio',
          label: 'No hay interés',
          value: 'gris',
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'Poco interés',
          value: 'verde',
        },
        {
          name: 'radio4',
          type: 'radio',
          label: 'Oportunidad de venta',
          value: 'amarillo',
        },
        {
          name: 'radio5',
          type: 'radio',
          label: 'Venta muy probable',
          value: 'rojo',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Ok',
          role: 'ok',
          handler: () => {
            console.log('Confirm Ok');
          },
        },
      ],
    });

    await alert.present();
    await alert.onWillDismiss().then(res => {
      if (res.role === 'ok') {
        schedule.scoreByAdviser = res.data.values;
        schedule.status = 'rojo';
        this.putEvent(schedule);
      }
    });
  }
  // end dialogs
  putEvent(schedule: ISchedule) {
    this.scheduleService
      .putSchedule(schedule)
      .toPromise()
      .then(() => {
        this.getEvents();
      });
  }
  async toastPresent(m = 'Eventos pendientes hoy') {
    const isPresent = await this.storage.get('alert-today');
    console.log(isPresent);
    if (+isPresent !== new Date().getDate()) {
      const toast = await this.toastController.create({
        message: m,
        showCloseButton: true,
        position: 'bottom',
        closeButtonText: 'OK',
        cssClass: 'toast-alert',
        duration: 50000,
      });
      toast.present();
      toast.onWillDismiss().then(() => {
        this.storage.set('alert-today', new Date().getDate());
      });
    }
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
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
  formatHours(hours, minutes) {
    return FormatHoursFront(hours, minutes);
  }
  comparateDate(year, month, day): boolean {
    const today = new Date().getTime();
    const date = new Date(year, month, day).getTime();
    return date < today;
  }
}
