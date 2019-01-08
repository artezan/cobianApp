import { Component, OnInit } from '@angular/core';
import { IProperty } from '../../../models/property.model';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../../../services/property.service';
import { BuyerService } from '../../../services/buyer.service';
import { UserSessionService } from '../../../services/user-session.service';
import { ToastController, AlertController } from '@ionic/angular';
import { StatusBuyerPropertyService } from '../../../services/status-buyer-property.service';
import { IStatusBuyerPropertyGet } from '../../../models/statusBuyerProperty.model';
import { IBuyer } from '../../../models/buyer.model';
import { AlertInput } from '@ionic/core';
import { INotification } from '../../../models/notification.model';
import { OnesignalService } from '../../../services/onesignal.service';
import { FormatDatesFront } from '../../../_config/_helpers';
// import { ExportXLS, PdfColum } from '../../../_config/excel-generator';

@Component({
  selector: 'app-detail-prop-admin',
  templateUrl: './detail-prop-admin.component.html',
  styleUrls: ['./detail-prop-admin.component.scss'],
})
export class DetailPropAdminComponent implements OnInit {
  property: IProperty;
  isLoad = false;
  isLiked = false;
  arrPropLikes: string[] = [];
  arrSBP: string[] = [];
  sbp: IStatusBuyerPropertyGet[] = [];
  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private buyerService: BuyerService,
    private userSessionService: UserSessionService,
    public toastController: ToastController,
    private statusBPService: StatusBuyerPropertyService,
    public alertController: AlertController,
    private oneSignalService: OnesignalService,
    private sBPService: StatusBuyerPropertyService,
  ) {
    this.route.queryParams.subscribe(params => {
      console.log(params.id);
      if (params.id) {
        this.getPropertyById(params.id);
      }
    });
  }

  ngOnInit() {}
  getPropertyById(id: string) {
    this.propertyService.getPropertyById(id).subscribe(async property => {
      this.property = property;
      this.sbp = await this.getBuyersProp(id);
      console.log('sbp', this.sbp);
      this.isLoad = true;
    });
  }
  async getBuyersProp(id) {
    const sBP = await this.statusBPService.getStatusBuyerProperty().toPromise();
    return <IStatusBuyerPropertyGet[]>(
      sBP.filter((s: any) => s.property._id === id)
    );
  }
  setPropToBuyer(data: string[]) {
    data.forEach(buyerId => {
      if (buyerId !== '') {
        // noti
        this.notification(
          'Sugerencia de Propiedad',
          `Se ha sugerido la propiedad ${this.property.name}`,
          'gris',
          'property',
          buyerId,
        );
        this.buyerService.getBuyerById(buyerId).subscribe(b => {
          b.property.push(<any>this.property._id);
          this.buyerService.putBuyer(b).subscribe(() => {
            this.presentToast('Propiedad Agregada a Cliente');
          });
        });
      }
    });
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
    });
    toast.present();
  }
  async getBuyers() {
    return await this.buyerService.getBuyerAll().toPromise();
  }
  async presentAlertCheckbox() {
    const buyers = await this.getBuyers();
    const inputsBuyer: AlertInput[] = [];
    buyers.forEach(b => {
      const findIndex = b.property.findIndex(p => p._id === this.property._id);
      if (findIndex !== -1) {
        inputsBuyer.push({
          name: b.name,
          type: 'checkbox',
          label: b.name,
          checked: true,
          disabled: true,
        });
      } else {
        inputsBuyer.push({
          name: b.name,
          type: 'checkbox',
          label: b.name,
          value: b._id,
        });
      }
    });
    const alert = await this.alertController.create({
      header: 'Sugerir a Clientes',
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
          text: 'Ok',
          role: 'ok',
          handler: () => {
            console.log('');
          },
        },
      ],
    });

    await alert.present();
    await alert.onWillDismiss().then(res => {
      if (res.role === 'ok') {
        this.setPropToBuyer(res.data.values);
      }
    });
  }
  // noti
  private notification(title, message, status, type, receiversId: string) {
    // notificacion
    const notification: INotification = {
      title: title,
      message: message,
      receiversId: [receiversId],
      senderId: this.userSessionService.userSession.value.id,
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
  dateFormat(date: any) {
    return FormatDatesFront(new Date(date));
  }
  getReport() {
    /*    const columns: PdfColum[] = [
      {
        name: 'Nombre',
        prop: 'name',
      },
      {
        name: 'Cliente',
        prop: 'nameBuyer',
      },
      {
        name: 'Estado',
        prop: 'status',
      },
      {
        name: 'Fecha',
        prop: 'date',
      },
    ];
    const rows = this.sbp.map(sb => {
      const name = sb.property.name;
      const nameBuyer = sb.buyer.name;
      const status =
        sb.status === 'rojo'
          ? 'Cierre'
          : sb.status === 'verde'
          ? 'Interés'
          : sb.status === 'amarillo'
          ? 'Seguimiento'
          : sb.status === 'azul'
          ? 'Post Venta'
          : '';
      const date = this.dateFormat(sb.timestamp);
      return {
        name,
        nameBuyer,
        status,
        date,
      };
    });
    ExportXLS(rows, columns, this.property.name); */
  }
}
