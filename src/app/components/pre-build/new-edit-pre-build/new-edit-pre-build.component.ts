import { Component, OnInit } from '@angular/core';
import { IPreBuild } from '../../../models/preBuild';
import { IPreBuyer } from '../../../models/preBuyer';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Platform } from '@ionic/angular';
import { UserSessionService } from '../../../services/user-session.service';
import { OnesignalService } from '../../../services/onesignal.service';
import { MatDialog } from '@angular/material';
import { FormStr } from '../../general/form-str-list/form-str-list.component';
import { map } from 'rxjs/operators';
import {
  SearchSelectComponent,
  SearchDialog
} from '../../general/search-select/search-select.component';
import { INotification } from '../../../models/notification.model';
import { FormatDatesFront } from '../../../_config/_helpers';
import { PreBuyerService } from '../../../services/pre-buyer.service';
import { PreBuildService } from '../../../services/pre-build.service';

@Component({
  selector: 'app-new-edit-pre-build',
  templateUrl: './new-edit-pre-build.component.html',
  styleUrls: ['./new-edit-pre-build.component.scss']
})
export class NewEditPreBuildComponent implements OnInit {
  hide = true;
  companyId: string;
  isNew = true;
  errorToShow = '';
  errorToShowMat = 'Dato obligatorio';
  preBuild: IPreBuild = {};
  preBuyer: IPreBuyer[];
  forms = {
    arrStr: true,
    arrStr2: true,
    arrDate: true,
    arrDate2: true
  };
  arrStr = [];
  arrStr2 = [];
  arrDate = [];
  arrDate2 = [];
  isDesktop: any;
  isPhasesValid = false;
  isSpinner: boolean;
  pre: string[];
  preBuyerForSelect: IPreBuyer[];
  oldPreBuyers: IPreBuyer[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private platform: Platform,
    private userSessionService: UserSessionService,
    private oneSignalService: OnesignalService,
    public dialog: MatDialog,
    private preBuyerService: PreBuyerService,
    private preBuildService: PreBuildService
  ) {
    this.isDesktop = platform.is('desktop');
  }

  ngOnInit() {
    this.getPreBuyers();
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.preBuildService.getBuildById(params['id']).subscribe(build => {
          this.pre = build.preBuyer.map(m => m._id);
          this.preBuild = build;
          this.oldPreBuyers = build.preBuyer;
          console.log(build);
          // generar arr inputs
          // arrStr
          this.arrStr = build.timeLine.map(tl => tl.namePhase);
          this.arrStr2 = build.timeLine.map(tl => tl.notes);
          this.arrDate = build.timeLine.map(
            tl => new Date(tl.yearToStart, tl.monthToStart, tl.dayToStart)
          );
          this.arrDate2 = build.timeLine.map(
            tl => new Date(tl.yearToEnd, tl.monthToEnd, tl.dayToEnd)
          );
        });
        this.isNew = false;
      } else {
        this.preBuild.timeLine = [{}];
        this.isNew = true;
      }
    });
  }
  getPreBuyers() {
    this.preBuyerService.getAll().subscribe(m => {
      console.log(m);
      this.preBuyerForSelect = m;
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
          : undefined
      };
      if (
        this.preBuild &&
        this.preBuild.timeLine &&
        this.preBuild.timeLine[i]
      ) {
        this.preBuild.timeLine[i] = phaseObj;
      } else {
        this.preBuild.timeLine.push(phaseObj);
      }
    });
  }
  newCustomer() {
    this.preBuild.preBuyer = <any>this.pre;
    this.preBuildService.newBuild(this.preBuild).subscribe(b => {
      if (b.preBuyer.length > 0) {
        this.notification(
          'Nueva Preventa',
          `Se le ha asignado: ${this.preBuild.name}`,
          'verde',
          'build',
          undefined,
          <any>b.preBuyer.map(pb => pb._id)
        );
        if (b.preBuyer.length > 0) {
          b.preBuyer.forEach(async buyer => {
            this.addPrebuildToByer(await this.getPreBuyerId(buyer), b._id);
          });
        }
      }

      /* b.timeLine.forEach(tm => {
        this.notificationBySchedule(tm, b.name, b);
      }); */

      const toast: NavigationExtras = {
        queryParams: { res: 'Nuevo Obra Agregada' }
      };
      this.router
        .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
        .then(() => this.router.navigate(['list-prebuild-admin'], toast));
    });
  }
  editCustomer() {
    // this.preBuild.notificationOneSignal = this.deleteOneSignal(this.preBuild);
    this.oldPreBuyers
      .filter(op => !this.pre.some(id => id === op._id))
      .forEach(buyer => this.deleteBuyers(buyer));
    this.pre
      .filter(id => !this.oldPreBuyers.some(ob => ob._id === id))
      .forEach(async id => {
        this.addPrebuildToByer(await this.getPreBuyerId(id), this.preBuild._id);
      });

    this.preBuild.preBuyer = <any>this.pre;
    this.preBuildService.putBuild(this.preBuild).subscribe(() => {
      const toast: NavigationExtras = {
        queryParams: { res: 'Obra Editada' }
      };
      this.router
        .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
        .then(() => this.router.navigate(['list-prebuild-admin'], toast));
    });
  }
  addPrebuildToByer(buyer: IPreBuyer, prebuildid: string) {
    console.log(buyer);
    const index = buyer.preBuild.findIndex(pb => pb._id === prebuildid);
    if (index === -1) {
      buyer.preBuild.push(<any>prebuildid);
      this.preBuyerService.putBuyer(buyer).subscribe();
    }
  }
  async getPreBuyerId(id) {
    return await this.preBuyerService.getBuyerById(id).toPromise();
  }
  private deleteBuyers(buyer: IPreBuyer) {
    const index = buyer.preBuild.findIndex(p => p._id === this.preBuild._id);
    if (index !== -1) {
      buyer.preBuild.splice(index, 1);
      this.preBuyerService.putBuyer(buyer).subscribe();
    }
  }
  // dialog
  public async searchBuyers() {
    this.isSpinner = true;
    const makers: IPreBuyer[] = await this.preBuyerService
      .getAll()
      /*  .pipe(
        map(arr =>
          arr.map((maker: any) => {
            if (maker.build) {
              maker.buildName = <any>maker.build.name;
            } else {
              maker.buildName = <any>'';
            }
            return maker;
          })
        )
      ) */
      .toPromise();
    console.log(makers);
    this.isSpinner = false;
    const dialogRef = this.dialog.open(SearchSelectComponent, {
      data: <SearchDialog>{
        header: 'Buscar Usuarios',
        hideButtonCancel: true,
        okButton: 'OK',
        isMultiple: true,
        filtersDetail: false,
        rows: makers,
        selectedItems: makers.map(b => b._id),
        columns: [
          {
            name: 'Nombre',
            prop: 'name',
            type: 'normal'
          },
          {
            name: 'Apellido',
            prop: 'lastName',
            type: 'normal'
          },
          {
            name: 'Fecha Alta',
            prop: 'timestamp',
            type: 'date'
          },
          {
            name: 'Obra',
            prop: 'buildName',
            type: 'normal'
          }
        ]
      }
    });
    const sub = dialogRef.componentInstance.buttons.subscribe(res => {
      console.log(res);
      if (res.options) {
        this.pre = res.arrSelect.map(r => r._id);
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
    receiversId: string[]
  ) {
    // notificacion
    const notification: INotification = {
      title: title,
      message: message,
      tags: tags,
      receiversId: receiversId,
      senderId: this.userSessionService.userSession.value.id,
      status: status,
      type: type
    };
    // onesignal
    this.oneSignalService
      .postOneSignalByTag(notification.title, message, tags, receiversId)
      .subscribe(() => {
        // guardar noti
        this.oneSignalService.newNotification(notification).subscribe();
      });
  }
  /*   private notificationBySchedule(timeLine, buildName, build: IPreBuild) {
    const date = this.getDate(
      timeLine.dayToEnd,
      timeLine.monthToEnd,
      timeLine.yearToEnd
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
          40
        ),
        ['office', 'administrator'],
        build.maker === undefined ? undefined : build.maker.map(m => m._id)
      )
      .subscribe(data => {
        if (!build.notificationOneSignal) {
          build.notificationOneSignal = [];
        }
        build.notificationOneSignal.push(data.id);
        this.buildService.putBuild(build).subscribe();
      });
  } */
  private deleteOneSignal(build: IPreBuild) {
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
