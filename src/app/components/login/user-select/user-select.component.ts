import { Component, OnInit } from '@angular/core';
import { PreBuyerService } from '../../../services/pre-buyer.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { IPreBuyer } from '../../../models/preBuyer';
import { FormatDatesFront } from '../../../_config/_helpers';
import { UserSessionService } from '../../../services/user-session.service';
import { IUserSession } from '../../../models/userSession.model';

@Component({
  selector: 'app-user-select',
  templateUrl: './user-select.component.html',
  styleUrls: ['./user-select.component.scss']
})
export class UserSelectComponent implements OnInit {
  user: IUserSession;
  preBuyer: IPreBuyer;
  isLoad: boolean;
  constructor(
    private route: ActivatedRoute,
    private preBuyerService: PreBuyerService,
    private router: Router,
    private userSession: UserSessionService
  ) {
    this.user = userSession.userSession.value;
    this.route.queryParams.subscribe(params => {
      if (params.id) {
        this.getBuyerById(params.id);
      } else if (this.user.type === 'preBuyer') {
        this.getBuyerById(this.user.id);
      }
    });
  }

  ngOnInit() {}
  getBuyerById(id) {
    this.isLoad = false;
    this.preBuyerService.getBuyerById(id).subscribe(b => {
      this.preBuyer = b;
      this.isLoad = true;
    });
  }
  formatDates(date): string {
    return FormatDatesFront(date);
  }
  goToBuild(id) {
    const data: NavigationExtras = { queryParams: { id: id } };
    this.router.navigate(['detail-prebuild-admin'], data);
  }
}
