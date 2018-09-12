import { Component, OnInit } from '@angular/core';
import { ISchedule } from '../../../models/schedule.model';
import { BuyerService } from '../../../services/buyer.service';
import { UserSessionService } from '../../../services/user-session.service';
import { NavController, AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { ScheduleService } from '../../../services/schedule.service';
import { FormatDatesFront } from '../../../_config/_helpers';

@Component({
  selector: 'app-list-schedule-admin',
  templateUrl: './list-schedule-admin.component.html',
  styleUrls: ['./list-schedule-admin.component.scss'],
})
export class ListScheduleAdminComponent implements OnInit {
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
  showFullCalendar = true;
  dateDaySelect;
  isAll: boolean;
  dayItem;
  constructor(
    private buyerService: BuyerService,
    private userSessionService: UserSessionService,
    private navController: NavController,
    private router: Router,
    private scheduleService: ScheduleService,
    public alertController: AlertController,
  ) {
    this.monthNumber = new Date().getMonth();
    this.year = new Date().getFullYear();
  }
  ngOnInit() {
    /* const buyer = this.userSessionService.userSession.value;
    this.buyerService.getBuyerById(buyer.id).subscribe(b => {
      this.schedule = b.schedule;
      this.isLoad = true;
    }); */
    this.getEvents();
  }
  calendarSelect(item: { year: number; month: number; day: number }) {
    if (item.day !== 0) {
      const isFinded = this.schedule.filter(
        s =>
          s.day === item.day && s.month === item.month && s.year === item.year,
      );
      if (isFinded.length > 0) {
        this.dateDaySelect = FormatDatesFront(
          new Date(item.year, item.month, item.day),
        );
        this.schedule = isFinded;
        this.showFullCalendar = false;
        this.isAll = false;
        this.dayItem = item;
      } else {
        this.newEventByDate(item);
      }
    }
  }
  getEvents() {
    this.isAll = true;
    this.scheduleService.getSchedule().subscribe(schedules => {
      console.log(schedules);
      this.schedule = schedules;
      this.isLoad = true;
    });
  }
  newEventByDate(date?: { year: number; month: number; day: number }) {
    if (date) {
      const data: NavigationExtras = {
        queryParams: { day: date.day, month: date.month, year: date.year },
      };
      this.router.navigate(['new-edit-schedule'], data);
    } else {
      this.router.navigate(['new-edit-schedule']);
    }
  }
  newEventById(id: string) {
    const data: NavigationExtras = {
      queryParams: { id: id },
    };
    this.router.navigate(['new-edit-schedule'], data);
  }
  async presentAlertPrompt() {
    const alert = await this.alertController.create(<any>{
      header: 'Prompt!',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Placeholder 1',
        },
        {
          name: 'name2',
          type: 'text',
          id: 'name2-id',
          value: 'hello',
          placeholder: 'Placeholder 2',
        },
        {
          name: 'name3',
          type: 'text',
          value: 'http://ionicframework.com',
          placeholder: 'Favorite site ever',
        },
        // input date with min & max
        {
          name: 'name4',
          type: 'date',
          min: '2017-03-01',
          max: '2018-01-12',
        },
        // input date without min nor max
        {
          name: 'name5',
          type: 'date',
        },
        {
          name: 'name6',
          type: 'number',
          min: -5,
          max: 10,
        },
        {
          name: 'name7',
          type: 'number',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          },
        },
      ],
    });

    await alert.present();
  }

  // _helpers
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
  formatDate(item) {
    return FormatDatesFront(item);
  }
  formatState(state: string) {
    if (state === 'verde') {
      return 'En espera de confirmación';
    } else if (state === 'amarillo') {
      return 'Confirmada en espera de asistencia';
    } else if (state === 'rojo') {
      return 'Cita pasada';
    } else if (state === 'azul') {
    }
  }
}
