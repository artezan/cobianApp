import { Component, OnInit } from '@angular/core';
import { BuyerService } from '../../../services/buyer.service';
import { UserSessionService } from '../../../services/user-session.service';
import { map } from 'rxjs/operators';
import { IStatusBuyerPropertyGet } from '../../../models/statusBuyerProperty.model';
import { Observable } from 'rxjs';
import { IProperty } from '../../../models/property.model';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-inter-prop-buyer',
  templateUrl: './inter-prop-buyer.component.html',
  styleUrls: ['./inter-prop-buyer.component.scss'],
})
export class InterPropBuyerComponent implements OnInit {
  sBP: Observable<IStatusBuyerPropertyGet[]>;
  isLoad = false;

  constructor(
    private buyerService: BuyerService,
    private userSessionService: UserSessionService,
    private router: Router,
  ) {
    this.getLikes();
  }

  ngOnInit() {}
  getLikes() {
    const buyerId = this.userSessionService.userSession.value.id;
    this.sBP = this.buyerService
      .getBuyerById(buyerId)
      .pipe(map(res => res.statusBuyerProperty));
    this.isLoad = true;
  }
  itemDetail(item: IProperty, statusId: string) {
    const data: NavigationExtras = {
      queryParams: { id: item._id, statusId: statusId },
    };
    this.router.navigate(['credit-event-buyer'], data);
  }
}
