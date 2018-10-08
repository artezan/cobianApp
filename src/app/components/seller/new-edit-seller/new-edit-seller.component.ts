import { Component, OnInit } from '@angular/core';
import { ISeller } from '../../../models/seller.model';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import { SellerService } from '../../../services/seller.service';
import { NavController } from '@ionic/angular';
import { PropertyService } from '../../../services/property.service';
import { Observable } from 'rxjs/internal/Observable';
import { IProperty } from '../../../models/property.model';
import { UserSessionService } from '../../../services/user-session.service';
import { IUserSession } from '../../../models/userSession.model';

@Component({
  selector: 'app-new-edit-seller',
  templateUrl: './new-edit-seller.component.html',
  styleUrls: ['./new-edit-seller.component.scss'],
})
export class NewEditSellerComponent implements OnInit {
  hide = true;
  companyId: string;
  isNew = true;
  errorToShow = '';
  errorToShowMat = 'Dato obligatorio';
  seller: ISeller = {};
  properties$: Observable<IProperty[]>;
  user: IUserSession;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sellerService: SellerService,
    private navCtr: NavController,
    private propertyService: PropertyService,
    private userSession: UserSessionService,
  ) {
    this.user = userSession.userSession.value;
  }

  ngOnInit() {
    this.getProperties();
    this.route.queryParams.subscribe(params => {
      let arr = [];
      if (params['id']) {
        this.sellerService.getSellerById(params['id']).subscribe(s => {
          Object.keys(s).forEach(key => {
            if (s[key] === false) {
              s[key] = 'false';
            } else if (s[key] === true) {
              s[key] = 'true';
            }
          });
          if (s.property && s.property.length > 0) {
            arr = <any>s.property.map(p => p._id);
          }
          delete s.property;
          this.seller = s;
          this.seller.property = arr;
        });
        this.isNew = false;
      } else if (this.user.type === 'seller') {
        this.sellerService.getSellerById(this.user.id).subscribe(s => {
          Object.keys(s).forEach(key => {
            if (s[key] === false) {
              s[key] = 'false';
            } else if (s[key] === true) {
              s[key] = 'true';
            }
          });
          if (s.property && s.property.length > 0) {
            arr = <any>s.property.map(p => p._id);
          }
          delete s.property;
          this.seller = s;
          this.seller.property = arr;
        });
        this.isNew = false;
      } else {
        this.isNew = true;
      }
    });
  }
  getProperties() {
    this.properties$ = this.propertyService.getAllSpecial();
  }
  newCustomer() {
    this.sellerService.newSeller(this.seller).subscribe(s => {
      const toast: NavigationExtras = {
        queryParams: { res: 'Nuevo Propietario Agregado' },
      };
      // this.router.navigate(['list-seller-admin'], toast);
      this.router
        .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
        .then(() => this.router.navigate(['list-seller-admin'], toast));
    });
  }
  editCustomer() {
    this.sellerService.putSeller(this.seller).subscribe(() => {
      const toast: NavigationExtras = {
        queryParams: { res: ' Propietario Editado' },
      };
      if (this.user.type === 'seller') {
        this.router
          .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
          .then(() => this.router.navigate(['list-buyer-admin'], toast));
      } else {
        this.router
          .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
          .then(() => this.router.navigate(['list-seller-admin'], toast));
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
