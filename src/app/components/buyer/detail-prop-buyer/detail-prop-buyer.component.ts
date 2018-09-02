import { IBuyer } from './../../../models/buyer.model';
import { BuyerService } from './../../../services/buyer.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../../../services/property.service';
import { IProperty } from '../../../models/property.model';
import { Observable } from 'rxjs';
import { UserSessionService } from '../../../services/user-session.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-detail-prop-buyer',
  templateUrl: './detail-prop-buyer.component.html',
  styleUrls: ['./detail-prop-buyer.component.scss']
})
export class DetailPropBuyerComponent implements OnInit {
  property: IProperty;
  isLoad = false;
  isLiked = false;
  arrPropLikes: string[] = [];
  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private buyerService: BuyerService,
    private userSessionService: UserSessionService,
    public toastController: ToastController
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
      this.arrPropLikes = b.propertySave;
      if (b.propertySave) {
        const findIndex = b.propertySave.findIndex(property => property === id);
        if (findIndex !== -1) {
          this.isLiked = true;
        }
      }
    });
  }
  setLikeProperty(id: string) {
    const buyerId = this.userSessionService.userSession.value.id;
    const buyer: IBuyer = {
      _id: buyerId,
      propertySave: this.arrPropLikes
    };

    if (this.isLiked) {
      const findeIndex = buyer.propertySave.findIndex(
        property => property === id
      );
      buyer.propertySave.splice(findeIndex, 1);
      this.presentToast('Te ha dejado de gustar esta propiedad');
    } else {
      buyer.propertySave.push(id);
      this.presentToast('Te ha gustado esta propiedad');
    }
    this.buyerService.putBuyer(buyer).subscribe(val => {
      if (val) {
        console.log(val);
      }
    });
    this.isLiked = !this.isLiked;
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}
