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
import { INotification } from '../../../models/notification.model';
import { OnesignalService } from '../../../services/onesignal.service';
import { map } from 'rxjs/operators';
import { SellerService } from '../../../services/seller.service';

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
    private oneSignalService: OnesignalService,
    private sellerService: SellerService,
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
    const buyer = this.userSessionService.userSession.value;
    const find = this.statusBuyerProperty.find(
      (s: any) => s.property._id === ofert.property._id,
    );
    this.statusBuyerPropertyService
      .upgradeStatus(find._id, 'rojo')
      .subscribe(c => {
        /* if (isAccept) {
          const prop = ofert.property;
          prop.dateToApart = new Date();
          this.propertyService
            .putProperty(prop)
            .subscribe(() => console.log('date'));
        } */
      });
    ofert.status = 'rojo';
    ofert.notes = str;
    ofert.isAccept = isAccept;
    this.ofertService.putOfert(ofert).subscribe(async res => {
      // vendedor id notifica
      const seller = await this.getSellerOfProperty(ofert.property._id);
      // arr de ids
      const arr = this.buyer.adviser
        .map(a => a._id)
        .concat(seller === undefined ? '1' : seller._id);
      const dateToSchedule = new Date(new Date().getTime() + 15 * 86400000);
      if (res) {
        this.notification(
          'Respuesta de oferta',
          `La oferta del ${buyer.name} para la propiedad: "${
            ofert.property.name
          }" ha sido ${str}`,
          ofert.status,
          'ofert',
          ['office', 'administrator'],
          seller === undefined ? undefined : [seller._id],
        );
        if (isAccept) {
          ofert.property.dateToApart = dateToSchedule;
          this.propertyService.putProperty(ofert.property).subscribe();
          this.notificationBySchedule(
            'Tiempo de Apartado Superado',
            `El tiempo de espera ha superado los 15 dias para la oferta de la propiedad: ${
              ofert.property.name
            } del cliente ${this.userSessionService.userSession.value.name}`,
            ['office', 'administrator'],
            arr,
            dateToSchedule,
            ofert,
          );
        }
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
  public notification(
    title,
    message,
    status,
    type,
    tags,
    reciversId: string[],
  ) {
    // notificacion
    const notification: INotification = {
      title: title,
      message: message,
      tags: tags,
      receiversId: reciversId,
      senderId: this.userSessionService.userSession.value.id,
      status: status,
      type: type,
    };
    // onesignal
    this.oneSignalService
      .postOneSignalByTag(
        notification.title,
        message,
        ['office', 'administrator'],
        reciversId,
      )
      .subscribe(() => {
        // guardar noti
        this.oneSignalService.newNotification(notification).subscribe();
      });
  }
  private notificationBySchedule(
    title,
    message,
    tags: string[],
    reciversId: string[],
    date: Date,
    ofert: IOfert,
  ) {
    // onesignal
    this.oneSignalService
      .postOneSignalBySchedule(title, message, date, tags, reciversId)
      .subscribe(data => {
        if (!ofert.notificationOneSignal) {
          ofert.notificationOneSignal = [];
        }
        ofert.notificationOneSignal.push(data.id);
        this.ofertService.putOfert(ofert).subscribe();
      });
  }
  async getSellerOfProperty(id) {
    return await this.sellerService
      .getSellerAll()
      .pipe(
        map(sellers => sellers.find(s => !!s.property.find(p => p._id === id))),
      )
      .toPromise();
  }
}
