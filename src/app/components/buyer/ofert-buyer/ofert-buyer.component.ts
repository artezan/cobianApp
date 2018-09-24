import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '../../../services/user-session.service';
import { BuyerService } from '../../../services/buyer.service';
import { IOfert } from '../../../models/ofert.model';
import { ToastController } from '@ionic/angular';
import { OfertService } from '../../../services/ofert.service';
import { StatusBuyerPropertyService } from '../../../services/status-buyer-property.service';
import { IStatusBuyerProperty } from '../../../models/statusBuyerProperty.model';
import { IProperty } from '../../../models/property.model';
import { IBuyer } from '../../../models/buyer.model';
import { PropertyService } from '../../../services/property.service';

@Component({
  selector: 'app-ofert-buyer',
  templateUrl: './ofert-buyer.component.html',
  styleUrls: ['./ofert-buyer.component.scss'],
})
export class OfertBuyerComponent implements OnInit {
  isLoad = false;
  hasOfert = false;
  oferts: IOfert[];
  statusBuyerProperty: IStatusBuyerProperty[];
  buyer: IBuyer;

  constructor(
    private userSessionService: UserSessionService,
    private buyerService: BuyerService,
    public toastController: ToastController,
    private ofertService: OfertService,
    private statusBuyerPropertyService: StatusBuyerPropertyService,
    private propertyService: PropertyService,
  ) {
    this.getOfert();
  }

  ngOnInit() {}
  getOfert() {
    const buyerId = this.userSessionService.userSession.value.id;
    this.buyerService.getBuyerById(buyerId).subscribe(buyer => {
      console.log(buyer);
      this.buyer = buyer;
      if (buyer.ofert.length > 0) {
        this.hasOfert = true;
        this.oferts = buyer.ofert;
        this.statusBuyerProperty = buyer.statusBuyerProperty;
      }
      this.isLoad = true;
    });
  }
  respondOfert(str: string, ofert: IOfert, isAccept: boolean) {
    const find = this.statusBuyerProperty.find(
      (s: any) => s.property._id === ofert.property._id,
    );
    this.statusBuyerPropertyService
      .upgradeStatus(find._id, 'rojo')
      .subscribe(c => {
        if (isAccept) {
          const prop = ofert.property;
          prop.dateToApart = new Date();
          this.propertyService
            .putProperty(prop)
            .subscribe(() => console.log('date'));
        }
      });
    ofert.status = 'rojo';
    ofert.notes = str;
    ofert.isAccept = isAccept;
    this.ofertService.putOfert(ofert).subscribe(res => {
      if (res) {
        this.getOfert();
        this.presentToast('Oferta ' + str);
      }
    });
  }
  // toast
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
    });
    toast.present();
  }
}
