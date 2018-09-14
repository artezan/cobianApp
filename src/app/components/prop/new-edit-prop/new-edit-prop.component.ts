import { Component, OnInit } from '@angular/core';
import { IProperty } from '../../../models/property.model';
import { PropertyService } from '../../../services/property.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-new-edit-prop',
  templateUrl: './new-edit-prop.component.html',
  styleUrls: ['./new-edit-prop.component.scss'],
})
export class NewEditPropComponent implements OnInit {
  months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  companyId: string;
  isNew = true;
  errorToShow = '';
  errorToShowMat = 'Dato obligatorio';
  property: IProperty = {};
  words: string;
  files: string;
  daySelect: any;
  monthSelect: any;
  yearSelect: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertyService,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.propertyService.getPropertyById(params['id']).subscribe(prop => {
          console.log(prop);
          this.property = prop;
          this.words = '';
          this.property.tag.forEach((word, i) => {
            if (this.property.tag.length === i + 1) {
              this.words += word;
            } else {
              this.words += word + ',';
            }
          });
          this.files = '';
          this.property.files.forEach((f, i) => {
            if (this.property.files.length === i + 1) {
              this.files += f;
            } else {
              this.files += f + ',';
            }
          });
          const date = this.property.dateToBuy.split('/');
          this.daySelect = +date[0];
          this.monthSelect = +date[1];
          this.yearSelect = +date[2];
        });
        this.isNew = false;
      } else {
        this.isNew = true;
      }
    });
  }
  newCustomer() {
    console.log(this.property);
    console.log(this.words.split(','));
    console.log(this.files.split(','));
    if (this.words) {
      this.property.tag = this.words.split(',');
    }
    if (this.files) {
      this.property.files = this.files.split(',');
    }
    this.property.dateToBuy = `${this.daySelect}/${this.monthSelect}/${
      this.yearSelect
    }`;
    console.log(this.property);
    this.propertyService.newProperty(this.property).subscribe(prop => {
      const toast: NavigationExtras = {
        queryParams: { res: 'Nuevo Propiedad Agregada' },
      };
      // this.router.navigate(['list-prop-admin'], toast);
      /**
       * Es para recargar el componente previo
       */
      this.router
        .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
        .then(() => this.router.navigate(['list-prop-admin'], toast));
    });
  }
  editCustomer() {
    if (this.words) {
      this.property.tag = this.words.split(',');
    }
    if (this.files) {
      this.property.files = this.files.split(',');
    }
    this.property.dateToBuy = `${this.daySelect}/${this.monthSelect}/${
      this.yearSelect
    }`;
    this.propertyService.putProperty(this.property).subscribe(prop => {
      const toast: NavigationExtras = {
        queryParams: { res: 'Propiedad Editada' },
      };
      // this.router.navigate(['list-prop-admin'], toast);
      /**
       * Es para recargar el componente previo
       */
      this.router
        .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
        .then(() => this.router.navigate(['list-prop-admin'], toast));
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
