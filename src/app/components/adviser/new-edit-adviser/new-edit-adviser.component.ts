import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { IAdviser } from '../../../models/adviser.model';
import { AdviserService } from '../../../services/adviser.service';

@Component({
  selector: 'app-new-edit-adviser',
  templateUrl: './new-edit-adviser.component.html',
  styleUrls: ['./new-edit-adviser.component.scss'],
})
export class NewEditAdviserComponent implements OnInit {
  hide = true;
  companyId: string;
  isNew = true;
  errorToShow = '';
  errorToShowMat = 'Dato obligatorio';
  adviser: IAdviser = {};
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adviserService: AdviserService,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.adviserService.getAdviserById(params['id']).subscribe(adv => {
          this.adviser = adv;
        });
        this.isNew = false;
      } else {
        this.isNew = true;
      }
    });
  }
  newCustomer() {
    console.log(this.adviser);
    this.adviserService.newAdviser(this.adviser).subscribe(adv => {
      const toast: NavigationExtras = {
        queryParams: { res: 'Nuevo Asesor Agregado' },
      };
      this.router.navigate(['list-adviser-admin'], toast);
    });
  }
  editCustomer() {
    console.log(this.adviser);

    this.adviserService.putAdviser(this.adviser).subscribe(() => {
      const toast: NavigationExtras = {
        queryParams: { res: ' Asesor Editado' },
      };
      this.router.navigate(['list-adviser-admin'], toast);
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
