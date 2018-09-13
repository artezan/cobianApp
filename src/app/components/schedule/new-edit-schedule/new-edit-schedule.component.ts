import { Component, OnInit } from '@angular/core';
import { ISchedule, IScheduleGet } from '../../../models/schedule.model';
import { Observable } from 'rxjs';
import { IProperty } from '../../../models/property.model';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { SellerService } from '../../../services/seller.service';
import { NavController, AlertController } from '@ionic/angular';
import { PropertyService } from '../../../services/property.service';
import { IBuyer } from '../../../models/buyer.model';
import { BuyerService } from '../../../services/buyer.service';
import { IAdviser } from '../../../models/adviser.model';
import { map } from 'rxjs/operators';
import { AdviserService } from '../../../services/adviser.service';
import { MatDatepickerInputEvent } from '@angular/material';
import { Moment } from 'moment';
import { ScheduleService } from '../../../services/schedule.service';

@Component({
  selector: 'app-new-edit-schedule',
  templateUrl: './new-edit-schedule.component.html',
  styleUrls: ['./new-edit-schedule.component.scss'],
})
export class NewEditScheduleComponent implements OnInit {
  hide = true;
  companyId: string;
  isNew = true;
  errorToShow = '';
  errorToShowMat = 'Dato obligatorio';
  schedule: IScheduleGet = {};
  properties$: Observable<IProperty[]>;
  buyers$: Observable<IBuyer[]>;
  buyerSelect$: Observable<IBuyer>;
  advisers$: Observable<IAdviser[]>;
  item;
  adviserBefore: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scheduleService: ScheduleService,
    private navCtr: NavController,
    private propertyService: PropertyService,
    private buyerService: BuyerService,
    private adviserService: AdviserService,
    public alertController: AlertController,
  ) {}

  ngOnInit() {
    this.getProperties();
    this.getBuyers();
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.scheduleService.getScheduleById(params['id']).subscribe(s => {
          console.log(s);
          this.schedule = <IScheduleGet>s;
          if (s.buyer) {
            this.schedule.buyer = <any>s.buyer._id;
            this.getAdvByBuyer();
          }
          if (s.adviser) {
            this.schedule.adviser = <any>s.adviser._id;
            console.log(this.schedule.adviser);
            this.adviserBefore = this.schedule.adviser;
          }
          this.schedule.property = <any>s.property._id;
          if (this.schedule.property) {
            this.getAddress(this.schedule.property);
          }
        });
        this.isNew = false;
      } else {
        if (params['year']) {
          this.schedule.day = +params.day;
          this.schedule.month = +params.month;
          this.schedule.year = +params.year;
        }
        this.isNew = true;
      }
    });
  }
  getProperties() {
    this.properties$ = this.propertyService.getAll();
  }
  getBuyers() {
    this.buyers$ = this.buyerService.getBuyerAll();
  }
  getAdvByBuyer() {
    this.buyerSelect$ = this.buyerService.getBuyerById(<string>(
      this.schedule.buyer
    ));
    this.buyerSelect$.subscribe(c => console.log(c));
  }
  getAddress(propId) {
    this.propertyService.getPropertyById(propId).subscribe(prop => {
      this.schedule.address = prop.zone;
    });
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
  getAdvAll(item) {
    this.item = item;
    console.log(item);
    if (item === 'other') {
      this.advisers$ = this.adviserService.getAdviserAll();
      this.advisers$.subscribe(a => console.log(a));
    } else {
      this.schedule.adviser = item;
    }
  }
  newSchedule() {
    this.schedule.status = 'verde';
    console.log(this.schedule);
    this.scheduleService.newSchedule(<ISchedule>this.schedule).subscribe(s => {
      this.buyerSelect$.subscribe(buyer => {
        buyer.schedule.push(<ISchedule>s._id);
        if (this.item === 'other') {
          buyer.adviser.push(<any>this.schedule.adviser);
        }
        this.buyerService.putBuyer(buyer).subscribe(() => {
          this.adviserService
            .getAdviserById(<string>this.schedule.adviser)
            .subscribe(adv => {
              if (this.item === 'other') {
                adv.buyer.push(<any>this.schedule.buyer);
              }
              adv.schedule.push(<ISchedule>s._id);
              this.adviserService.putAdviser(adv).subscribe(() => {
                this.navCtr.navigateRoot('list-schedule-admin');
              });
            });
        });
      });
    });
  }
  editCustomer() {
    this.schedule.status = 'verde';
    console.log(this.adviserBefore);
    console.log(this.schedule.adviser);
    console.log(this.schedule);
    if (this.adviserBefore === undefined) {
      this.buyerSelect$.subscribe(buyer => {
        if (this.item === 'other') {
          buyer.adviser.push(<any>this.schedule.adviser);
        }
        this.buyerService.putBuyer(buyer).subscribe(() => {
          this.adviserService
            .getAdviserById(<string>this.schedule.adviser)
            .subscribe(adv => {
              if (this.item === 'other') {
                adv.buyer.push(<any>this.schedule.buyer);
              }
              adv.schedule.push(<ISchedule>this.schedule._id);
              this.adviserService.putAdviser(adv).subscribe(() => {
                console.log('ya');
              });
            });
        });
      });
    } else {
      if (this.adviserBefore !== this.schedule.adviser) {
        this.adviserService
          .getAdviserById(this.adviserBefore)
          .subscribe(advBefore => {
            const indexFinded = advBefore.schedule.findIndex(
              s => s._id === this.schedule._id,
            );
            advBefore.schedule.splice(indexFinded, 1);
            this.adviserService.putAdviser(advBefore).subscribe(() => {
              this.adviserService
                .getAdviserById(this.schedule.adviser)
                .subscribe(adv => {
                  adv.schedule.push(<ISchedule>this.schedule._id);
                  this.adviserService.putAdviser(adv).subscribe(() => {});
                });
            });
          });
      }
    }

    this.scheduleService.putSchedule(<ISchedule>this.schedule).subscribe(() => {
      const toast: NavigationExtras = {
        queryParams: { res: ' Propietario Editado' },
      };
      // this.router.navigate(['list-seller-admin'], toast);
      this.navCtr.navigateRoot('list-schedule-admin');
    });
  }
  checkHoursAdviser(type: 'edit' | 'new') {
    this.adviserService.getAdviserById(this.schedule.adviser).subscribe(adv => {
      if (
        this.schedule.hour < adv.hourStart ||
        this.schedule.hour > adv.hourEnd
      ) {
        this.presentAlertConfirm(type, adv.hourStart, adv.hourEnd);
      } else {
        if (type === 'new') {
          this.newSchedule();
        } else {
          this.editCustomer();
        }
      }
    });
  }
  async presentAlertConfirm(type: 'edit' | 'new', hourStart, hourEnd) {
    const alert = await this.alertController.create({
      header: 'Advertencia',
      message: `El Asesor asignado tine una disponibilidad de ${hourStart} a ${hourEnd}`,
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
          text: 'Continuar',
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
        if (type === 'new') {
          this.newSchedule();
        } else {
          this.editCustomer();
        }
      }
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
