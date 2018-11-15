import { Component, OnInit } from '@angular/core';
import { IManager } from '../../../models/manager.model';
import { IUserSession } from '../../../models/userSession.model';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { OfficeService } from '../../../services/office.service';
import { UserSessionService } from '../../../services/user-session.service';
import { ManagersService } from '../../../services/managers.service';

@Component({
  selector: 'app-new-edit-manager',
  templateUrl: './new-edit-manager.component.html',
  styleUrls: ['./new-edit-manager.component.scss']
})
export class NewEditManagerComponent implements OnInit {
  hide = true;
  companyId: string;
  isNew = true;
  errorToShow = '';
  errorToShowMat = 'Dato obligatorio';
  manager: IManager = {};
  isLoad: boolean;
  user: IUserSession;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userSession: UserSessionService,
    private managerService: ManagersService
  ) {
    this.user = userSession.userSession.value;
    this.isLoad = false;
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.managerService.getManagerById(params['id']).subscribe(m => {
          console.log(m);
          this.manager = m;
          this.isLoad = true;
        });
        this.isNew = false;
      } else if (this.user && this.user.type === 'office') {
        this.managerService.getManagerById(this.user.id).subscribe(office => {
          this.manager = office;
          this.isLoad = true;
        });
        this.isNew = false;
      } else {
        this.isNew = true;
        this.isLoad = true;
      }
    });
  }

  ngOnInit() {}
  edit() {
    this.managerService.putManager(this.manager).subscribe(m => {
      const toast: NavigationExtras = {
        queryParams: { res: 'Gerente Editado' }
      };
      this.router
        .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
        .then(() => this.router.navigate(['list-manager-admin'], toast));
    });
  }
  add() {
    this.managerService.newManager(this.manager).subscribe(o => {
      // this.navCtr.navigateRoot('list-ofert-admin', true);
      const toast: NavigationExtras = {
        queryParams: { res: 'Gerente Creado' }
      };
      this.router
        .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
        .then(() => this.router.navigate(['list-manager-admin'], toast));
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
