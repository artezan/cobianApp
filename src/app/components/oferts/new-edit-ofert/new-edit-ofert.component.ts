import { Component, OnInit } from '@angular/core';
import { IOfert } from '../../../models/ofert.model';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { CreditService } from '../../../services/credit.service';
import { NavController } from '@ionic/angular';
import { PropertyService } from '../../../services/property.service';
import { StatusBuyerPropertyService } from '../../../services/status-buyer-property.service';
import { ICredit } from '../../../models/credit.model';
import { OfertService } from '../../../services/ofert.service';
import { Observable } from 'rxjs/internal/Observable';
import { IBuyer } from '../../../models/buyer.model';
import { IProperty } from '../../../models/property.model';
import { BuyerService } from '../../../services/buyer.service';
import { INotification } from '../../../models/notification.model';
import { OnesignalService } from '../../../services/onesignal.service';
import { UserSessionService } from '../../../services/user-session.service';
import { MatDialog } from '@angular/material/dialog';
import {
  SearchSelectComponent,
  SearchDialog
} from '../../general/search-select/search-select.component';

@Component({
  selector: 'app-new-edit-ofert',
  templateUrl: './new-edit-ofert.component.html',
  styleUrls: ['./new-edit-ofert.component.scss']
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
  ofertForNot;
  isSpinner: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ofertService: OfertService,
    private navCtr: NavController,
    private propertyService: PropertyService,
    private buyerService: BuyerService,
    private statusBuyerPropertyService: StatusBuyerPropertyService,
    private oneSignalService: OnesignalService,
    private userSession: UserSessionService,
    public dialog: MatDialog
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
          this.buyer = ofert.buyer._id;
          this.property = ofert.property._id;
          this.files = '';
          this.ofert.files.forEach((f, i) => {
            if (this.ofert.files.length === i + 1) {
              this.files += f;
            } else {
              this.files += f + ',';
            }
          });
          this.ofert.buyer = <any>this.buyer;
          this.ofert.property = <any>this.property;
          this.getProp(this.buyer);
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
  async getPropName(id) {
    return await this.propertyService.getPropertyById(id).toPromise();
  }
  async editOfert() {
    this.update('amarillo', this.ofert.buyer, this.ofert.property);
    this.ofert.status = 'amarillo';
    this.ofert.files = this.files.split(',');
    const prop = await this.getPropName(this.ofert.property);
    this.notification(
      'Actualización de Oferta',
      `Se ha actualizado la oferta para ${prop.name}`,
      'amarillo',
      'ofert',
      <any>this.ofert.buyer
    );
    this.ofertService.putOfert(this.ofert).subscribe(s => {
      const toast: NavigationExtras = {
        queryParams: { res: 'Oferta Editada' }
      };
      // this.router.navigate(['list-credit-admin'], toast);
      // this.navCtr.navigateRoot('list-ofert-admin', true, toast);
      this.router
        .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
        .then(() => this.router.navigate(['list-ofert-admin'], toast));
    });
  }
  async newOfert() {
    this.ofert.files = this.files.split(',');
    this.ofert.status = 'amarillo';
    const prop = await this.getPropName(this.ofert.property);
    this.notification(
      'Nueva Oferta',
      `Se ha creado oferta para ${prop.name}`,
      'amarillo',
      'ofert',
      <any>this.ofert.buyer
    );
    this.ofertService.newOfert(this.ofert).subscribe(o => {
      this.update('amarillo', this.ofert.buyer, this.ofert.property);
      this.OfertsBuyer.push(o._id);
      const buyer: any = {
        _id: this.ofert.buyer,
        ofert: this.OfertsBuyer
      };
      this.buyerService.putBuyer(buyer).subscribe(() => {
        // this.navCtr.navigateRoot('list-ofert-admin', true);
        const toast: NavigationExtras = {
          queryParams: { res: 'Oferta Creada' }
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
  // noti
  public notification(title, message, status, type, receiversId: string) {
    // notificacion
    const notification: INotification = {
      title: title,
      message: message,
      receiversId: [receiversId],
      senderId: this.userSession.userSession.value.id,
      status: status,
      type: type
    };
    // onesignal
    this.oneSignalService
      .postOneSignalByTag(notification.title, message, undefined, [receiversId])
      .subscribe(() => {
        // guardar noti
        this.oneSignalService.newNotification(notification).subscribe();
      });
  }
  // dialog
  public async searchBuyers() {
    this.isSpinner = true;
    const buyers = await this.buyerService.getBuyerAll().toPromise();
    this.isSpinner = false;
    const dialogRef = this.dialog.open(SearchSelectComponent, {
      /*  maxWidth: '50%',
          minWidth: '20%', */
      data: <SearchDialog>{
        header:
          'Buscar clientes para asignar un asesor, seleccione uno o varios',
        hideButtonCancel: true,
        okButton: 'OK',
        isMultiple: false,
        filtersDetail: true,
        itemsIdDisable:
          this.ofert.buyer === undefined ? undefined : [this.ofert.buyer._id],
        rows: buyers,
        typeFilter: 'filter-buyer',
        columns: [
          {
            name: 'Nombre',
            prop: 'name',
            type: 'normal'
          },
          {
            name: 'Apellido',
            prop: 'fatherLastName',
            type: 'normal'
          },
          {
            name: 'Fecha Alta',
            prop: 'timestamp',
            type: 'date'
          },
          {
            name: 'Estado',
            prop: 'statusBuyerProperty',
            type: 'statusBuyerProperty'
          }
        ]
      }
    });
    const sub = dialogRef.componentInstance.buttons.subscribe(res => {
      console.log(res);
      if (res.options) {
        this.ofert.buyer = res.arrSelect[0]._id;
        this.buyer = res.arrSelect[0]._id;
        this.getProp(this.buyer);
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
