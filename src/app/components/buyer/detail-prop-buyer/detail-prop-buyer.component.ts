import { IBuyer } from './../../../models/buyer.model';
import { BuyerService } from './../../../services/buyer.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../../../services/property.service';
import { IProperty } from '../../../models/property.model';
import { Observable } from 'rxjs';
import { UserSessionService } from '../../../services/user-session.service';
import { ToastController } from '@ionic/angular';
import { IStatusBuyerProperty } from '../../../models/statusBuyerProperty.model';
import { StatusBuyerPropertyService } from '../../../services/status-buyer-property.service';

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
  getlikeProperty(id: string) {
    const buyer = this.userSessionService.userSession.value;
    this.buyerService.getBuyerById(buyer.id).subscribe(b => {
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
          if (val) {
            this.presentToast('Te ha gustado esta propiedad');
          }
        });
      });
    }
    this.isLiked = !this.isLiked;
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
    });
    toast.present();
  }
}
