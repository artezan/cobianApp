import { Component, OnInit } from '@angular/core';
import { IMaker } from '../../../models/maker.model';
import { IBuild } from '../../../models/build.model';
import { Observable } from 'rxjs/internal/Observable';
import { BuildService } from '../../../services/build.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { SellerService } from '../../../services/seller.service';
import { NavController } from '@ionic/angular';
import { MakerService } from '../../../services/maker.service';
import { INotification } from '../../../models/notification.model';
import { UserSessionService } from '../../../services/user-session.service';
import { OnesignalService } from '../../../services/onesignal.service';

@Component({
  selector: 'app-new-edit-maker',
  templateUrl: './new-edit-maker.component.html',
  styleUrls: ['./new-edit-maker.component.scss'],
})
export class NewEditMakerComponent implements OnInit {
  isLoad = false;
  hide = true;
  companyId: string;
  isNew = true;
  errorToShow = '';
  errorToShowMat = 'Dato obligatorio';
  maker: IMaker = {};
  buildings$: Observable<IBuild[]>;
  oldBuild;
  flag = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navCtr: NavController,
    private buildService: BuildService,
    private makerService: MakerService,
    private userSessionService: UserSessionService,
    private oneSignalService: OnesignalService,
  ) {}

  ngOnInit() {
    this.isLoad = false;
    this.getBuild();
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.makerService.getMakerById(params['id']).subscribe(m => {
          this.maker = m;
          if (m.build) {
            this.oldBuild = m.build._id;
          } else {
            const obj = { _id: '' };
            this.maker.build = obj;
          }
          console.log(m);
          this.isLoad = true;
        });
        this.isNew = false;
      } else {
        const obj = { _id: '' };
        this.maker.build = obj;
        this.isNew = true;
        this.isLoad = true;
      }
    });
  }
  getBuild() {
    this.buildings$ = this.buildService.getBuildAll();
  }
  newCustomer() {
    this.makerService.newMaker(this.maker).subscribe(s => {
      // add
      this.buildService.getBuildById(this.maker.build._id).subscribe(build => {
        const findIndex = build.maker.findIndex(m => m._id === this.maker._id);
        if (findIndex === -1) {
          build.maker.push(s);
          this.buildService.putBuild(build).subscribe(() => {
            this.notification(
              'Nueva Obra',
              `Se le ha asignado: ${build.name}`,
              'verde',
              'build',
              undefined,
              [this.maker._id],
            );
            console.log('add');
            const toast: NavigationExtras = {
              queryParams: { res: 'Nuevo Cosntructor Agregado' },
            };
            // this.router.navigate(['list-seller-admin'], toast);
            this.router
              .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
              .then(() => this.router.navigate(['list-maker-admin'], toast));
          });
        }
      });
    });
  }
  editCustomer() {
    console.log(this.oldBuild);
    console.log(this.maker.build._id);
    if (this.oldBuild && this.oldBuild !== this.maker.build._id) {
      console.log('a');
      // add
      this.buildService.getBuildById(this.maker.build._id).subscribe(build => {
        const findIndex = build.maker.findIndex(m => m._id === this.maker._id);
        if (findIndex === -1) {
          build.maker.push(this.maker);
          this.buildService.putBuild(build).subscribe(() => {
            this.notification(
              'Nueva Obra',
              `Se le ha asignado: ${build.name}`,
              'verde',
              'build',
              undefined,
              [this.maker._id],
            );
            console.log('add');
          });
        }
      });
      // remove
      this.buildService.getBuildById(this.oldBuild).subscribe(build => {
        const findIndex = build.maker.findIndex(m => m._id === this.maker._id);
        build.maker.splice(findIndex, 1);
        this.buildService.putBuild(build).subscribe(() => {
          console.log('remove');
          this.putMaker();
        });
      });
    } else {
      //
      this.notification(
        'Nueva Obra',
        `Se le ha asignado nueva obra`,
        'verde',
        'build',
        undefined,
        [this.maker._id],
      );
      this.putMaker();
    }
  }
  private putMaker() {
    this.makerService.putMaker(this.maker).subscribe(() => {
      const toast: NavigationExtras = {
        queryParams: { res: ' Constructor Editado' },
      };
      this.router
        .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
        .then(() => this.router.navigate(['list-maker-admin'], toast));
    });
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

/* this.buildService.putBuild(this.oldBuild).subscribe(() => {
          console.log('remove');
          resolve(true);
        }); */

/* this.buildService.getBuildById(builId).subscribe(build => {
          const findIndex = build.maker.findIndex(m => m._id === makerId);
          if (findIndex === -1) {
            build.maker.push(makerId);
            this.buildService.putBuild(build).subscribe(() => {
              resolve(true);
            });
          }
        }); */
