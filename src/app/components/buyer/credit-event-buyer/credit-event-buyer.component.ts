import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../../../services/property.service';
import { IProperty } from '../../../models/property.model';
import { BuyerService } from '../../../services/buyer.service';
import { UserSessionService } from '../../../services/user-session.service';
import { CreditService } from '../../../services/credit.service';
import { ICredit, ICreditGet } from '../../../models/credit.model';
import { IBuyer } from '../../../models/buyer.model';
import { ToastController } from '@ionic/angular';
import { StatusBuyerPropertyService } from '../../../services/status-buyer-property.service';
import { ScheduleService } from '../../../services/schedule.service';
import { ISchedule } from '../../../models/schedule.model';
import { FormatHoursFront } from '../../../_config/_helpers';
import { INotification } from '../../../models/notification.model';
import { OnesignalService } from '../../../services/onesignal.service';
import { map } from 'rxjs/operators';
import { SellerService } from '../../../services/seller.service';

@Component({
  selector: 'app-credit-event-buyer',
  templateUrl: './credit-event-buyer.component.html',
  styleUrls: ['./credit-event-buyer.component.scss'],
})
export class CreditEventBuyerComponent implements OnInit {
  propertyId: string;
  isLoad = false;
  hasCredit = false;
  hasSchedule = false;
  credit: ICredit;
  statusBuyerPropertyId;
  daySelect: number;
  monthSelect: number;
  yearSelect: number;
  hourSelect: number;
  months = [
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
  buyer: IBuyer;
  schedules = [];
  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private buyerService: BuyerService,
    private userSessionService: UserSessionService,
    private creditService: CreditService,
    public toastController: ToastController,
    private statusBuyerPropertyService: StatusBuyerPropertyService,
    private scheduleService: ScheduleService,
    private oneSignalService: OnesignalService,
    private sellerService: SellerService,
  ) {
    this.route.queryParams.subscribe(params => {
      if (params.id) {
        this.propertyId = params.id;
        this.statusBuyerPropertyId = params.statusId;
        this.getBuyerById(params.id);
      }
    });
  }

  ngOnInit() {}
  /**
   *
   * @param propertyId id de propiedad
   */
  getBuyerById(propertyId) {
    const buyerId = this.userSessionService.userSession.value.id;
    this.buyerService.getBuyerById(buyerId).subscribe(buyer => {
      this.buyer = buyer;
      const buyerGet = <any>buyer;
      const isCreditFinded = buyerGet.credit.find(
        credit => credit.property._id === propertyId,
      );
      // cambiar a filters si tine varias
      const isScheduleFinded = buyer.schedule.filter(
        s => s.property._id === propertyId,
      );
      if (isCreditFinded) {
        this.credit = isCreditFinded;
        this.hasCredit = true;
      }
      this.schedules = isScheduleFinded;
      this.isLoad = true;
    });
  }
  createCredit() {
    this.propertyService
      .getPropertyById(this.propertyId)
      .subscribe(property => {
        const buyerId = this.userSessionService.userSession.value.id;
        const buyerName = this.userSessionService.userSession.value.name;
        const credit: ICredit = {
          buyer: buyerId,
          property: this.propertyId,
          status: 'verde',
          notes: `El cliente "${buyerName}" requiere info. para adquirir un crédito para la propiedad: "${
            property.name
          }"`,
        };
        // Crear notif
        this.notification(
          'Solicitud de crédito',
          credit.notes,
          credit.status,
          'credit',
          ['office', 'administrator'],
          undefined,
        );
        this.creditService.newCredit(credit).subscribe(c => {
          if (c) {
            this.buyerService.getBuyerById(buyerId).subscribe(b => {
              const arr = b.credit.map(item => item._id);
              arr.push(c._id);
              const buyer: any = {
                _id: buyerId,
                credit: arr,
              };
              this.buyerService.putBuyer(buyer).subscribe(() => {
                this.getBuyerById(this.propertyId);
                this.presentToast('Solicitud enviada');
              });
            });
          }
        });
      });
  }
  respondOfert(str: string, isAcept: boolean) {
    const buyerName = this.userSessionService.userSession.value.name;
    this.statusBuyerPropertyService
      .upgradeStatus(this.statusBuyerPropertyId, 'rojo')
      .subscribe();
    this.credit.status = 'rojo';
    this.credit.notes = str;
    this.credit.isAccept = isAcept;
    this.creditService.putCredit(this.credit).subscribe(async res => {
      const seller = await this.getSellerOfProperty(this.propertyId);
      const prop = await this.getPropById(this.propertyId);
      const arr = this.buyer.adviser
        .map(a => a._id)
        .concat(seller === undefined ? '1' : seller._id);
      const dateToSchedule = new Date(new Date().getTime() + 15 * 86400000);
      // Crear notif
      this.notification(
        'Respuesta de crédito',
        `El cliente ${buyerName} ha ${str} un crédito para la propiedad: ${
          prop.name
        }`,
        this.credit.status,
        'credit',
        ['office', 'administrator'],
        arr,
      );
      if (isAcept) {
        this.notificationByApart(
          'Tiempo de Apartado Superado',
          `El tiempo de espera ha superado los 15 dias para el crédito de la propiedad: ${
            prop.name
          } del cliente ${this.userSessionService.userSession.value.name}`,
          ['office', 'administrator'],
          arr,
          dateToSchedule,
          this.credit,
        );
      }
      if (res) {
        this.getBuyerById(this.propertyId);
        this.presentToast('Crédito ' + str);
      }
    });
  }
  dateSelect(event) {
    if (event) {
      this.daySelect = event.value._i.date;
      this.monthSelect = event.value._i.month;
      this.yearSelect = event.value._i.year;
    }
  }
  // Schedules
  createSchedule() {
    this.propertyService
      .getPropertyById(this.propertyId)
      .subscribe(property => {
        const buyer = this.userSessionService.userSession.value;

        const newSchedule: any = {
          status: 'gris',
          note: `El cliente "${
            buyer.name
          }" requiere una cita para conocer la propiedad: "${property.name}"`,
          buyer: buyer.id,
          property: this.propertyId,
          year: this.yearSelect,
          month: this.monthSelect,
          day: this.daySelect,
          hour: this.hourSelect,
        };
        // Crear notif
        this.notification(
          'Solicitud de visita',
          newSchedule.note,
          newSchedule.status,
          'schedule',
          ['office', 'administrator'],
          undefined,
        );
        this.scheduleService.newSchedule(newSchedule).subscribe(s => {
          if (s) {
            this.buyerService.getBuyerById(buyer.id).subscribe(b => {
              const arr = b.schedule.map(item => item._id);
              arr.push(s._id);
              const buyerEdit: any = {
                _id: buyer.id,
                schedule: arr,
              };
              this.buyerService.putBuyer(buyerEdit).subscribe(() => {
                this.getBuyerById(this.propertyId);
                this.presentToast('Cita Solicitada');
              });
            });
          }
        });
      });
  }
  respondSchedule(str: string, schedule: ISchedule) {
    const buyerName = this.userSessionService.userSession.value.name;
    if (str === 'Aceptado') {
      schedule.status = 'amarillo';
      // noti schedule
      this.notificationBySchedule(schedule);
    } else {
      schedule.status = 'gris';
    }
    schedule.note = str;
    // Crear notif
    this.notification(
      'Respuesta de visita',
      `El cliente ${buyerName} ha ${str} la visita a ${schedule.property.name}`,
      schedule.status,
      'schedule',
      ['office', 'administrator'],
      [schedule.adviser._id],
    );
    this.scheduleService.putSchedule(schedule).subscribe(res => {
      if (res) {
        this.getBuyerById(this.propertyId);
        this.presentToast('Cita ' + str);
      }
    });
  }
  // toast
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
    });
    toast.present();
  }
  formatHours(hours, minutes) {
    return FormatHoursFront(hours, minutes);
  }
  public notification(
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
      .postOneSignalByTag(
        notification.title,
        message,
        status === 'rojo' ? ['office', 'administrator'] : ['office'],
        receiversId,
      )
      .subscribe(() => {
        // guardar noti
        this.oneSignalService.newNotification(notification).subscribe();
      });
  }
  public notificationBySchedule(schedule?: ISchedule) {
    // onesignal
    this.oneSignalService
      .postOneSignalBySchedule(
        'Recordatorio de evento',
        `Tienes un evento con direccion ${schedule.address} en propiedad: ${
          schedule.property.name
        } a las ${schedule.hour}hrs`,
        new Date(
          schedule.year,
          schedule.month,
          schedule.day,
          schedule.hour,
          schedule.minute,
        ),
        undefined,
        [this.userSessionService.userSession.value.id, schedule.adviser._id],
      )
      .subscribe(data => {
        if (!schedule.notificationOneSignal) {
          schedule.notificationOneSignal = [];
        }
        schedule.notificationOneSignal.push(data.id);
        this.scheduleService.putSchedule(schedule).subscribe();
      });
    /*  this.oneSignalService
      .postOneSignalBySchedule(
        'Recordatorio de evento',
        `sch`,
        new Date(2018, 9, 2, 11, 45),
        [],
        ['5b9be3590ec7e6001335105c', '5baba37a0beeaa15d074e954'],
      )
      .subscribe(e => {
        console.log(e);
      }); */
  }
  private notificationByApart(
    title,
    message,
    tags: string[],
    reciversId: string[],
    date: Date,
    credit: ICredit,
  ) {
    // onesignal
    this.oneSignalService
      .postOneSignalBySchedule(title, message, date, tags, reciversId)
      .subscribe(data => {
        if (!credit.notificationOneSignal) {
          credit.notificationOneSignal = [];
        }
        console.log(credit);
        credit.notificationOneSignal.push(data.id);
        this.creditService.putCredit(this.credit).subscribe();
      });
  }
  async getSellerOfProperty(id) {
    return await this.sellerService
      .getSellerAll()
      .pipe(
        map(sellers => sellers.find(s => !!s.property.find(p => p._id === id))),
      )
      .toPromise();
  }
  async getPropById(id) {
    return await this.propertyService.getPropertyById(id).toPromise();
  }
}
