import { Component, OnInit } from '@angular/core';

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
  nombreMes;
  mesActual;
  dias = [];
  semana = [];
  diaCal = new Array();
  clickmas = 0;
  clickmenos = 0;
  alerta;
  proximacita;
  hora;
  place;
  summary;
  description;

  constructor() {
    // this.calendar();
  }
  // tslint:disable:no-var-keyword
  ngOnInit() {
    /*  for (let i = 0; i < 12; i++) {
      this.calendar2(i);
    } */
    this.calendar2(7, 2018);
  }
  // tslint:disable:prefer-const
  calendar2(month, year) {
    // tslint:disable:quotemark
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

    // tslint:disable-next-line:max-line-length
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
      if (i === day && month === cmonth) {
        padding +=
          // tslint:disable-next-line:max-line-length
          '<td style="padding: 15px !important" >' + i + '</td>';
      } else {
        padding +=
          // tslint:disable-next-line:quotemark
          '<td style="padding: 15px !important" class="row-number-day" >' +
          i +
          '</td>';
      }
      tempweekday2++;
      console.log(new Date(year, month, i));
      i++;
    }

    // Outputing the calendar onto the site.  Also, putting in the month name and days of the week.
    var calendarTable = '<table style= "width: 100%;" > ';
    calendarTable +=
      '<tr class="row-name-day" >  <td>Sun</td>  <td>Mon</td> <td>Tues</td> <td>Wed</td> <td>Thurs</td> <td>Fri</td> <td>Sat</td> </tr>';
    calendarTable += '<tr class="row-number-day" >';
    calendarTable += padding;
    calendarTable += '</tr></table>';
    document.getElementById('calendar').innerHTML += calendarTable;
  }
}
