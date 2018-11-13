import { Component, OnInit } from '@angular/core';
import { IGoal } from '../../../models/goal.model';
import { GoalService } from '../../../services/goal.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AdviserService } from '../../../services/adviser.service';
import { Observable } from 'rxjs/internal/Observable';
import { IAdviser } from '../../../models/adviser.model';
import { Platform } from '@ionic/angular';
import { UserSessionService } from '../../../services/user-session.service';
import { IUserSession } from '../../../models/userSession.model';
import { filter, map } from 'rxjs/operators';
import { INotification } from '../../../models/notification.model';
import { OnesignalService } from '../../../services/onesignal.service';
import { ISchedule } from '../../../models/schedule.model';
import { MatDialog } from '@angular/material/dialog';
import {
  SearchDialog,
  SearchSelectComponent,
} from '../../general/search-select/search-select.component';
import { FormatDatesFront } from '../../../_config/_helpers';
@Component({
  selector: 'app-new-edit-goal',
  templateUrl: './new-edit-goal.component.html',
  styleUrls: ['./new-edit-goal.component.scss'],
})
export class NewEditGoalComponent implements OnInit {
  hide = true;
  companyId: string;
  isNew = true;
  errorToShow = '';
  errorToShowMat = 'Dato obligatorio';
  goal: IGoal = {};
  files: string;
  isLoad: boolean;
  buyer = '';
  property = '';
  buyers;
  adviserSelect: IAdviser[] = [];
  advisers$: Observable<IAdviser[]>;
  isDesktop = false;
  arrList: string[] = [];
  numOfItems = 3;
  user: IUserSession;
  // noti
  yearNoti: number;
  monthNoti: number;
  dayNoti: number;
  hourNoti: number;
  minuteNoti: number;
  isSpinner: boolean;
  typeOfGoal = 'goals';
  typeOfGoalSale = 'salesTotal';
  typeOfGoalRent = 'rentTotal';
  typeOfGoalBoth = 'rentSalesTotal';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private goalService: GoalService,
    private adviserService: AdviserService,
    private platform: Platform,
    private userService: UserSessionService,
    private oneSignalService: OnesignalService,
    public dialog: MatDialog,
  ) {
    this.user = userService.userSession.value;
    this.isDesktop = platform.is('desktop');
    this.getAdviser();
    this.isLoad = false;
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        goalService.getGoaltById(params.id).subscribe(goal => {
          this.goal = goal;
          this.typeOfGoal = goal.typeOfGoal;
          this.typeOfGoalSale = goal.typeOfGoal;
          this.typeOfGoalRent = goal.typeOfGoal;
          this.typeOfGoalBoth = goal.typeOfGoal;
          if (goal.typeOfGoal === 'costOfRent') {
            this.typeOfGoal = 'rentTotal';
          } else if (goal.typeOfGoal === 'costOfSales') {
            this.typeOfGoal = 'salesTotal';
          } else if (goal.typeOfGoal === 'rentSalesCost') {
            this.typeOfGoal = 'rentSalesTotal';
          }
          if (goal.goals && goal.goals.length > 0) {
            this.arrList = goal.goals.map(g => g.nameGoal);
            this.numOfItems = this.arrList.length;
          }
        });
        this.isNew = false;
        this.isLoad = true;
      } else {
        this.isNew = true;
        this.isLoad = true;
      }
    });
  }

  ngOnInit() {}
  getAdviser() {
    if (this.user.type === 'adviser') {
      const adv: IAdviser = {
        _id: this.user.id,
      };
      this.adviserSelect = [adv];
    }
  }
  editGoal() {
    this.goal.notificationOneSignal = this.deleteOneSignal(this.goal);
    // adv
    this.adviserSelect.forEach(adv => {
      const findIndex = this.goal.adviser.findIndex(
        gadv => gadv._id === adv._id,
      );
      if (findIndex === -1) {
        this.adviserService.getAdviserById(adv._id).subscribe(a => {
          const arr = a.goal.map(g => g._id);
          arr.push(this.goal._id);
          a.goal = <any>arr;
          this.adviserService.putAdviser(a).subscribe(co => console.log('co'));
        });
      }
    });
    // goal
    this.getSet();
    this.goalService.putGoal(this.goal).subscribe(() => {
      this.notification(
        'Nueva Meta Actualizada',
        this.goal.isByManagement
          ? `Se ha actualizado una  meta grupal "${this.goal.title}"`
          : `Se ha actualizado una  meta individual "${this.goal.title}"`,
        this.goal.status,
        'goal',
        undefined,
        this.goal.adviser.map(a => a._id),
      );
      this.notificationBySchedule(this.goal);
      const toast: NavigationExtras = {
        queryParams: { res: 'Objetivo Editado' },
      };
      this.router
        .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
        .then(() => this.router.navigate(['list-goals-admin'], toast));
    });
  }

  newGoal() {
    this.getSet();
    this.goalService.newGoal(this.goal).subscribe(newGoal => {
      this.notification(
        'Nueva Meta Asignada',
        this.goal.isByManagement
          ? `Se ha creado una nueva meta grupal "${this.goal.title}"`
          : `Se ha creado una nueva meta individual "${this.goal.title}"`,
        this.goal.status,
        'goal',
        undefined,
        this.goal.adviser.map(a => a._id),
      );
      this.notificationBySchedule(newGoal);
      this.adviserSelect.forEach(adv => {
        this.adviserService.getAdviserById(adv._id).subscribe(a => {
          const arr = a.goal.map(g => g._id);
          arr.push(newGoal._id);
          a.goal = <any>arr;
          this.adviserService.putAdviser(a).subscribe(co => console.log('co'));
        });
      });
      const toast: NavigationExtras = {
        queryParams: { res: 'Objetivo Creado' },
      };
      this.router
        .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
        .then(() => this.router.navigate(['list-goals-admin'], toast));
    });
  }
  deleteAdviserOfGoal(adviserId: string) {
    const index = this.goal.adviser.findIndex(adv => adv._id === adviserId);
    this.goal.adviser.splice(index, 1);
    this.adviserService.getAdviserById(adviserId).subscribe(adv => {
      const indexAdv = adv.goal.findIndex(g => g._id === this.goal._id);
      adv.goal.splice(indexAdv, 1);
      this.adviserService.putAdviser(adv).subscribe(() => {
        console.log('ok');
      });
    });
  }
  dateSelect(event) {
    if (event) {
      this.goal.day = event.value._i.date;
      this.goal.month = event.value._i.month;
      this.goal.year = event.value._i.year;
    }
  }
  dateSelect2(event) {
    if (event) {
      this.dayNoti = event.value._i.date;
      this.monthNoti = event.value._i.month;
      this.yearNoti = event.value._i.year;
    }
  }
  private getSet() {
    // user
    const user = this.userService.userSession.value;
    if (user.type === 'administrator' || user.type === 'office') {
      this.goal.isByManagement = true;
    } else {
      this.goal.isByManagement = false;
    }
    // lista adv
    if (this.goal.adviser && this.goal.adviser.length > 0) {
      this.adviserSelect.forEach(adv => {
        const isFinded = this.goal.adviser.findIndex(
          gad => gad._id === adv._id,
        );
        if (isFinded === -1) {
          this.goal.adviser.push(adv);
        }
      });
    } else {
      this.goal.adviser = this.adviserSelect;
    }
    // lista str goals
    if (
      this.goal.typeOfGoal === 'goals' ||
      this.goal.typeOfGoal === undefined
    ) {
      this.goal.typeOfGoal = 'goals';
      if (this.goal.goals && this.goal.goals.length > 0) {
        const goals = [];
        this.arrList.forEach((nameGoal, i) => {
          goals.push({
            isComplete: this.goal.goals[i]
              ? this.goal.goals[i].isComplete
              : false,
            nameGoal: nameGoal,
          });
        });
        this.goal.goals = <any>goals;
        // nuevo
      } else if (this.arrList.length > 0) {
        const goals = [];
        this.arrList.forEach((nameGoal, i) => {
          goals.push({
            isComplete: false,
            nameGoal: nameGoal,
          });
        });
        this.goal.goals = <any>goals;
      }
    }
  }

  getDate(day, month, year) {
    return new Date(year, month, day);
  }
  getDateNoti(day, month, year) {
    return FormatDatesFront(new Date(year, month, day));
  }
  hourFormat(pmAm) {
    if (pmAm === 'pm' && this.hourNoti && this.hourNoti < 12) {
      this.hourNoti = this.hourNoti + 12;
    }
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
      senderId: this.userService.userSession.value.id,
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
  private notificationBySchedule(goal: IGoal) {
    const date = this.getDateNoti(goal.day, goal.month, goal.year);
    // onesignal
    this.oneSignalService
      .postOneSignalBySchedule(
        'Recordatorio de meta',
        `La meta "${goal.title}" esta por llegar a la fecha límite: ${date}`,
        new Date(
          this.yearNoti,
          this.monthNoti,
          this.dayNoti,
          this.hourNoti,
          this.minuteNoti,
        ),
        goal.isByManagement ? ['office', 'administrator'] : undefined,
        goal.adviser.map(a => a._id),
      )
      .subscribe(data => {
        if (!goal.notificationOneSignal) {
          goal.notificationOneSignal = [];
        }
        goal.notificationOneSignal.push(data.id);
        this.goalService.putGoal(goal).subscribe();
      });
  }
  private deleteOneSignal(goal: IGoal) {
    /* const schedule = await this.scheduleService
      .getScheduleById(scheduleId)
      .toPromise(); */
    if (goal.notificationOneSignal && goal.notificationOneSignal.length > 0) {
      goal.notificationOneSignal.forEach((idN, i) => {
        this.oneSignalService.deleteOneSignalSchedule(idN).subscribe();
      });
      return (goal.notificationOneSignal = []);
    }
  }
  // dialog
  public async searchAdv() {
    this.isSpinner = true;
    const adv = await this.adviserService
      .getAdviserAll()
      .pipe(
        map(arr =>
          arr.map((adviser: any) => {
            adviser.numOfBuyer = `Número de Clientes: ${adviser.buyer.length}`;
            adviser.range = `Disponible de ${adviser.hourStart} a ${
              adviser.hourEnd
            }`;
            return adviser;
          }),
        ),
      )
      .toPromise();
    this.isSpinner = false;
    const dialogRef = this.dialog.open(SearchSelectComponent, {
      /*  maxWidth: '50%',
      minWidth: '20%', */
      data: <SearchDialog>{
        header: 'Buscar asesor para objetivo, seleccione uno o varios',
        hideButtonCancel: true,
        okButton: 'OK',
        isMultiple: true,
        itemsIdDisable: this.isNew
          ? this.adviserSelect.map(a => a._id)
          : [
              ...this.goal.adviser.map(a => a._id),
              ...this.adviserSelect.map(a => a._id),
            ],
        filtersDetail: true,
        rows: adv,
        typeFilter: 'filter-adv',
        columns: [
          {
            name: 'Nombre',
            prop: 'name',
            type: 'normal',
          },
          {
            name: 'Apellido',
            prop: 'fatherLastName',
            type: 'normal',
          },
          {
            name: 'Fecha Alta',
            prop: 'timestamp',
            type: 'date',
          },
          {
            name: '# De Consumidores',
            prop: 'numOfBuyer',
            type: 'normal',
          },
          {
            name: 'Disponibilidad',
            prop: 'range',
            type: 'normal',
          },
        ],
      },
    });
    const sub = dialogRef.componentInstance.buttons.subscribe(res => {
      if (res.options) {
        this.adviserSelect = [...res.arrSelect, ...this.adviserSelect];
      }
    });
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
