import { Component, OnInit } from '@angular/core';
import { BuyerService } from '../../../services/buyer.service';
import { PropertyService } from '../../../services/property.service';
import { UserSessionService } from '../../../services/user-session.service';
import { CalcPercentage } from '../../../_config/_helpers';
import { IProperty } from '../../../models/property.model';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-list-prop-buyer',
  templateUrl: './list-prop-buyer.component.html',
  styleUrls: ['./list-prop-buyer.component.scss'],
})
export class ListPropBuyerComponent implements OnInit {
  properties: IProperty[] = [];
  isLoad = false;
  constructor(
    private buyerService: BuyerService,
    private propertyService: PropertyService,
    private userSessionService: UserSessionService,
    private router: Router,
  ) {
    this.getPropertyMatch();
  }

  ngOnInit() {}
  getPropertyMatch() {
    const buyer = this.userSessionService.userSession.value;
    this.propertyService.matchSearch(buyer.id).subscribe(val => {
      if (val) {
        console.log(val);
        this.getBuyer(buyer.id);
      }
    });
  }
  getBuyer(id) {
    this.buyerService.getBuyerById(id).subscribe(buyer => {
      this.properties = CalcPercentage(buyer, buyer.property, 10);
      this.isLoad = true;
    });
  }
  itemDetail(item: IProperty) {
    const data: NavigationExtras = { queryParams: { id: item._id } };
    this.router.navigate(['buyer-property-detail'], data);
  }
}
