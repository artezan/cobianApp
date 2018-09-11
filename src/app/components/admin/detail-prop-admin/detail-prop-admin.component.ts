import { Component, OnInit } from '@angular/core';
import { IProperty } from '../../../models/property.model';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../../../services/property.service';
import { BuyerService } from '../../../services/buyer.service';
import { UserSessionService } from '../../../services/user-session.service';
import { ToastController } from '@ionic/angular';
import { StatusBuyerPropertyService } from '../../../services/status-buyer-property.service';
import { IStatusBuyerProperty } from '../../../models/statusBuyerProperty.model';
import { IBuyer } from '../../../models/buyer.model';

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
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
    });
    toast.present();
  }
}
