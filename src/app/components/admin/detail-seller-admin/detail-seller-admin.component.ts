import { Component, OnInit } from '@angular/core';
import { ISeller } from '../../../models/seller.model';
import { ActivatedRoute } from '@angular/router';
import { AdviserService } from '../../../services/adviser.service';
import { SellerService } from '../../../services/seller.service';

@Component({
  selector: 'app-detail-seller-admin',
  templateUrl: './detail-seller-admin.component.html',
  styleUrls: ['./detail-seller-admin.component.scss'],
})
export class DetailSellerAdminComponent implements OnInit {
  isLoad = false;
  isLiked = false;
  arrPropLikes: string[] = [];
  arrSBP: string[] = [];
  seller: ISeller;
  constructor(
    private route: ActivatedRoute,
    private sellerService: SellerService,
  ) {
    this.route.queryParams.subscribe(params => {
      console.log(params.id);
      if (params.id) {
        this.getAdviserById(params.id);
      }
    });
  }

  ngOnInit() {}
  getAdviserById(id: string) {
    this.isLoad = false;
    this.sellerService.getSellerById(id).subscribe(seller => {
      this.seller = seller;

      console.log(this.seller);
      this.isLoad = true;
    });
  }
  formatDates(dateInput: Date): string {
    const day: string = new Date(dateInput).getDate().toString();
    const month: string = (new Date(dateInput).getMonth() + 1).toString();
    const year: string = new Date(dateInput).getFullYear().toString();
    const date = day + '/' + month + '/' + year;
    return date;
  }
}
