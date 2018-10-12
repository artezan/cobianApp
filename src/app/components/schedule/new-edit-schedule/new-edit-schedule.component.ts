import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  ISchedule,
  IScheduleGet,
  CheckSchedule,
} from '../../../models/schedule.model';
import { Observable } from 'rxjs/internal/Observable';
import { IProperty } from '../../../models/property.model';
import {
  ActivatedRoute,
  Router,
  NavigationExtras,
  NavigationEnd,
} from '@angular/router';
import { SellerService } from '../../../services/seller.service';
import { NavController, AlertController } from '@ionic/angular';
import { PropertyService } from '../../../services/property.service';
import { IBuyer } from '../../../models/buyer.model';
import { BuyerService } from '../../../services/buyer.service';
import { IAdviser } from '../../../models/adviser.model';
import { map } from 'rxjs/operators';
import { AdviserService } from '../../../services/adviser.service';
import { Moment } from 'moment';
import { ScheduleService } from '../../../services/schedule.service';
import { UserSessionService } from '../../../services/user-session.service';
import { IUserSession } from '../../../models/userSession.model';
import { DialogGeneralComponent } from '../../general/dialog-general/dialog-general.component';
import { INotification } from '../../../models/notification.model';
import { OnesignalService } from '../../../services/onesignal.service';
import { FormatDatesFront, FormatHoursFront } from '../../../_config/_helpers';
import { MatDialog } from '@angular/material/dialog';

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
    public dialog: MatDialog,
    private oneSignalService: OnesignalService,
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
  async getPropById(id) {
    return await this.propertyService.getPropertyById(id).toPromise();
  }
  async newScheduleSeller() {
    const date = this.getDate2(
      this.schedule.day,
      this.schedule.month,
      this.schedule.year,
    );
    const hours = this.formatHour(this.schedule.hour, this.schedule.minute);
    const prop = await this.getPropById(this.schedule.property);
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
              this.notification(
                'Nuevo Evento',
                `Se ha agendado una propuesta de evento con el vendedor ${
                  seller.name
                } en propiedad: ${
                  prop.name
                }  con fecha: ${date} y hora: ${hours} `,
                'amarillo',
                'schedule',
                undefined,
                [this.schedule.buyer],
              );
              const toast: NavigationExtras = {
                queryParams: { res: 'Evento de Vendedor Creado' },
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
  // start get by id
  async getSchedulebyId(id) {
    return await this.scheduleService.getScheduleById(id).toPromise();
  }
  //
  newSchedule() {
    const date = this.getDate2(
      this.schedule.day,
      this.schedule.month,
      this.schedule.year,
    );
    const hours = this.formatHour(this.schedule.hour, this.schedule.minute);
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
              this.adviserService.putAdviser(adv).subscribe(async () => {
                const schedule = await this.getSchedulebyId(s._id);
                // noti
                this.notification(
                  'Nuevo Evento',
                  `Se ha generado una propuesta de evento en ${
                    schedule.property.name
                  } con fecha: ${date} y hora: ${hours} `,
                  'verde',
                  'schedule',
                  undefined,
                  [schedule.adviser._id, schedule.buyer._id],
                );
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
    console.log('%c nuevo', 'color: #f5811e;');
  }
  editCustomerSeller() {
    if (this.schedule.status === 'amarillo') {
      this.schedule.notificationOneSignal = this.deleteOneSignal(this.schedule);
    }
    this.schedule.status = 'verde';
    this.scheduleService
      .putSchedule(<ISchedule>this.schedule)
      .subscribe(async () => {
        const prop = await this.getPropById(this.schedule.property);
        const toast: NavigationExtras = {
          queryParams: { res: ' Evento Editado' },
        };
        this.notification(
          'Evento Editado',
          `Actualización de propuesta de evento en propiedad ${prop.name}`,
          'amarillo',
          'schedule',
          undefined,
          [this.schedule.buyer],
        );
        // this.router.navigate(['list-schedule-admin'], toast);
        // this.navCtr.navigateRoot('list-schedule-admin');
        const p = await this.router.navigateByUrl('/RefrshComponent', {
          skipLocationChange: true,
        });
        if (p) {
          this.router.navigate(['list-schedule-admin'], toast);
        }
      });
  }
  editCustomer() {
    if (this.schedule.status === 'amarillo') {
      this.schedule.notificationOneSignal = this.deleteOneSignal(this.schedule);
    }
    this.schedule.status = 'verde';
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

    this.scheduleService
      .putSchedule(<ISchedule>this.schedule)
      .subscribe(async () => {
        const schedule = await this.getSchedulebyId(this.schedule._id);
        // noti
        this.notification(
          'Nuevo Evento',
          `Se ha generado una propuesta de evento en ${
            schedule.property.name
          }, en espera de respuesta del Cliente: ${schedule.buyer.name}`,
          'verde',
          'schedule',
          undefined,
          [schedule.buyer._id, schedule.adviser._id],
        );
        const toast: NavigationExtras = {
          queryParams: { res: ' Evento Editado' },
        };
        // this.router.navigate(['list-schedule-admin'], toast);
        // this.navCtr.navigateRoot('list-schedule-admin');
        /**
         * Es para recargar el componente previo
         */
        /*  this.router
        .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
        .then(() => this.router.navigate(['list-schedule-admin'], toast)); */
        const p = await this.router.navigate(['RefrshComponent'], {
          skipLocationChange: true,
        });
        if (p) {
          this.router.navigate(['list-schedule-admin'], toast);
        }
      });
  }
  // START VER errores de horarios
  // checa adv horario
  async checkHoursAdviser(): Promise<boolean> {
    const adv = await this.advData();
    const promise = new Promise<boolean>((resolve, reject) => {
      try {
        if (
          this.schedule.hour < adv.hourStart ||
          this.schedule.hour > adv.hourEnd
        ) {
          // no puede a esa hora
          resolve(true);
        } else {
          // si puede
          resolve(false);
        }
        console.log(this.schedule);
      } catch (error) {
        // error
      }
    });
    const result = await promise;
    return result;
  }
  private async advData() {
    return await this.adviserService
      .getAdviserById(this.schedule.adviser)
      .toPromise();
  }

  //  ve errores de calendario
  async checkSchedule(): Promise<CheckSchedule> {
    return await this.scheduleService.checkSchedule(this.schedule).toPromise();
  }
  // END VER

  // START dialog
  async dialogs(checkAdv: boolean, type: 'edit' | 'new', user) {
    // checa adv
    let presentDialogAdv = false;
    let checkSchedule = true;
    let result = false;
    if (checkAdv) {
      presentDialogAdv = await this.checkHoursAdviser();
    }
    if (presentDialogAdv) {
      checkSchedule = await this.dialogAdv();
    }
    if (checkSchedule) {
      const check = await this.checkSchedule();
      const isOk = check.adviserCan && check.buyerCan && check.propertyCan;
      if (!isOk) {
        result = await this.dialogSchedule(check);
      } else {
        result = true;
      }
    }
    if (result) {
      if (type === 'new' && user === 'seller') {
        this.newScheduleSeller();
      } else if (type === 'edit' && user === 'seller') {
        this.editCustomerSeller();
      } else if (type === 'new' && user !== 'seller') {
        this.newSchedule();
      } else if (type === 'edit' && user !== 'seller') {
        this.editCustomer();
      }
    }
  }
  private async dialogSchedule(check): Promise<boolean> {
    let message;
    console.log(check);
    if (!check.propertyCan) {
      message = 'La propiedad elegida esta ocupada a esa hora';
    } else if (!check.buyerCan) {
      message = `El Cliente elegido esta ocupado a esa hora`;
    } else if (!check.adviserCan) {
      message = `El Asesor elegido esta ocupado a esa hora`;
    }
    const dialogRef = this.dialog.open(DialogGeneralComponent, {
      maxWidth: '50%',
      minWidth: '20%',
      data: {
        header: 'Advertencia',
        subHeader: 'Se empalman horarios',
        body: message,
        isform: false,
      },
    });
    const promise = new Promise<boolean>((resolve, reject) => {
      try {
        const sub = dialogRef.componentInstance.buttons.subscribe(res => {
          resolve(res);
        });
      } catch (error) {}
    });
    console.log(await promise);
    const result = await promise;
    return result;
  }

  async dialogAdv(): Promise<boolean> {
    const adv = await this.advData();
    const dialogRef = this.dialog.open(DialogGeneralComponent, {
      maxWidth: '50%',
      minWidth: '20%',
      data: {
        header: 'Advertencia',
        subHeader: 'El horario no coincide con el asesor',
        body: `El asesor <b>${adv.name}</b> tiene un horario de <b>${
          adv.hourStart
        }</b> a <b>${adv.hourEnd}</b>`,
        isform: false,
      },
    });
    const promise = new Promise<boolean>((resolve, reject) => {
      try {
        const sub = dialogRef.componentInstance.buttons.subscribe(res => {
          resolve(res);
        });
      } catch (error) {}
    });
    console.log(await promise);
    const result = await promise;
    return result;
  }
  // END dialog

  getDate(day, month, year) {
    return new Date(year, month, day);
  }
  // noti
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
      senderId: this.userSession.userSession.value.id,
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
  private notificationBySchedule(schedule: ISchedule) {
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
        [schedule.buyer._id, schedule.adviser._id],
      )
      .subscribe(() => {});
  }
  private deleteOneSignal(schedule) {
    /* const schedule = await this.scheduleService
      .getScheduleById(scheduleId)
      .toPromise(); */
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
  // _helpers
  getDate2(day, month, year) {
    const d = new Date(year, month, day);
    return FormatDatesFront(d);
  }
  formatHour(h, m) {
    return FormatHoursFront(h, m);
  }
}
