import { Component, OnInit } from '@angular/core';
import { ICredit, ICreditGet } from '../../../models/credit.model';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { SellerService } from '../../../services/seller.service';
import { NavController } from '@ionic/angular';
import { PropertyService } from '../../../services/property.service';
import { CreditService } from '../../../services/credit.service';
import { StatusBuyerPropertyService } from '../../../services/status-buyer-property.service';
import { INotification } from '../../../models/notification.model';
import { UserSessionService } from '../../../services/user-session.service';
import { OnesignalService } from '../../../services/onesignal.service';

@Component({
  selector: 'app-new-edit-credit',
  templateUrl: './new-edit-credit.component.html',
  styleUrls: ['./new-edit-credit.component.scss'],
})
export class NewEditCreditComponent implements OnInit {
  hide = true;
  companyId: string;
  isNew = true;
  errorToShow = '';
  errorToShowMat = 'Dato obligatorio';
  credit: ICreditGet = {};
  files: string;
  isLoad: boolean;
  buyer = '';
  property = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private creditService: CreditService,
    private navCtr: NavController,
    private propertyService: PropertyService,
    private statusBuyerPropertyService: StatusBuyerPropertyService,
    private userSession: UserSessionService,
    private oneSignalService: OnesignalService,
  ) {
    this.isLoad = false;
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.creditService.getCreditById(params['id']).subscribe(credit => {
          console.log(credit);
          this.credit = <any>credit;
          this.buyer = this.credit.buyer._id;
          this.property = this.credit.property._id;
          this.files = '';
          this.credit.files.forEach((f, i) => {
            if (this.credit.files.length === i + 1) {
              this.files += f;
            } else {
              this.files += f + ',';
            }
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
  editCredit() {
    this.statusBuyerPropertyService
      .searchSpecial(this.buyer, this.property)
      .subscribe(sbp => {
        console.log(sbp);
        this.statusBuyerPropertyService
          .upgradeStatus(sbp._id, this.credit.status)
          .subscribe(c => console.log(c));
      });
    this.credit.files = this.files.split(',');
    // noti
    if (this.credit.status === 'amarillo') {
      this.notification(
        'Propuesta de crédito',
        `Nueva propuesta de crédito para ${this.credit.property.name}`,
        'amarillo',
        'credit',
        this.buyer,
      );
    }

    this.creditService.putCredit(<ICredit>this.credit).subscribe(s => {
      const toast: NavigationExtras = {
        queryParams: { res: 'Credito Editado' },
      };
      // this.router.navigate(['list-credit-admin'], toast);
      // this.navCtr.navigateRoot('list-credit-admin', true, toast);
      /**
       * Es para recargar el componente previo
       */
      this.router
        .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
        .then(() => this.router.navigate(['list-credit-admin'], toast));
    });
  }
  editCustomer() {
    /* this.sellerService.putSeller(this.seller).subscribe(() => {
      const toast: NavigationExtras = {
        queryParams: { res: ' Propietario Editado' },
      };
      this.router.navigate(['list-seller-admin'], toast);
      this.navCtr.navigateRoot('list-seller-admin', true, toast);
    }); */
  }
  public notification(title, message, status, type, receiversId: string) {
    // notificacion
    const notification: INotification = {
      title: title,
      message: message,
      receiversId: [receiversId],
      senderId: this.userSession.userSession.value.id,
      status: status,
      type: type,
    };
    // onesignal
    this.oneSignalService
      .postOneSignalByTag(notification.title, message, undefined, [receiversId])
      .subscribe(() => {
        // guardar noti
        this.oneSignalService.newNotification(notification).subscribe();
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
