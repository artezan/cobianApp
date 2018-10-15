import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { IAdviser } from '../../../models/adviser.model';
import { AdviserService } from '../../../services/adviser.service';
import { BuyerService } from '../../../services/buyer.service';
import { Observable } from 'rxjs/internal/Observable';
import { IBuyer } from '../../../models/buyer.model';
import { NavComponent } from '@ionic/core';
import { NavController } from '@ionic/angular';
import { UserSessionService } from '../../../services/user-session.service';
import { IUserSession } from '../../../models/userSession.model';
import { INotification } from '../../../models/notification.model';
import { OnesignalService } from '../../../services/onesignal.service';
import { MatDialog } from '@angular/material/dialog';
import {
  SearchSelectComponent,
  SearchDialog,
} from '../../general/search-select/search-select.component';

@Component({
  selector: 'app-new-edit-adviser',
  templateUrl: './new-edit-adviser.component.html',
  styleUrls: ['./new-edit-adviser.component.scss'],
})
export class NewEditAdviserComponent implements OnInit {
  hide = true;
  companyId: string;
  isNew = true;
  errorToShow = '';
  errorToShowMat = 'Dato obligatorio';
  adviser: IAdviser = {};
  buyers$: Observable<IBuyer[]>;
  buyerSelect$: Observable<IBuyer>;
  buyerInput: IBuyer[] = [];
  user: IUserSession;
  isSpinner = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adviserService: AdviserService,
    private buyerService: BuyerService,
    private navCtr: NavController,
    private userSession: UserSessionService,
    private oneSignalService: OnesignalService,
    public dialog: MatDialog,
  ) {
    this.user = userSession.userSession.value;
  }

  ngOnInit() {
    this.getBuyers();
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.adviserService.getAdviserById(params['id']).subscribe(adv => {
          console.log(adv);
          this.adviser = adv;
        });
        this.isNew = false;
      } else if (this.user.type === 'adviser') {
        this.adviserService.getAdviserById(this.user.id).subscribe(adv => {
          console.log(adv);
          this.adviser = adv;
        });
        this.isNew = false;
      } else {
        this.isNew = true;
      }
    });
  }
  getBuyers() {
    this.buyers$ = this.buyerService.getBuyerAll();
  }
  newCustomer() {
    this.adviser.buyer = <any>this.buyerInput;
    this.adviserService.newAdviser(this.adviser).subscribe(adv => {
      this.buyerInput.forEach(buyer => {
        const indexFinded = buyer.adviser.findIndex(ad => ad._id === adv._id);
        if (indexFinded === -1) {
          const arr = buyer.adviser.map(ad => ad._id);
          arr.push(adv._id);
          buyer.adviser = <any>arr;
          // noti
          this.notification(
            'Nuevo Cliente Asignado',
            `Se le ha asignado el cliente: ${buyer.name}`,
            'verde',
            'buyer',
            undefined,
            [adv._id],
          );
          this.buyerService.putBuyer(buyer).subscribe(() => {});
        }
      });
      const toast: NavigationExtras = {
        queryParams: { res: 'Nuevo Asesor Agregado' },
      };
      this.router
        .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
        .then(() => this.router.navigate(['list-adviser-admin'], toast));
    });
  }
  deleteBuyer(buyerId) {
    console.log(buyerId);
    // buyer
    this.buyerService.getBuyerById(buyerId).subscribe(b => {
      const indexAdvBuyer = b.adviser.findIndex(
        ab => ab._id === this.adviser._id,
      );
      console.log(indexAdvBuyer);
      b.adviser.splice(indexAdvBuyer, 1);
      console.log(b);
      this.buyerService.putBuyer(b).subscribe(() => {
        // adviser
        this.adviserService.getAdviserById(this.adviser._id).subscribe(adv => {
          const indexBA = adv.buyer.findIndex(bu => bu._id === buyerId);
          console.log(indexBA);
          adv.buyer.splice(indexBA, 1);
          this.adviserService.putAdviser(adv).subscribe(() => {
            this.adviser.buyer = adv.buyer;
            console.log(this.adviser);
          });
        });
      });
    });
  }
  editCustomer() {
    if (this.buyerInput && this.buyerInput.length > 0) {
      this.buyerInput.forEach(b => {
        const index = this.adviser.buyer.findIndex(ab => ab._id === b._id);
        if (index === -1) {
          this.adviser.buyer.push(<any>b._id);
        }
        this.newAdviserToBuyer(b, this.adviser._id);
      });
    }

    console.log(this.adviser);
    this.adviserService.putAdviser(this.adviser).subscribe(() => {
      const toast: NavigationExtras = {
        queryParams: { res: ' Asesor Editado' },
      };
      /**
       * Es para recargar el componente previo
       */
      if (this.user.type === 'adviser') {
        this.router.navigate(['list-buyer-admin'], toast);
      } else {
        this.router
          .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
          .then(() => this.router.navigate(['list-adviser-admin'], toast));
      }
    });
  }
  newAdviserToBuyer(buyer: IBuyer, adviserId: string) {
    const indexFinded = buyer.adviser.findIndex(adv => adv._id === adviserId);
    if (indexFinded === -1) {
      const arr = buyer.adviser.map(adv => adv._id);
      arr.push(adviserId);
      buyer.adviser = <any>arr;
      // noti
      this.notification(
        'Nuevo Cliente Asignado',
        `Se le ha asignado el cliente: ${buyer.name}`,
        'verde',
        'buyer',
        undefined,
        [adviserId],
      );
      this.buyerService.putBuyer(buyer).subscribe(() => console.log('act'));
    }
  }
  private notification(
    title,
    message,
    status,
    type,
    tags,
    receiversId: string[],
  ) {
    // notificacion
    const notification: INotification = {
      title: title,
      message: message,
      tags: tags,
      receiversId: receiversId,
      senderId: this.userSession.userSession.value.id,
      status: status,
      type: type,
    };
    // onesignal
    this.oneSignalService
      .postOneSignalByTag(notification.title, message, tags, receiversId)
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
        isMultiple: true,
        filtersDetail: true,
        itemsIdDisable:
          this.adviser.buyer !== undefined
            ? [
                ...this.buyerInput.map(b => b._id),
                ...this.adviser.buyer.map(b => b._id),
              ]
            : this.buyerInput.map(b => b._id),
        rows: buyers,
        typeFilter: 'filter-buyer',
        columns: [
          {
            name: 'Nombre',
            prop: 'name',
            type: 'normal',
          },
          {
            name: 'Apellido',
            prop: 'fatherLastName',
            type: 'normal',
          },
          {
            name: 'Fecha Alta',
            prop: 'timestamp',
            type: 'date',
          },
          {
            name: 'Estado',
            prop: 'statusBuyerProperty',
            type: 'statusBuyerProperty',
          },
        ],
      },
    });
    const sub = dialogRef.componentInstance.buttons.subscribe(res => {
      console.log(res);
      if (res.options) {
        this.buyerInput = [...res.arrSelect, ...this.buyerInput];
        console.log(this.buyerInput);
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
