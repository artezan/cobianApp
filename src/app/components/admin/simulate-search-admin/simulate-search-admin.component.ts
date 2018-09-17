import { Component, OnInit } from '@angular/core';
import { IProperty } from '../../../models/property.model';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { PropertyService } from '../../../services/property.service';
import { CalcPercentage } from '../../../_config/_helpers';

@Component({
  selector: 'app-simulate-search-admin',
  templateUrl: './simulate-search-admin.component.html',
  styleUrls: ['./simulate-search-admin.component.scss'],
})
export class SimulateSearchAdminComponent implements OnInit {
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
  isSimulate = false;
  propertiesMatch: IProperty[] = [];
  percentage = 10;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertyService,
  ) {
    const arrStr = [''];
    this.property.tag = arrStr;
  }

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
  startSimulate() {
    this.isSimulate = false;
    console.log(this.property);
    this.property.dateToBuy = `${this.daySelect}/${this.monthSelect}/${
      this.yearSelect
    }`;
    console.log(this.property);
    this.propertyService
      .getPropertySimulate(this.property, this.percentage)
      .subscribe(properties => {
        this.propertiesMatch = CalcPercentage(
          this.property,
          properties,
          this.percentage,
        );
        this.isSimulate = true;
      });
  }
  reset() {
    this.isSimulate = false;
  }
  dateSelect(event) {
    if (event) {
      this.daySelect = event.value._i.date;
      this.monthSelect = event.value._i.month;
      this.yearSelect = event.value._i.year;
    }
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
