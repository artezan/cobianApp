import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../../../services/property.service';
import { IProperty } from '../../../models/property.model';
import { BuyerService } from '../../../services/buyer.service';
import { UserSessionService } from '../../../services/user-session.service';
import { CreditService } from '../../../services/credit.service';
import { ICredit } from '../../../models/credit.model';
import { IBuyer } from '../../../models/buyer.model';
import { ToastController } from '@ionic/angular';
import { StatusBuyerPropertyService } from '../../../services/status-buyer-property.service';
import { ScheduleService } from '../../../services/schedule.service';
import { ISchedule } from '../../../models/schedule.model';

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
  schedule: ISchedule;

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private buyerService: BuyerService,
    private userSessionService: UserSessionService,
    private creditService: CreditService,
    public toastController: ToastController,
    private statusBuyerPropertyService: StatusBuyerPropertyService,
    private scheduleService: ScheduleService,
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
      const isCreditFinded = buyer.credit.find(
        credit => credit.property === propertyId,
      );
      const isScheduleFinded = buyer.schedule.find(
        s => s.property._id === propertyId,
      );
      console.log(buyer);
      if (isCreditFinded) {
        this.credit = isCreditFinded;
        this.hasCredit = true;
      }
      if (isScheduleFinded) {
        this.schedule = isScheduleFinded;
        this.hasSchedule = true;
      }
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
  respondOfert(str: string) {
    this.statusBuyerPropertyService
      .upgradeStatus(this.statusBuyerPropertyId, 'rojo')
      .subscribe(c => console.log(c));
    this.credit.status = 'rojo';
    this.credit.notes = str;
    this.creditService.putCredit(this.credit).subscribe(res => {
      if (res) {
        this.getBuyerById(this.propertyId);
        this.presentToast('Credito ' + str);
      }
    });
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
  respondSchedule(str: string) {
    if (str === 'Aceptado') {
      this.schedule.status = 'amarillo';
    } else {
      this.schedule.status = 'gris';
    }
    this.schedule.note = str;
    this.scheduleService.putSchedule(this.schedule).subscribe(res => {
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
}
