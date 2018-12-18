import { Component, OnInit } from '@angular/core';
import { IFatherPre } from '../../../../models/fatherPreBuild.model';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { PreBuildService } from '../../../../services/pre-build.service';
import { IPreBuild } from '../../../../models/preBuild';

@Component({
  selector: 'app-new-edit-father',
  templateUrl: './new-edit-father.component.html',
  styleUrls: ['./new-edit-father.component.scss'],
})
export class NewEditFatherComponent implements OnInit {
  preBuild: IFatherPre = {};
  isNew = true;
  errorToShowMat = 'Dato obligatorio';
  errorToShow: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private preBuildService: PreBuildService,
  ) {
    this.route.queryParams.subscribe(async params => {
      if (params['id']) {
        this.isNew = false;
        this.preBuild = await preBuildService
          .getFatherBuildById(params['id'])
          .toPromise();
      } else {
        this.isNew = true;
      }
    });
  }

  ngOnInit() {}
  newCustomer() {
    this.preBuildService.newBuildFather(this.preBuild).subscribe(father => {
      for (let index = 0; index < this.preBuild.numOfChild; index++) {
        const build: IPreBuild = {
          city: father.city,
          fatherPreBuild: father._id,
          name: `Vivienda ${index + 1}`,
          notes: '',
        };
        this.preBuildService.newBuild(build).subscribe();
      }
      const toast: NavigationExtras = {
        queryParams: { res: 'Nuevo Obra Agregada' },
      };
      this.router
        .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
        .then(() => this.router.navigate(['list-prebuild-admin'], toast));
    });
  }
  editCustomer() {
    this.preBuildService.putFatherBuild(this.preBuild).subscribe(() => {
      const toast: NavigationExtras = {
        queryParams: { res: ' Obra Editada' },
      };
      this.router
        .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
        .then(() => this.router.navigate(['list-prebuild-admin'], toast));
    });
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
  getPopMessage(event) {
    const isDisabled = (<HTMLInputElement>document.getElementById('submitUser'))
      .disabled;
    if (isDisabled) {
      this.errorToShow = 'Verificar datos ingresados';
    } else {
      this.errorToShow = '';
    }
  }
}
