import { Component, OnInit } from '@angular/core';
import { IBuild } from '../../../models/build.model';
import { IMaker } from '../../../models/maker.model';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { PropertyService } from '../../../services/property.service';
import { BuildService } from '../../../services/build.service';
import { MakerService } from '../../../services/maker.service';
import { FormStr } from '../../general/form-str-list/form-str-list.component';

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
    console.log('new');

    this.build.maker = this.maker;
    this.buildService.newBuild(this.build).subscribe(b => {
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
    this.maker.forEach(element => {
      const indexFinded = this.build.maker.findIndex(m => m._id === element);
      if (indexFinded === -1) {
        this.build.maker.push(element);
        const maker = { _id: element, build: this.build };
        this.makerService.putMaker(maker).subscribe(() => console.log('add'));
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
}
