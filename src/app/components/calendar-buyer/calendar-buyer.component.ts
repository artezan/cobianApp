import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BuyerService } from '../../services/buyer.service';
import { UserSessionService } from '../../services/user-session.service';
import { ISchedule } from '../../models/schedule.model';

@Component({
  selector: 'app-calendar-buyer',
  templateUrl: './calendar-buyer.component.html',
  styleUrls: ['./calendar-buyer.component.scss'],
})
export class CalendarBuyerComponent implements OnInit {
  month = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  year: number;
  monthNumber: number;
  schedule: ISchedule[];
  isLoad = false;
  constructor(
    private buyerService: BuyerService,
    private userSessionService: UserSessionService,
  ) {
    this.monthNumber = new Date().getMonth();
    this.year = new Date().getFullYear();
  }
  ngOnInit() {
    const buyer = this.userSessionService.userSession.value;
    this.buyerService.getBuyerById(buyer.id).subscribe(b => {
      this.schedule = b.schedule;
      this.isLoad = true;
    });
  }
  backOne() {
    if (this.monthNumber === 0) {
      this.year--;
      this.monthNumber = 11;
    } else {
      this.monthNumber--;
    }
  }
  fowardOne() {
    if (this.monthNumber === 11) {
      this.year++;
      this.monthNumber = 0;
    } else {
      this.monthNumber++;
    }
  }
}
