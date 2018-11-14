import { Component, OnInit } from '@angular/core';
import { IPreBuyer } from '../../models/preBuyer';
import { IPreBuild } from '../../models/preBuild';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UserSessionService } from '../../services/user-session.service';
import { OnesignalService } from '../../services/onesignal.service';
import { INotification } from '../../models/notification.model';
import { PreBuyerService } from '../../services/pre-buyer.service';
import { PreBuildService } from '../../services/pre-build.service';

@Component({
  selector: 'app-pre-buyer',
  templateUrl: './pre-buyer.component.html',
  styleUrls: ['./pre-buyer.component.scss']
})
export class PreBuyerComponent implements OnInit {
  isLoad = false;
  hide = true;
  companyId: string;
  isNew = true;
  errorToShow = '';
  errorToShowMat = 'Dato obligatorio';
  preBuyer: IPreBuyer = {};
  buildings: IPreBuild[];
  oldBuild: IPreBuild[] = [];
  flag = false;
  pre: string[] = [];
  a;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userSessionService: UserSessionService,
    private oneSignalService: OnesignalService,
    private prebuyerService: PreBuyerService,
    private prebuildrService: PreBuildService
  ) {}

  ngOnInit() {
    this.isLoad = false;
    this.getBuild();
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.prebuyerService.getBuyerById(params['id']).subscribe(b => {
          this.preBuyer = b;
          this.oldBuild = b.preBuild;
          this.pre = b.preBuild.map(p => p._id);
          console.log(this.pre);
          if (b.preBuild) {
          } else {
          }
          console.log(b);
          this.isLoad = true;
        });
        this.isNew = false;
      } else {
        this.isNew = true;
        this.isLoad = true;
      }
    });
  }
  getBuild() {
    this.prebuildrService.getAll().subscribe(b => {
      console.log(b);
      this.buildings = b;
    });
  }
  newCustomer() {
    this.preBuyer.preBuild = <any>this.pre;
    this.prebuyerService.newBuyer(this.preBuyer).subscribe(b => {
      if (b.preBuild.length > 0) {
        b.preBuild.forEach(build => {
          this.prebuildrService.getBuildById(<any>build).subscribe(prebuild => {
            const findIndex = prebuild.preBuyer.findIndex(
              m => m._id === this.preBuyer._id
            );
            if (findIndex === -1) {
              prebuild.preBuyer.push(b);
              this.prebuildrService.putBuild(prebuild).subscribe(() => {
                this.notification(
                  'Nueva Preventa',
                  `Se le ha asignado: ${prebuild.name}`,
                  'verde',
                  'build',
                  undefined,
                  [this.preBuyer._id]
                );
              });
            }
          });
        });
        const toast: NavigationExtras = {
          queryParams: { res: 'Nuevo Usuario Agregado' }
        };

        this.router
          .navigateByUrl('/RefrshComponent', {
            skipLocationChange: true
          })
          .then(() => this.router.navigate(['list-prebuyer-admin'], toast));
      } else {
        const toast: NavigationExtras = {
          queryParams: { res: 'Nuevo Usuario Agregado' }
        };
        this.router
          .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
          .then(() => this.router.navigate(['list-prebuyer-admin'], toast));
      }
    });
  }
  editCustomer() {
    if (this.flag) {
      // borrar
      this.oldBuild
        .filter(ob => !this.pre.some(id => id === ob._id))
        .forEach(build => this.deleteBuilds(build));
      // agregar
      this.pre
        .filter(id => !this.oldBuild.some(ob => ob._id === id))
        .forEach(async id => {
          console.log(id);
          // buscar ids
          this.addBuilds(await this.getPreBuildById(id));
          this.notification(
            'Nueva Usuario',
            `Se le ha asignado nueva obra`,
            'verde',
            'build',
            undefined,
            [this.preBuyer._id]
          );
        });
    }
    this.putMaker();
  }
  private putMaker() {
    this.preBuyer.preBuild = <any>this.pre;
    this.prebuyerService.putBuyer(this.preBuyer).subscribe(() => {
      const toast: NavigationExtras = {
        queryParams: { res: ' Usuario Editado' }
      };
      this.router
        .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
        .then(() => this.router.navigate(['list-prebuyer-admin'], toast));
    });
  }
  private deleteBuilds(build: IPreBuild) {
    const index = build.preBuyer.findIndex(p => p === this.preBuyer._id);
    if (index !== -1) {
      build.preBuyer.splice(index, 1);
      this.prebuildrService.putBuild(build).subscribe();
    }
  }
  private async getPreBuildById(id: string) {
    return await this.prebuildrService.getBuildById(id).toPromise();
  }
  private addBuilds(build: IPreBuild) {
    console.log(build);

    const index = build.preBuyer.findIndex(p => p._id === this.preBuyer._id);
    if (index === -1) {
      build.preBuyer.push(this.preBuyer);
    }
    this.prebuildrService.putBuild(build).subscribe();
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
