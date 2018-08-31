import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ISchedule } from '../../../models/schedule.model';
import { BuyerService } from '../../../services/buyer.service';
import { UserSessionService } from '../../../services/user-session.service';
import { NavController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';

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
    private navController: NavController,
    private router: Router,
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
  calendarSelect(item: { year: number; month: number; day: number }) {
    if (item.day !== 0) {
      const isFinded = this.schedule.filter(
        s =>
          s.day === item.day && s.month === item.month && s.year === item.year,
      );
      if (isFinded.length > 0) {
        const data: NavigationExtras = { queryParams: item };
        this.router.navigate(['event-detail-buyer'], data);
      }
    }
  }
  getEvents() {
    this.router.navigate(['event-detail-buyer']);
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
