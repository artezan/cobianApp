import { Component, OnInit } from '@angular/core';
import { IProperty } from '../../../models/property.model';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../../../services/property.service';
import { BuyerService } from '../../../services/buyer.service';
import { UserSessionService } from '../../../services/user-session.service';
import { ToastController, AlertController } from '@ionic/angular';
import { StatusBuyerPropertyService } from '../../../services/status-buyer-property.service';
import { IStatusBuyerProperty } from '../../../models/statusBuyerProperty.model';
import { IBuyer } from '../../../models/buyer.model';
import { AlertInput } from '@ionic/core';

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
  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private buyerService: BuyerService,
    private userSessionService: UserSessionService,
    public toastController: ToastController,
    private statusBPService: StatusBuyerPropertyService,
    public alertController: AlertController,
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
    this.propertyService.getPropertyById(id).subscribe(property => {
      this.property = property;
      console.log(this.property);
      this.isLoad = true;
    });
  }
  setPropToBuyer(data: string[]) {
    data.forEach(buyerId => {
      if (buyerId !== '') {
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
        this.setPropToBuyer(res.data.value);
      }
    });
  }
}
