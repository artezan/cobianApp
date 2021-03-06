import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ISchedule } from '../../../models/schedule.model';
import { BuyerService } from '../../../services/buyer.service';
import { UserSessionService } from '../../../services/user-session.service';
import {
  NavController,
  AlertController,
  ToastController,
  Platform,
} from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ScheduleService } from '../../../services/schedule.service';
import {
  FormatDatesFront,
  FormatHoursFront,
  OpenGoogleMaps,
} from '../../../_config/_helpers';
import { Storage } from '@ionic/storage';
import { IUserSession } from '../../../models/userSession.model';
import { INotification } from '../../../models/notification.model';
import { OnesignalService } from '../../../services/onesignal.service';
import { SellerService } from '../../../services/seller.service';
import { map } from 'rxjs/operators';
import { SaleService } from '../../../services/sale.service';
import { ISale } from '../../../models/sale.model';

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
  sales: ISale[];
  showSpecific = false;
  // week
  showWeek = true;
  fowarkWeek = 0;
  backWeek = 0;
  currentWeek = new Date();
  isDesktop: boolean;
  titleNavBar = new Date();
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
    private oneSignalService: OnesignalService,
    private sellerService: SellerService,
    private saleService: SaleService,
    public platform: Platform,
  ) {
    this.isDesktop = platform.is('desktop');
    console.log(this.isDesktop);
    this.user = userService.userSession.value;
    this.monthNumber = new Date().getMonth();
    this.year = new Date().getFullYear();
    this.route.queryParams.subscribe(params => {
      if (params['res']) {
        this.presentToast(params['res']);
      }
    });
    this.getEvents();
    this.isAll = true;
  }
  ngOnInit() {
    /* const buyer = this.userSessionService.userSession.value;
    this.buyerService.getBuyerById(buyer.id).subscribe(b => {
      this.schedule = b.schedule;
      this.isLoad = true;
    }); */
  }
  calendarSelect(
    item: { year: number; month: number; day: number },
    islist?: boolean,
  ) {
    if (item.day !== 0) {
      const isFinded = this.schedule.filter(
        s =>
          s.day === item.day && s.month === item.month && s.year === item.year,
      );
      if (isFinded.length > 0) {
        this.dateDaySelect = FormatDatesFront(
          new Date(item.year, item.month, item.day),
        );
        if (islist) {
          this.schedule = isFinded;
        }
        this.showFullCalendar = false;
        this.isAll = false;
        this.dayItem = item;
        if (!islist) {
          this.currentWeek = new Date(item.year, item.month, item.day);
          this.showWeek = false;
          this.showSpecific = true;
        }
      } else {
        this.newEventByDate(item);
      }
    }
  }
  getEvents() {
    this.isLoad = false;
    this.dayItem = undefined;
    this.isAll = true;
    this.scheduleService.getSchedule().subscribe(schedules => {
      // console.log('schedules', schedules);
      const user = this.userService.userSession.value;
      if (user.type === 'administrator') {
        this.schedule = schedules.filter(s => !s.personal);
      } else if (user.type === 'adviser') {
        this.getTotalSalesByAdv();
        this.toastPresentAdv(`Bienvenido ${this.user.name}`);
        this.schedule = schedules.filter(
          s =>
            (s.adviser && s.adviser._id === user.id) ||
            (s.personal && s.personal === user.id),
        );
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
      }
      this.schedule.sort((a, b) => {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return <any>new Date(b.timestamp) - <any>new Date(a.timestamp);
      });
      console.log(this.schedule);
      this.isLoad = true;
    });
  }
  newEventByDate(date?: {
    year: number;
    month: number;
    day: number;
    hour?: number;
  }) {
    if (date) {
      const data: NavigationExtras = {
        queryParams: {
          day: date.day,
          month: date.month,
          year: date.year,
          hour: date.hour,
        },
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
  async deleteEvent(id) {
    const schedule = await this.scheduleService.getScheduleById(id).toPromise();
    if (schedule.notificationOneSignal) {
      schedule.notificationOneSignal.forEach(idN => {
        this.oneSignalService.deleteOneSignalSchedule(idN).subscribe();
      });
    }
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
      message: `¿Desea eliminar evento?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {},
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
          handler: () => {},
        },
        {
          text: 'Ok',
          role: 'ok',
          handler: () => {},
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
  async getSellerOfProperty(propId) {
    return await this.sellerService
      .getSellerAll()
      .pipe(
        map(sellers =>
          sellers.find(s => !!s.property.find(p => p._id === propId)),
        ),
      )
      .toPromise();
  }
  // end dialogs
  async putEvent(schedule: ISchedule) {
    const seller = await this.getSellerOfProperty(schedule.property._id);
    this.notification(
      'Calificación de Visita',
      `El asesor ${
        this.userSessionService.userSession.value.name
      } calificó como "${
        schedule.scoreByAdviser === 'rojo'
          ? 'Venta muy probable'
          : schedule.scoreByAdviser === 'amarillo'
          ? 'Oportunidad de venta'
          : schedule.scoreByAdviser === 'verde'
          ? 'Poco interés'
          : 'Sin interés'
      }" la visita a la propiedad ${schedule.property.name} con el comprador ${
        schedule.buyer.name
      }`,
      'rojo',
      'schedule',
      ['administrator', 'office'],
      seller === undefined ? undefined : [seller._id],
    );
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
        duration: 5000,
      });
      toast.present();
      toast.onWillDismiss().then(() => {
        this.storage.set('alert-today', new Date().getDate());
      });
    }
  }
  async toastPresentAdv(m) {
    const isPresent = await this.storage.get('alert-adv');
    if (+isPresent !== new Date().getDate()) {
      const toast = await this.toastController.create(<any>{
        message: m,
        position: 'bottom',
        showCloseButton: false,
        cssClass: 'toast-adv',
        duration: 4000,
      });
      toast.present();
      toast.onWillDismiss().then(() => {
        this.storage.set('alert-adv', new Date().getDate());
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
    if (this.showFullCalendar === false) {
      this.backWeek++;
    } else {
      if (this.monthNumber === 0) {
        this.year--;
        this.monthNumber = 11;
      } else {
        this.monthNumber--;
      }
    }
  }
  fowardOne() {
    if (this.showFullCalendar === false) {
      this.fowarkWeek++;
    } else {
      if (this.monthNumber === 11) {
        this.year++;
        this.monthNumber = 0;
      } else {
        this.monthNumber++;
      }
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
    } else if (state === undefined) {
      return 'Evento Personal';
    } else if (state === 'gris') {
      return 'Solicitud de Cita';
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
  private notification(
    title,
    message,
    status,
    type,
    tags,
    receiversId: string[],
  ) {
    // notificacion
    const notification: INotification = {
      title: title,
      message: message,
      tags: tags,
      receiversId: receiversId,
      senderId: this.userSessionService.userSession.value.id,
      status: status,
      type: type,
    };
    // onesignal
    this.oneSignalService
      .postOneSignalByTag(notification.title, message, tags, receiversId)
      .subscribe(() => {
        // guardar noti
        this.oneSignalService.newNotification(notification).subscribe();
      });
  }
  getTotalSalesByAdv() {
    this.saleService.getSaleByIdAdv(this.user.id).subscribe(sales => {
      this.sales = sales;
    });
  }
  sendToTotalSales() {
    if (this.sales.length > 0) {
      this.router.navigate(['list-sales-admin']);
    }
  }
  openMaps(schedule) {
    OpenGoogleMaps(schedule);
  }
}
