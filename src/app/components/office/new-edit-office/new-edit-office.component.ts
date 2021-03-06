import { Component, OnInit } from '@angular/core';
import { IOffice } from '../../../models/office.model';
import { OfficeService } from '../../../services/office.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { UserSessionService } from '../../../services/user-session.service';
import { IUserSession } from '../../../models/userSession.model';
import { SubManagerService } from '../../../services/sub-manager.service';

@Component({
  selector: 'app-new-edit-office',
  templateUrl: './new-edit-office.component.html',
  styleUrls: ['./new-edit-office.component.scss'],
})
export class NewEditOfficeComponent implements OnInit {
  hide = true;
  companyId: string;
  isNew = true;
  errorToShow = '';
  errorToShowMat = 'Dato obligatorio';
  office: IOffice = {};
  files: string;
  isLoad: boolean;
  user: IUserSession;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private officeService: OfficeService,
    private userSession: UserSessionService,
    private subManager: SubManagerService,
  ) {
    this.user = userSession.userSession.value;
    this.isLoad = false;
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.officeService.getOfficeById(params['id']).subscribe(office => {
          this.office = office;
          this.isLoad = true;
        });
        this.isNew = false;
      } else if (this.user && this.user.type === 'office') {
        this.officeService
          .getOfficeById(this.user.id)
          .subscribe(async office => {
            if (office === null) {
              const isSub = await subManager
                .getManagerById(this.user.id)
                .toPromise();
              if (isSub === null) {
                const q: NavigationExtras = {
                  queryParams: { id: params['id'] },
                };
                this.router.navigate(['new-edit-manager'], q);
              } else {
                const q: NavigationExtras = {
                  queryParams: { id: this.user.id },
                };
                this.router.navigate(['new-edit-submanager'], q);
              }
            } else {
              this.office = office;
              this.isLoad = true;
            }
          });
        this.isNew = false;
      } else {
        this.isNew = true;
        this.isLoad = true;
      }
    });
  }

  ngOnInit() {}
  editOfert() {
    this.officeService.putOffice(this.office).subscribe(office => {
      const toast: NavigationExtras = {
        queryParams: { res: 'Oficinista Editado' },
      };
      // this.router.navigate(['list-credit-admin'], toast);
      // this.navCtr.navigateRoot('list-ofert-admin', true, toast);
      /**
       * Es para recargar el componente previo
       */
      this.router
        .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
        .then(() => this.router.navigate(['list-office-admin'], toast));
    });
  }
  newOfert() {
    this.officeService.newOffice(this.office).subscribe(o => {
      // this.navCtr.navigateRoot('list-ofert-admin', true);
      const toast: NavigationExtras = {
        queryParams: { res: 'Oficinista Creado' },
      };
      this.router
        .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
        .then(() => this.router.navigate(['list-office-admin'], toast));
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
