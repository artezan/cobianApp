import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { ISchedule } from '../../../models/schedule.model';
import { FormatDatesFront, FormatHoursFront } from '../../../_config/_helpers';

@Component({
  selector: 'app-calendar-specific',
  templateUrl: './calendar-specific.component.html',
  styleUrls: ['./calendar-specific.component.scss'],
})
export class CalendarSpecificComponent implements OnInit, OnChanges {
  numOfdays = [0, 1, 2, 3, 4, 5, 6];
  hoursOfDay = [
    { str: '6am', hr: 6 },
    { str: ' ', hr: 6 },
    { str: '7am', hr: 7 },
    { str: ' ', hr: 7 },
    { str: '8am', hr: 8 },
    { str: ' ', hr: 8 },
    { str: '9am', hr: 9 },
    { str: ' ', hr: 9 },
    { str: '10am', hr: 10 },
    { str: ' ', hr: 10 },
    { str: '11am', hr: 11 },
    { str: ' ', hr: 11 },
    { str: '12pm', hr: 12 },
    { str: ' ', hr: 12 },
    { str: '1pm', hr: 13 },
    { str: ' ', hr: 13 },
    { str: '2pm', hr: 14 },
    { str: ' ', hr: 14 },
    { str: '3pm', hr: 15 },
    { str: ' ', hr: 15 },
    { str: '4pm', hr: 16 },
    { str: ' ', hr: 16 },
    { str: '5pm', hr: 17 },
    { str: ' ', hr: 17 },
    { str: '6pm', hr: 18 },
    { str: ' ', hr: 18 },
    { str: '7pm', hr: 19 },
    { str: ' ', hr: 19 },
    { str: '8pm', hr: 20 },
    { str: ' ', hr: 20 },
    { str: '9pm', hr: 21 },
    { str: ' ', hr: 21 },
    { str: '10pm', hr: 22 },
    { str: ' ', hr: 22 },
    { str: '11pm', hr: 23 },
    { str: ' ', hr: 23 },
    { str: '12am', hr: 24 },
    { str: ' ', hr: 24 },
    { str: '1am', hr: 1 },
    { str: ' ', hr: 1 },
    { str: '2am', hr: 2 },
    { str: ' ', hr: 2 },
    { str: '3am', hr: 3 },
    { str: ' ', hr: 3 },
    { str: '4am', hr: 4 },
    { str: ' ', hr: 4 },
    { str: '5am', hr: 5 },
    { str: ' ', hr: 5 },
  ];
  nameDays = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];
  /**
   * open event
   */
  showRow;
  schedulesShow: ISchedule[];
  elevationCol;
  @Input()
  isWeek = true;
  @Input()
  add;
  @Input()
  remove;
  @Input()
  schedules: ISchedule[] = [];
  @Input()
  currentWeek = new Date();
  currenDate = new Date().getDate();
  @Output()
  editEvent: EventEmitter<string> = new EventEmitter();
  @Output()
  newEvent: EventEmitter<{
    year: number;
    month: number;
    day: number;
    hour: number;
  }> = new EventEmitter();
  @Output()
  editPersonalEvent: EventEmitter<string> = new EventEmitter();
  @Output()
  deletedEvent: EventEmitter<string> = new EventEmitter();
  @Output()
  titleNavBar: EventEmitter<Date> = new EventEmitter();
  constructor() {}
  addWeek() {
    if (this.isWeek) {
      this.currentWeek = new Date(this.currentWeek.getTime() + 7 * 86400000);
    } else {
      this.currentWeek = new Date(this.currentWeek.getTime() + 1 * 86400000);
    }
    this.titleNavBar.emit(this.currentWeek);
    this.showRow = undefined;
  }
  removeWeek() {
    if (this.isWeek) {
      this.currentWeek = new Date(this.currentWeek.getTime() - 7 * 86400000);
    } else {
      this.currentWeek = new Date(this.currentWeek.getTime() - 1 * 86400000);
    }
    this.titleNavBar.emit(this.currentWeek);
    this.showRow = undefined;
  }

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes.add) {
      if (changes.add.currentValue) {
        this.addWeek();
      }
    }
    if (changes.remove) {
      if (changes.remove.currentValue) {
        this.removeWeek();
      }
    }
    if (changes.currentWeek) {
      if (changes.currentWeek.currentValue) {
        this.currentWeek = changes.currentWeek.currentValue;
      }
    }
  }
  getDays(numDay: number) {
    const currentDay = this.currentWeek.getDay();
    const diffDay = numDay - currentDay;
    const d = new Date(this.currentWeek.getTime() + diffDay * 86400000);
    return `${d.getMonth() + 1} / ${d.getDate()} `;
  }
  getDays2(numDay: number) {
    const currentDay = this.currentWeek.getDay();
    const diffDay = numDay - currentDay;
    const d = new Date(this.currentWeek.getTime() + diffDay * 86400000);
    return d.getDate();
  }
  getScheduleEvents(hour, numDay): ISchedule[] {
    const date = this.getDays2(numDay);
    const events = this.schedules.filter(
      s =>
        s.day === date &&
        s.month === this.currentWeek.getMonth() &&
        s.year === this.currentWeek.getFullYear() &&
        s.hour === hour,
    );
    return events;
  }
  getScheduleEventsByDay(numDay): ISchedule[] {
    const date = this.getDays2(numDay);
    const events = this.schedules.filter(
      s =>
        s.day === date &&
        s.month === this.currentWeek.getMonth() &&
        s.year === this.currentWeek.getFullYear(),
    );
    return events;
  }
  showTd(schedules: ISchedule[], hrRow: number, numOfdays) {
    //  insertNewRow
    if (schedules.length > 0) {
      this.showRow = hrRow;
      this.schedulesShow = schedules;
    } else {
      this.newEvent.emit({
        day: this.getDays2(numOfdays),
        month: this.currentWeek.getMonth(),
        year: this.currentWeek.getFullYear(),
        hour: hrRow,
      });
    }
  }
  // _helpers

  formatDate(y, m, d, hr, min) {
    return ` ${FormatDatesFront(new Date(y, m, d))} a las ${FormatHoursFront(
      hr,
      min,
    )} `;
  }
  formatDate2(date: Date) {
    return `${this.nameDays[date.getDay()]} ${FormatDatesFront(date)}`;
  }
  formatState(state: string) {
    if (state === 'verde') {
      return 'En espera de confirmación';
    } else if (state === 'amarillo') {
      return 'Confirmada en espera de asistencia';
    } else if (state === 'rojo') {
      return 'Cita pasada';
    } else if (state === 'azul') {
    } else if (state === undefined) {
      return 'Evento Personal';
    } else if (state === 'gris') {
      return 'Solicitud de Cita';
    }
  }
  formatHours(hours, minutes) {
    return FormatHoursFront(hours, minutes);
  }
  goToNew(rowHour, currentWeek) {
    console.log('gottoo');
    const isGo =
      this.getScheduleEvents(rowHour.hr, currentWeek.getDay()).length === 0;
    if (isGo) {
      this.newEvent.emit({
        day: currentWeek.getDate(),
        month: this.currentWeek.getMonth(),
        year: this.currentWeek.getFullYear(),
        hour: rowHour.hr,
      });
    }
  }
}
