import { Component, OnInit } from '@angular/core';
import { IBuild } from '../../../models/build.model';
import { IMaker } from '../../../models/maker.model';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { PropertyService } from '../../../services/property.service';
import { BuildService } from '../../../services/build.service';
import { MakerService } from '../../../services/maker.service';

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
  makers;
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
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private buildService: BuildService,
    private makerService: MakerService,
    private platform: Platform,
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
        this.isNew = true;
      }
    });
  }
  getMakers() {
    this.makerService.getMakerAll().subscribe(m => {
      this.makers = m;
    });
  }
  getPhases(phases) {
    console.log(phases);
  }
  newCustomer() {
    this.buildService.newBuild(this.build).subscribe(b => {
      const toast: NavigationExtras = {
        queryParams: { res: 'Nuevo Obra Agregada' },
      };
      this.router
        .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
        .then(() => this.router.navigate(['list-build-admin'], toast));
    });
  }
  editCustomer() {
    this.buildService.putBuild(this.build).subscribe(() => {
      const toast: NavigationExtras = {
        queryParams: { res: ' Obra Editada' },
      };
      /**
       * Es para recargar el componente previo
       */
      this.router
        .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
        .then(() => this.router.navigate(['list-build-admin'], toast));
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
