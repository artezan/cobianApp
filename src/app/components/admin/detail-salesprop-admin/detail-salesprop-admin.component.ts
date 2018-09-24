import { Component, OnInit } from '@angular/core';
import { StatusBuyerPropertyService } from '../../../services/status-buyer-property.service';
import { UserSessionService } from '../../../services/user-session.service';
import { PropertyService } from '../../../services/property.service';
import { Platform, ToastController, AlertController } from '@ionic/angular';
import { IProperty } from '../../../models/property.model';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import {
  IStatusBuyerProperty,
  IStatusBuyerPropertyGet,
} from '../../../models/statusBuyerProperty.model';
import { FormatDatesFront } from '../../../_config/_helpers';
import { AlertInput } from '@ionic/core';
import { IOfert } from '../../../models/ofert.model';
import { ICredit } from '../../../models/credit.model';
import { BuyerService } from '../../../services/buyer.service';
import { map } from 'rxjs/operators';
import { IAdviser } from '../../../models/adviser.model';
import { SaleService } from '../../../services/sale.service';
import { ISale } from '../../../models/sale.model';

@Component({
  selector: 'app-detail-salesprop-admin',
  templateUrl: './detail-salesprop-admin.component.html',
  styleUrls: ['./detail-salesprop-admin.component.scss'],
})
export class DetailSalespropAdminComponent implements OnInit {
  isLoad = false;
  isDesktop = false;
  sBP: IStatusBuyerPropertyGet;
  isOfert: boolean;
  isCredit: boolean;
  percent: number;
  dayRest: number;
  outerStrokeColor = '#f5811e';
  constructor(
    private statusBPService: StatusBuyerPropertyService,
    private userSession: UserSessionService,
    private propertyService: PropertyService,
    private platform: Platform,
    public toastController: ToastController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public byuerService: BuyerService,
    public saleService: SaleService,
    private router: Router,
  ) {
    this.isDesktop = platform.is('desktop');
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        if (params['ofert'] === 'false') {
          this.isOfert = false;
        } else {
          this.isOfert = true;
        }
        if (params['credit'] === 'false') {
          this.isCredit = false;
        } else {
          this.isCredit = true;
        }

        this.getSBPById(params['id']);
      }
    });
  }
  getSBPById(id: string) {
    this.statusBPService.getStatusBuyerPropertyById(id).subscribe(sBP => {
      this.isLoad = true;
      console.log(sBP);
      // 15 dias - 100%
      const diffDays = 15 - this.deDiffDays(sBP.timestamp);
      if (diffDays > 0) {
        this.dayRest = diffDays;
        this.percent = (diffDays * 100) / 15;
      }
      this.sBP = <any>sBP;
    });
  }
  private deDiffDays(dateToDiference: Date) {
    const date1 = new Date(dateToDiference);
    const date2 = new Date();
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  }
  getOferts(sBP: IStatusBuyerPropertyGet): IOfert[] {
    // rojo por oferta
    return sBP.buyer.ofert.filter(
      ofert => ofert.status === 'rojo' && ofert.property === sBP.property._id,
    );
  }
  getCredits(sBP: IStatusBuyerPropertyGet): ICredit[] {
    // rojo por credito
    return sBP.buyer.credit.filter(
      credit =>
        credit.status === 'rojo' && credit.property === sBP.property._id,
    );
  }
  async getAdv() {
    return await this.byuerService
      .getBuyerById(this.sBP.buyer._id)
      .pipe(map(data => data.adviser))
      .toPromise();
  }

  async presentAlertPrompt(str, oferPrice?) {
    const propInput: AlertInput[] = [
      {
        name: 'price',
        type: 'number',
        value: this.isOfert ? oferPrice : this.sBP.property.maxPrice.toString(),
        label: 'Costo Final',
        placeholder: 'Costo Final',
      },
      {
        name: 'note',
        type: 'text',
        placeholder: 'Notas',
        value: str,
      },
      {
        name: 'property',
        type: 'text',
        id: 'property-id',
        value: this.sBP.property.name,
        disabled: true,
      },
      {
        name: 'buyer',
        type: 'text',
        value: this.sBP.buyer.name + this.sBP.buyer.fatherLastName,
        placeholder: 'Consumidor',
        disabled: true,
      },
    ];
    const alert = await this.alertController.create({
      header: 'Firmar',
      subHeader: 'Llene los campos',
      message: 'Al momento de aceptar la propiedad cambiará de estado',
      inputs: propInput,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('');
          },
        },
        {
          text: 'Aceptar',
          role: 'ok',
          handler: () => {
            console.log('');
          },
        },
      ],
    });

    await alert.present();
    await alert.onWillDismiss().then(res => {
      console.log(res);
      if (res.role === 'ok') {
        console.log(res);
        this.presentAlertCheckbox(res.data.values.price, res.data.values.note);
      }
    });
  }
  // asigna adv
  async presentAlertCheckbox(price, note) {
    const advInput: AlertInput[] = [];
    const advisers: IAdviser[] = await this.getAdv();
    advisers.forEach(adv => {
      advInput.push({
        name: 'adviser',
        type: 'radio',
        label: adv.name,
        value: adv._id,
      });
    });
    const alert = await this.alertController.create({
      header: 'Asesor',
      subHeader: 'Seleccione Asesor de renta/compra',
      inputs: advInput,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('');
          },
        },
        {
          text: 'Firmar',
          role: 'ok',
          handler: () => {
            console.log('');
          },
        },
      ],
    });

    await alert.present();
    await alert.onWillDismiss().then(res => {
      console.log(res);
      if (res.role === 'ok') {
        this.changeStatus(res.data.values, note, price);
      }
    });
  }
  // cambiar status
  changeStatus(adv, note, price) {
    const Sale = {
      adviser: adv,
      isRent: this.sBP.property.isRent,
      buyer: this.sBP.buyer._id,
      property: this.sBP.property._id,
      note: note,
      price: +price,
    };
    console.log(Sale);
    this.statusBPService.upgradeStatus(this.sBP._id, 'azul').subscribe(() => {
      this.saleService.newSale(<any>Sale).subscribe(sale => {
        const prop = { _id: this.sBP.property._id, isBuy: true };
        this.propertyService.putProperty(prop).subscribe(() => {
          console.log(sale);
          const toast: NavigationExtras = {
            queryParams: { res: 'Venta Concretada' },
          };
          this.router
            .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
            .then(() => this.router.navigate(['list-salesprop-admin'], toast));
        });
      });
    });
  }
  formatDates(date: Date) {
    return FormatDatesFront(date);
  }
}
