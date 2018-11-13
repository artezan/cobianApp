import { Component, OnInit } from '@angular/core';
import { IBuild } from '../../../models/build.model';
import { IMaker } from '../../../models/maker.model';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { PropertyService } from '../../../services/property.service';
import { BuildService } from '../../../services/build.service';
import { MakerService } from '../../../services/maker.service';
import { FormStr } from '../../general/form-str-list/form-str-list.component';
import { INotification } from '../../../models/notification.model';
import { UserSessionService } from '../../../services/user-session.service';
import { OnesignalService } from '../../../services/onesignal.service';
import { FormatDatesFront } from '../../../_config/_helpers';
import { MatDialog } from '@angular/material/dialog';
import {
  SearchSelectComponent,
  SearchDialog,
} from '../../general/search-select/search-select.component';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-new-edit-build',
  templateUrl: './new-edit-build.component.html',
  styleUrls: ['./new-edit-build.component.scss'],
})
export class NewEditBuildComponent implements OnInit {
  hide = true;
  companyId: string;
  isNew = true;
  errorToShow = '';
  errorToShowMat = 'Dato obligatorio';
  build: IBuild = {};
  makers: IMaker[];
  maker;
  forms = {
    arrStr: true,
    arrStr2: true,
    arrDate: true,
    arrDate2: true,
  };
  arrStr = [];
  arrStr2 = [];
  arrDate = [];
  arrDate2 = [];
  isDesktop: any;
  isPhasesValid = false;
  isSpinner: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private buildService: BuildService,
    private makerService: MakerService,
    private platform: Platform,
    private userSessionService: UserSessionService,
    private oneSignalService: OnesignalService,
    public dialog: MatDialog,
  ) {
    this.isDesktop = platform.is('desktop');
  }

  ngOnInit() {
    this.getMakers();
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.buildService.getBuildById(params['id']).subscribe(build => {
          this.maker = build.maker.map(m => m._id);
          this.build = build;
          console.log(build);
          // generar arr inputs
          // arrStr
          this.arrStr = build.timeLine.map(tl => tl.namePhase);
          this.arrStr2 = build.timeLine.map(tl => tl.notes);
          this.arrDate = build.timeLine.map(
            tl => new Date(tl.yearToStart, tl.monthToStart, tl.dayToStart),
          );
          this.arrDate2 = build.timeLine.map(
            tl => new Date(tl.yearToEnd, tl.monthToEnd, tl.dayToEnd),
          );
        });
        this.isNew = false;
      } else {
        this.build.timeLine = [{}];
        this.isNew = true;
      }
    });
  }
  getMakers() {
    this.makerService.getMakerAll().subscribe(m => {
      console.log(m);
      this.makers = m;
    });
  }
  getPhases(phases: FormStr) {
    this.isPhasesValid = phases.isValid;
    phases.arrStr.forEach((str, i) => {
      const phaseObj = {
        namePhase: str,
        notes: phases.arrStr2[i],
        dayToStart: phases.arrDate[i] ? phases.arrDate[i].getDate() : undefined,
        monthToStart: phases.arrDate[i]
          ? phases.arrDate[i].getMonth()
          : undefined,
        yearToStart: phases.arrDate[i]
          ? phases.arrDate[i].getFullYear()
          : undefined,
        dayToEnd: phases.arrDate2[i] ? phases.arrDate2[i].getDate() : undefined,
        monthToEnd: phases.arrDate2[i]
          ? phases.arrDate2[i].getMonth()
          : undefined,
        yearToEnd: phases.arrDate2[i]
          ? phases.arrDate2[i].getFullYear()
          : undefined,
      };
      if (this.build && this.build.timeLine && this.build.timeLine[i]) {
        this.build.timeLine[i] = phaseObj;
      } else {
        this.build.timeLine.push(phaseObj);
      }
    });
  }
  newCustomer() {
    this.build.maker = this.maker;
    this.buildService.newBuild(this.build).subscribe(b => {
      this.notification(
        'Nueva Obra',
        `Se le ha asignado: ${this.build.name}`,
        'verde',
        'build',
        undefined,
        <any>b.maker,
      );
      b.timeLine.forEach(tm => {
        this.notificationBySchedule(tm, b.name, b);
      });

      b.maker.forEach(m => {
        console.log(m);
        const maker = { _id: m, build: b };
        this.makerService.putMaker(<any>maker).subscribe(() => {});
      });
      const toast: NavigationExtras = {
        queryParams: { res: 'Nuevo Obra Agregada' },
      };
      this.router
        .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
        .then(() => this.router.navigate(['list-build-admin'], toast));
    });
  }
  editCustomer() {
    this.build.notificationOneSignal = this.deleteOneSignal(this.build);
    this.setMakers();
    // this.build.maker = this.maker;
    this.buildService.putBuild(this.build).subscribe(() => {
      const toast: NavigationExtras = {
        queryParams: { res: ' Obra Editada' },
      };
      this.router
        .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
        .then(() => this.router.navigate(['list-build-admin'], toast));
    });
  }
  setMakers() {
    // noti
    this.notification(
      'Asignación de Obra',
      `Se le ha asignado: ${this.build.name}`,
      'verde',
      'build',
      undefined,
      <any>this.maker,
    );
    this.maker.forEach(element => {
      const indexFinded = this.build.maker.findIndex(m => m._id === element);
      if (indexFinded === -1) {
        this.build.maker.push(element);
        const maker = { _id: element, build: this.build };
        this.makerService.putMaker(maker).subscribe(() => console.log('add'));
      }
    });
  }
  // dialog
  public async searchBuyers() {
    this.isSpinner = true;
    const makers: any = await this.makerService
      .getMakerAll()
      .pipe(
        map(arr =>
          arr.map((maker: any) => {
            if (maker.build) {
              maker.buildName = <any>maker.build.name;
            } else {
              maker.buildName = <any>'';
            }
            return maker;
          }),
        ),
      )
      .toPromise();
    console.log(makers);
    this.isSpinner = false;
    const dialogRef = this.dialog.open(SearchSelectComponent, {
      /*  maxWidth: '50%',
        minWidth: '20%', */
      data: <SearchDialog>{
        header:
          'Buscar constructores para asignarle una obra, seleccione uno o varios',
        hideButtonCancel: true,
        okButton: 'OK',
        isMultiple: true,
        filtersDetail: false,
        itemsIdDisable: makers.filter(m => m.buildName !== '').map(m => m._id),
        rows: makers,
        typeFilter: 'filter-makers',
        columns: [
          {
            name: 'Nombre',
            prop: 'name',
            type: 'normal',
          },
          {
            name: 'Apellido',
            prop: 'lastName',
            type: 'normal',
          },
          {
            name: 'Fecha Alta',
            prop: 'timestamp',
            type: 'date',
          },
          {
            name: 'Obra',
            prop: 'buildName',
            type: 'normal',
          },
        ],
      },
    });
    const sub = dialogRef.componentInstance.buttons.subscribe(res => {
      if (res.options) {
        this.maker = res.arrSelect.map(r => r._id);
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
  private notificationBySchedule(timeLine, buildName, build: IBuild) {
    const date = this.getDate(
      timeLine.dayToEnd,
      timeLine.monthToEnd,
      timeLine.yearToEnd,
    );
    // onesignal
    this.oneSignalService
      .postOneSignalBySchedule(
        'Recordatorio de Fase',
        `La fase "${
          timeLine.namePhase
        }" de la obra ${buildName} llegó a la fecha límite: ${date}`,
        new Date(
          timeLine.yearToEnd,
          timeLine.monthToEnd,
          timeLine.dayToEnd,
          10,
          40,
        ),
        ['office', 'administrator'],
        build.maker === undefined ? undefined : build.maker.map(m => m._id),
      )
      .subscribe(data => {
        if (!build.notificationOneSignal) {
          build.notificationOneSignal = [];
        }
        build.notificationOneSignal.push(data.id);
        this.buildService.putBuild(build).subscribe();
      });
  }
  private deleteOneSignal(build: IBuild) {
    /* const schedule = await this.scheduleService
      .getScheduleById(scheduleId)
      .toPromise(); */
    if (build.notificationOneSignal && build.notificationOneSignal.length > 0) {
      build.notificationOneSignal.forEach((idN, i) => {
        this.oneSignalService.deleteOneSignalSchedule(idN).subscribe();
      });
      return (build.notificationOneSignal = []);
    }
  }
  getDate(day, month, year) {
    return FormatDatesFront(new Date(year, month, day));
  }
}
