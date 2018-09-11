import { Component, OnInit } from '@angular/core';
import { ISeller } from '../../../models/seller.model';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import { SellerService } from '../../../services/seller.service';
import { NavController } from '@ionic/angular';
import { PropertyService } from '../../../services/property.service';

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
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sellerService: SellerService,
    private navCtr: NavController,
    private propertyService: PropertyService,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.sellerService.getSellerById(params['id']).subscribe(s => {
          this.seller = s;
        });
        this.isNew = false;
      } else {
        this.isNew = true;
      }
    });
  }
  newCustomer() {
    console.log(this.seller);
    this.sellerService.newSeller(this.seller).subscribe(s => {
      const toast: NavigationExtras = {
        queryParams: { res: 'Nuevo Propietario Agregado' },
      };
      this.router.navigate(['list-seller-admin'], toast);
    });
  }
  editCustomer() {
    console.log(this.seller);

    this.sellerService.putSeller(this.seller).subscribe(() => {
      const toast: NavigationExtras = {
        queryParams: { res: ' Propietario Editado' },
      };
      this.router.navigate(['list-seller-admin'], toast);
      this.navCtr.navigateRoot('list-seller-admin', true, toast);
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
