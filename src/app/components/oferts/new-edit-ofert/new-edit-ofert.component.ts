import { Component, OnInit } from '@angular/core';
import { IOfert } from '../../../models/ofert.model';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { CreditService } from '../../../services/credit.service';
import { NavController } from '@ionic/angular';
import { PropertyService } from '../../../services/property.service';
import { StatusBuyerPropertyService } from '../../../services/status-buyer-property.service';
import { ICredit } from '../../../models/credit.model';
import { OfertService } from '../../../services/ofert.service';
import { Observable } from 'rxjs';
import { IBuyer } from '../../../models/buyer.model';
import { IProperty } from '../../../models/property.model';
import { BuyerService } from '../../../services/buyer.service';

@Component({
  selector: 'app-new-edit-ofert',
  templateUrl: './new-edit-ofert.component.html',
  styleUrls: ['./new-edit-ofert.component.scss'],
})
export class NewEditOfertComponent implements OnInit {
  hide = true;
  companyId: string;
  isNew = true;
  errorToShow = '';
  errorToShowMat = 'Dato obligatorio';
  ofert: IOfert = {};
  files: string;
  isLoad: boolean;
  buyer = '';
  property = '';
  properties: IProperty[];
  buyers;
  isEmpty: boolean;
  OfertsBuyer: string[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ofertService: OfertService,
    private navCtr: NavController,
    private propertyService: PropertyService,
    private buyerService: BuyerService,
    private statusBuyerPropertyService: StatusBuyerPropertyService,
  ) {
    this.isLoad = false;
    buyerService.getBuyerAll().subscribe(buyers => {
      this.buyers = buyers;
    });
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.ofertService.getOfertById(params['id']).subscribe(ofert => {
          console.log(ofert);
          this.ofert = <any>ofert;
          this.buyer = this.ofert.buyer._id;
          this.property = this.ofert.property._id;
          this.files = '';
          this.ofert.files.forEach((f, i) => {
            if (this.ofert.files.length === i + 1) {
              this.files += f;
            } else {
              this.files += f + ',';
            }
            this.ofert.buyer = <any>this.buyer;
            this.ofert.property = <any>this.property;
            this.getProp(this.buyer);
          });
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
  editOfert() {
    this.update('amarillo', this.ofert.buyer, this.ofert.property);
    this.ofert.status = 'amarillo';
    this.ofert.files = this.files.split(',');
    this.ofertService.putOfert(this.ofert).subscribe(s => {
      const toast: NavigationExtras = {
        queryParams: { res: 'Oferta Editada' },
      };
      // this.router.navigate(['list-credit-admin'], toast);
      // this.navCtr.navigateRoot('list-ofert-admin', true, toast);
      /**
       * Es para recargar el componente previo
       */
      this.router
        .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
        .then(() => this.router.navigate(['list-ofert-admin'], toast));
    });
  }
  newOfert() {
    this.ofert.files = this.files.split(',');
    this.ofert.status = 'amarillo';
    this.ofertService.newOfert(this.ofert).subscribe(o => {
      this.update('amarillo', this.ofert.buyer, this.ofert.property);
      this.OfertsBuyer.push(o._id);
      const buyer: any = {
        _id: this.ofert.buyer,
        ofert: this.OfertsBuyer,
      };
      this.buyerService.putBuyer(buyer).subscribe(() => {
        // this.navCtr.navigateRoot('list-ofert-admin', true);
        const toast: NavigationExtras = {
          queryParams: { res: 'Oferta Creada' },
        };
        this.router
          .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
          .then(() => this.router.navigate(['list-ofert-admin'], toast));
      });
    });
  }
  private update(status: string, buyer, prop) {
    this.statusBuyerPropertyService
      .searchSpecial(buyer, prop)
      .subscribe(sbp => {
        console.log(sbp);
        this.statusBuyerPropertyService
          .upgradeStatus(sbp._id, status)
          .subscribe(c => console.log(c));
      });
  }
  getProp(item) {
    this.buyerService.getBuyerById(item).subscribe(buyer => {
      this.OfertsBuyer = buyer.ofert.map(o => o._id);
      if (buyer.statusBuyerProperty && buyer.statusBuyerProperty.length > 0) {
        this.properties = buyer.statusBuyerProperty.map(sbp => sbp.property);
        this.isEmpty = false;
      } else {
        this.isEmpty = true;
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
