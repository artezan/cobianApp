import { Component, OnInit } from '@angular/core';
import { StatusBuyerPropertyService } from '../../../services/status-buyer-property.service';
import { UserSessionService } from '../../../services/user-session.service';
import { PropertyService } from '../../../services/property.service';
import { Platform, ToastController, AlertController } from '@ionic/angular';
import { IProperty } from '../../../models/property.model';
import { ActivatedRoute } from '@angular/router';
import {
  IStatusBuyerProperty,
  IStatusBuyerPropertyGet,
} from '../../../models/statusBuyerProperty.model';
import { FormatDatesFront } from '../../../_config/_helpers';
import { AlertInput } from '@ionic/core';
import { IOfert } from '../../../models/ofert.model';
import { ICredit } from '../../../models/credit.model';

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

  async presentAlertCheckbox() {
    const inputsBuyer: AlertInput[] = [];
    if (this.isOfert) {
      inputsBuyer.push({
        name: 'Oferta',
        type: 'checkbox',
        label: 'Oferta',
        value: 'ofert',
        checked: false,
      });
    }
    if (this.isCredit) {
      inputsBuyer.push({
        name: 'Crédito',
        type: 'checkbox',
        label: 'Credito',
        value: 'credit',
        checked: false,
      });
    }
    const alert = await this.alertController.create({
      header: 'Firmar',
      subHeader: 'Seleccione uno o varios para confirmar',
      message: 'Al momento de aceptar la propiedad cambiará de estado',
      inputs: inputsBuyer,
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
      if (res.role === 'ok' && res.data.value.length > 0) {
        console.log(res);
        this.changeStatus(res.data.value);
      }
    });
  }
  // cambiar a azul sbp, ofert credit
  changeStatus(arr: string[]) {
    this.statusBPService.upgradeStatus(this.sBP._id, 'azul').subscribe(() => {
      arr.forEach(string => {
        if (string === 'ofert') {
          const oferts = this.getOferts(this.sBP);
          oferts.forEach(o => {
            // ofert serv put
          });
        }
        if (string === 'credit') {
          const credit = this.getCredits(this.sBP);
          credit.forEach(c => {
            // credit serv put azul
          });
        }
      });
    });
  }
  formatDates(date: Date) {
    return FormatDatesFront(date);
  }
}
