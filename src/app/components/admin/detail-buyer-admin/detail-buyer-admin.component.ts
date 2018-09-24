import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../../../services/property.service';
import { BuyerService } from '../../../services/buyer.service';
import { UserSessionService } from '../../../services/user-session.service';
import { ToastController } from '@ionic/angular';
import { StatusBuyerPropertyService } from '../../../services/status-buyer-property.service';
import { IStatusBuyerProperty } from '../../../models/statusBuyerProperty.model';
import { IBuyer } from '../../../models/buyer.model';
import { ICreditGet } from '../../../models/credit.model';
import { FormatHoursFront } from '../../../_config/_helpers';

@Component({
  selector: 'app-detail-buyer-admin',
  templateUrl: './detail-buyer-admin.component.html',
  styleUrls: ['./detail-buyer-admin.component.scss'],
})
export class DetailBuyerAdminComponent implements OnInit {
  isLoad = false;
  isLiked = false;
  arrPropLikes: string[] = [];
  arrSBP: string[] = [];
  buyer: IBuyer;
  credits: ICreditGet[] = [];
  constructor(
    private route: ActivatedRoute,
    private buyerService: BuyerService,
    private userSessionService: UserSessionService,
    public toastController: ToastController,
    private statusBPService: StatusBuyerPropertyService,
  ) {
    this.route.queryParams.subscribe(params => {
      console.log(params.id);
      if (params.id) {
        this.getBuyerById(params.id);
      }
    });
  }

  ngOnInit() {}
  getBuyerById(id: string) {
    this.isLoad = false;
    this.buyerService.getBuyerById(id).subscribe(b => {
      this.buyer = b;
      this.credits = <any>b.credit;

      console.log(this.buyer);

      if (b.statusBuyerProperty && b.statusBuyerProperty.length > 0) {
        this.arrSBP = b.statusBuyerProperty.map(
          buyerProperty => buyerProperty._id,
        );
        this.arrPropLikes = b.statusBuyerProperty.map(
          buyerProperty => buyerProperty.property._id,
        );
        console.log(this.arrSBP);
      }
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
  formatDates(dateInput: Date): string {
    const day: string = new Date(dateInput).getDate().toString();
    const month: string = (new Date(dateInput).getMonth() + 1).toString();
    const year: string = new Date(dateInput).getFullYear().toString();
    const date = day + '/' + month + '/' + year;
    return date;
  }
  formatHours(hours, minutes) {
    return FormatHoursFront(hours, minutes);
  }
}
