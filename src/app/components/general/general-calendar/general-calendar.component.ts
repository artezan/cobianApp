import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { ISchedule } from '../../../models/schedule.model';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-general-calendar',
  templateUrl: './general-calendar.component.html',
  styleUrls: ['./general-calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GeneralCalendarComponent implements OnInit, OnChanges {
  @Input()
  month: number = new Date().getMonth();
  @Input()
  year: number = new Date().getFullYear();
  @Input()
  schedules: ISchedule[] = [];
  @Output()
  calendarSelect = new EventEmitter<any>();
  flag = false;
  constructor(public toastController: ToastController) {}
  // tslint:disable:no-var-keyword
  // tslint:disable:quotemark
  // tslint:disable:prefer-const
  // tslint:disable:max-line-length

  ngOnInit() {
    this.calendar2(new Date().getMonth(), new Date().getFullYear());
  }
  click(event) {
    this.calendarSelect.emit({
      year: this.year,
      month: this.month,
      day: +event.srcElement.id,
    });
  }
  getScheduleEvents(year, month, day): string {
    let numOfEvent = 0;
    let str = '';
    const events = this.schedules.filter(
      s => s.day === day && s.month === month && s.year === year,
    );
    if (events.length > 0) {
      if (events.length === 1) {
        if (events[0].status) {
          str +=
            '<div class="event-of-day-' +
            events[0].status +
            '" id="' +
            day +
            '">' +
            events.length +
            ' Evento </div>';
        } else {
          str +=
            '<div class="event-of-day" id="' +
            day +
            '">' +
            events.length +
            ' Evento </div>';
        }
      } else {
        str +=
          '<div class="event-of-day" id="' +
          day +
          '">' +
          events.length +
          ' Eventos </div>';
      }
    }
    return str;
  }
  async presentToast() {
    if (this.flag === false) {
      const toast = await this.toastController.create({
        message: 'Eventos pendientes hoy',
        showCloseButton: true,
        position: 'bottom',
        closeButtonText: 'OK',
        cssClass: 'toast-alert',
        duration: 50000,
      });
      toast.present();
      this.flag = true;
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.month) {
      if (changes.month.currentValue) {
        this.calendar2(this.month, this.year);
      }
    }
    if (changes.year) {
      if (changes.year.currentValue) {
        this.calendar2(this.month, this.year);
      }
    }
  }
  calendar2(month: number, year: number) {
    // Variables to be used later.  Place holders right now.
    var padding = '';
    var totalFeb = '';
    var i = 1;
    var testing = '';

    var current = new Date();
    var cmonth = current.getMonth(); // current (today) month
    var day = current.getDate();
    var tempMonth = month + 1; // +1; // Used to match up the current month with the correct start date.
    var prevMonth = month - 1;

    // Determing if Feb has 28 or 29 days in it.
    if (month === 1) {
      if ((year % 100 !== 0 && year % 4 === 0) || year % 400 === 0) {
        totalFeb = '29';
      } else {
        totalFeb = '28';
      }
    }

    // Setting up arrays for the name of the months, days, and the number of days in the month.
    var monthNames = [
      'Jan',
      'Feb',
      'March',
      'April',
      'May',
      'June',
      'July',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec',
    ];
    var dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thrusday',
      'Friday',
      'Saturday',
    ];
    var totalDays = [
      '31',
      '' + totalFeb + '',
      '31',
      '30',
      '31',
      '30',
      '31',
      '31',
      '30',
      '31',
      '30',
      '31',
    ];

    // Temp values to get the number of days in current month, and previous month. Also getting the day of the week.
    var tempDate = new Date(tempMonth + ' 1 ,' + year);
    var tempweekday = tempDate.getDay();
    var tempweekday2 = tempweekday;
    var dayAmount = totalDays[month];

    // After getting the first day of the week for the month, padding the other days for that week with the previous months days.  IE, if the first day of the week is on a Thursday, then this fills in Sun - Wed with the last months dates, counting down from the last day on Wed, until Sunday.
    while (tempweekday > 0) {
      padding += '<td ></td>';
      // preAmount++;
      tempweekday--;
    }
    // Filling in the calendar with the current month days in the correct location along.
    while (i <= +dayAmount) {
      // Determining when to start a new row
      if (tempweekday2 > 6) {
        tempweekday2 = 0;
        padding += '</tr><tr >';
      }

      // tslint:disable-next-line:max-line-length
      // checking to see if i is equal to the current day, if so then we are making the color of that cell a different color using CSS. Also adding a rollover effect to highlight the day the user rolls over. This loop creates the actual calendar that is displayed.
      const eventsOfDay: string = this.getScheduleEvents(year, month, i);
      if (eventsOfDay !== '') {
        if (i === day && month === cmonth) {
          padding +=
            '<td class="row-number-day2" id="' +
            i +
            '"><div class="current-day">' +
            i +
            eventsOfDay +
            '</div></td>';
          this.presentToast();
        } else {
          padding +=
            '<td class="row-number-day2" id="' +
            i +
            '" >' +
            i +
            eventsOfDay +
            '</td>';
        }
      } else {
        if (i === day && month === cmonth) {
          padding +=
            '<td class=" row-number-day " id="' +
            i +
            '" ><div class="current-day">' +
            i +
            '</div></td>';
        } else {
          padding +=
            '<td class="row-number-day" id="' + i + '" >' + i + '</td>';
        }
      }

      tempweekday2++;

      i++;
    }
    if (tempweekday2 < 7) {
      let fillEnd = 7 - tempweekday2;
      while (fillEnd > 0) {
        padding += '<td ></td>';
        fillEnd--;
      }
    }

    // Outputing the calendar onto the site.  Also, putting in the month name and days of the week.
    var calendarTable = '<table class="calendar-table " > ';
    calendarTable +=
      '<tr class="row-name-day " >  <td class="row-name-day ">Do</td>  <td class="row-name-day ">Lu</td> <td class="row-name-day ">Ma</td> <td class="row-name-day ">Mi</td> <td class="row-name-day ">Ju</td> <td class="row-name-day ">Vi</td> <td class="row-name-day ">Sa</td> </tr>';
    calendarTable += '<tr class="row-number-day" >';
    calendarTable += padding;
    calendarTable += '</tr></table>';
    document.getElementById('calendar').innerHTML = calendarTable;
  }
}
