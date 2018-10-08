import { IBuyer } from './../../../models/buyer.model';
import { BuyerService } from './../../../services/buyer.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../../../services/property.service';
import { IProperty } from '../../../models/property.model';
import { Observable } from 'rxjs/internal/Observable';
import { UserSessionService } from '../../../services/user-session.service';
import { ToastController } from '@ionic/angular';
import { IStatusBuyerProperty } from '../../../models/statusBuyerProperty.model';
import { StatusBuyerPropertyService } from '../../../services/status-buyer-property.service';
import { OnesignalService } from '../../../services/onesignal.service';
import { SellerService } from '../../../services/seller.service';
import { map } from 'rxjs/operators';
import { INotification } from '../../../models/notification.model';

@Component({
  selector: 'app-detail-prop-buyer',
  templateUrl: './detail-prop-buyer.component.html',
  styleUrls: ['./detail-prop-buyer.component.scss'],
})
export class DetailPropBuyerComponent implements OnInit {
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
    private oneSignalService: OnesignalService,
    private sellerService: SellerService,
  ) {
    this.route.queryParams.subscribe(params => {
      console.log(params.id);
      if (params.id) {
        this.getPropertyById(params.id);
        this.getlikeProperty(params.id);
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
  async getSellerOfProperty() {
    return await this.sellerService
      .getSellerAll()
      .pipe(
        map(sellers =>
          sellers.find(
            s => !!s.property.find(p => p._id === this.property._id),
          ),
        ),
      )
      .toPromise();
  }
  getlikeProperty(id: string) {
    const buyer = this.userSessionService.userSession.value;
    this.buyerService.getBuyerById(buyer.id).subscribe((b: any) => {
      console.log(b);
      if (b.statusBuyerProperty && b.statusBuyerProperty.length > 0) {
        this.arrSBP = b.statusBuyerProperty.map(
          buyerProperty => buyerProperty._id,
        );
        this.arrPropLikes = b.statusBuyerProperty.map(
          buyerProperty => buyerProperty.property._id,
        );
        if (b.statusBuyerProperty) {
          const findIndex = this.arrPropLikes.findIndex(prop => prop === id);
          if (findIndex !== -1) {
            this.isLiked = true;
          }
        }
      }
    });
  }
  setLikeProperty(propertyId: string) {
    const buyerId = this.userSessionService.userSession.value.id;
    const sBP: IStatusBuyerProperty = {
      buyer: buyerId,
      property: propertyId,
      status: 'verde',
    };
    const buyer: IBuyer = {
      _id: buyerId,
      statusBuyerProperty: this.arrSBP,
    };
    if (this.isLiked) {
      const findeIndex = this.arrPropLikes.findIndex(
        prop => prop === propertyId,
      );
      this.statusBPService
        .deletedStatusBuyerProperty(this.arrSBP[findeIndex])
        .subscribe(res => {
          if (res) {
            const findeIndexBuyer = buyer.statusBuyerProperty.findIndex(
              item => item === this.arrSBP[findeIndex],
            );
            buyer.statusBuyerProperty.splice(findeIndexBuyer, 1);
            this.buyerService.putBuyer(buyer).subscribe(val => {
              this.presentToast('Te ha dejado de gustar esta propiedad');
            });
          }
        });
    } else {
      this.statusBPService.newStatusBuyerProperty(sBP).subscribe(res => {
        buyer.statusBuyerProperty.push(res._id);
        this.buyerService.putBuyer(buyer).subscribe(val => {
          // crar noti
          this.notification();
          if (val) {
            this.presentToast('Te ha gustado esta propiedad');
          }
        });
      });
    }
    this.isLiked = !this.isLiked;
  }
  public async notification() {
    // seller
    const seller = await this.getSellerOfProperty();
    // mensaje
    const m = `${
      this.userSessionService.userSession.value.name
    } ha indicado que le gusta ${this.property.name}`;
    // notificacion
    const notification: INotification = {
      title: 'Interés en una Propiedad',
      message: m,
      tags: ['office', 'administrator'],
      receiversId: seller === undefined ? undefined : [seller._id],
      senderId: this.userSessionService.userSession.value.id,
      status: 'verde',
      type: 'like',
    };
    console.log(seller);
    // onesignal
    this.oneSignalService
      .postOneSignalByTag(
        notification.title,
        m,
        ['office'],
        notification.receiversId,
      )
      .subscribe(() => {
        // guardar noti
        this.oneSignalService.newNotification(notification).subscribe();
      });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
    });
    toast.present();
  }
}
