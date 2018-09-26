import { Component, OnInit } from '@angular/core';
import {
  ISchedule,
  IScheduleGet,
  CheckSchedule,
} from '../../../models/schedule.model';
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
import { UserSessionService } from '../../../services/user-session.service';
import { IUserSession } from '../../../models/userSession.model';

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
  user: IUserSession;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scheduleService: ScheduleService,
    private navCtr: NavController,
    private propertyService: PropertyService,
    private buyerService: BuyerService,
    private adviserService: AdviserService,
    public alertController: AlertController,
    private userSession: UserSessionService,
    private sellerService: SellerService,
  ) {
    this.user = userSession.userSession.value;
  }

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
        if (this.user.type === 'adviser') {
          this.schedule.adviser = this.user.id;
        }
        this.isNew = true;
      }
    });
  }
  getProperties() {
    if (this.user.type === 'seller') {
      this.properties$ = new Observable<IProperty[]>(ob => {
        this.propertyService.getAll().subscribe(prop => {
          this.sellerService.getSellerById(this.user.id).subscribe(seller => {
            ob.next(
              prop.filter(p => {
                return !!seller.property.find(ps => ps._id === p._id);
              }),
            );
          });
        });
        ob.next();
      });
    } else {
      this.properties$ = this.propertyService.getAll();
    }
  }
  getBuyers() {
    if (this.user.type === 'adviser') {
      this.buyers$ = new Observable<IBuyer[]>(ob => {
        this.buyerService.getBuyerAll().subscribe(data => {
          ob.next(
            data.filter(b => {
              return !!b.adviser.find(adv => adv._id === this.user.id);
            }),
          );
        });
      });
    } else if (this.user.type === 'seller') {
      this.buyers$ = new Observable<IBuyer[]>(ob => {
        this.buyerService.getBuyerAll().subscribe(buyers => {
          this.sellerService.getSellerById(this.user.id).subscribe(seller => {
            ob.next(
              buyers.filter(b => {
                return !!b.statusBuyerProperty.find(sbp => {
                  return !!seller.property.find(
                    p => p._id === sbp.property._id,
                  );
                });
              }),
            );
          });
        });
      });
    } else {
      this.buyers$ = this.buyerService.getBuyerAll();
    }
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
  newScheduleSeller() {
    this.schedule.status = 'verde';
    this.schedule.seller = <any>this.user.id;
    console.log(this.schedule);
    this.scheduleService.newSchedule(<ISchedule>this.schedule).subscribe(s => {
      this.buyerSelect$.subscribe(buyer => {
        buyer.schedule.push(<ISchedule>s._id);
        this.buyerService.putBuyer(buyer).subscribe(() => {
          this.sellerService.getSellerById(this.user.id).subscribe(seller => {
            seller.schedule.push(<ISchedule>s._id);
            this.sellerService.putSeller(seller).subscribe(() => {
              const toast: NavigationExtras = {
                queryParams: { res: 'Evento de Vendedor Creado' },
              };
              // this.navCtr.navigateRoot('list-schedule-admin');
              /**
               * Es para recargar el componente previo
               */
              this.router
                .navigateByUrl('/RefrshComponent', {
                  skipLocationChange: true,
                })
                .then(() =>
                  this.router.navigate(['list-schedule-admin'], toast),
                );
            });
          });
        });
      });
    });
  }
  async newSchedule() {
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
                const toast: NavigationExtras = {
                  queryParams: { res: ' Evento Creado' },
                };
                // this.navCtr.navigateRoot('list-schedule-admin');
                this.router
                  .navigateByUrl('/RefrshComponent', {
                    skipLocationChange: true,
                  })
                  .then(() =>
                    this.router.navigate(['list-schedule-admin'], toast),
                  );
              });
            });
        });
      });
    });
  }
  editCustomerSeller() {
    this.scheduleService.putSchedule(<ISchedule>this.schedule).subscribe(() => {
      const toast: NavigationExtras = {
        queryParams: { res: ' Evento Editado' },
      };
      // this.router.navigate(['list-seller-admin'], toast);
      // this.navCtr.navigateRoot('list-schedule-admin');
      /**
       * Es para recargar el componente previo
       */
      this.router
        .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
        .then(() => this.router.navigate(['list-schedule-admin'], toast));
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
              this.adviserService.putAdviser(adv).subscribe(() => {});
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
        queryParams: { res: ' Evento Editado' },
      };
      // this.router.navigate(['list-seller-admin'], toast);
      // this.navCtr.navigateRoot('list-schedule-admin');
      /**
       * Es para recargar el componente previo
       */
      this.router
        .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
        .then(() => this.router.navigate(['list-schedule-admin'], toast));
    });
  }
  checkHoursAdviser(type: 'edit' | 'new') {
    console.log(this.schedule);
    this.adviserService.getAdviserById(this.schedule.adviser).subscribe(adv => {
      if (
        this.schedule.hour < adv.hourStart ||
        this.schedule.hour > adv.hourEnd
      ) {
        this.presentAlertConfirm(type, adv.hourStart, adv.hourEnd);
      } else {
        this.presentAlertConfirm2(type);
      }
    });
  }
  async checkScheduleSeller(type: 'edit' | 'new') {
    let message;
    let isPresent: boolean;
    const check = await this.checkSchedule();
    console.log(check);
    if (!check.propertyCan) {
      message = 'La propiedad elegida esta ocupada a esa hora';
      isPresent = true;
    } else if (!check.buyerCan) {
      message = `El Cliente elegido esta ocupado a esa hora`;
      isPresent = true;
    } else if (!check.propertyCan) {
      message = `El Asesor elegido esta ocupado a esa hora`;
      isPresent = true;
    } else {
      isPresent = false;
    }
    const alert = await this.alertController.create({
      header: 'Advertencia',
      message: message,
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
    if (isPresent) {
      await alert.present();
    } else {
      if (type === 'new') {
        this.newScheduleSeller();
      } else {
        this.editCustomerSeller();
      }
    }
    // IMPORTANTE ASYNC !!!!!
    await alert.onWillDismiss().then(res => {
      if (res.role === 'ok') {
        if (type === 'new') {
          this.newScheduleSeller();
        } else {
          this.editCustomerSeller();
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
        this.presentAlertConfirm2(type);
      }
    });
  }
  async presentAlertConfirm2(type: 'edit' | 'new') {
    let message;
    let isPresent: boolean;
    const check = await this.checkSchedule();
    console.log(check);
    if (!check.propertyCan) {
      message = 'La propiedad elegida esta ocupada a esa hora';
      isPresent = true;
    } else if (!check.buyerCan) {
      message = `El Cliente elegido esta ocupado a esa hora`;
      isPresent = true;
    } else if (!check.adviserCan) {
      message = `El Asesor elegido esta ocupado a esa hora`;
      isPresent = true;
    } else {
      isPresent = false;
    }
    const alert = await this.alertController.create({
      header: 'Advertencia',
      message: message,
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
    if (isPresent) {
      await alert.present();
    } else {
      if (type === 'new') {
        this.newSchedule();
      } else {
        this.editCustomer();
      }
    }
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

  async checkSchedule() {
    return await this.scheduleService.checkSchedule(this.schedule).toPromise();
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
