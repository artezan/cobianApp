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
    { str: '7am', hr: 7 },
    { str: '8am', hr: 8 },
    { str: '9am', hr: 9 },
    { str: '10am', hr: 10 },
    { str: '11am', hr: 11 },
    { str: '12pm', hr: 12 },
    { str: '1pm', hr: 13 },
    { str: '2pm', hr: 14 },
    { str: '3pm', hr: 15 },
    { str: '4pm', hr: 16 },
    { str: '5pm', hr: 17 },
    { str: '6pm', hr: 18 },
    { str: '7pm', hr: 19 },
    { str: '8pm', hr: 20 },
    { str: '9pm', hr: 21 },
    { str: '10pm', hr: 22 },
    { str: '11pm', hr: 23 },
    { str: '12am', hr: 24 },
    { str: '1am', hr: 1 },
    { str: '2am', hr: 2 },
    { str: '3am', hr: 3 },
    { str: '4am', hr: 4 },
    { str: '5am', hr: 5 },
  ];
  /**
   * open event
   */
  showRow;
  schedulesShow: ISchedule[];
  @Input()
  isWeek = true;
  @Input()
  add;
  @Input()
  remove;
  @Input()
  schedules: ISchedule[] = [];
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
  constructor() {}
  addWeek() {
    this.currentWeek = new Date(this.currentWeek.getTime() + 7 * 86400000);
    this.showRow = undefined;
  }
  removeWeek() {
    this.currentWeek = new Date(this.currentWeek.getTime() - 7 * 86400000);
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
  showTd(schedules: ISchedule[], hrRow: number, numOfdays) {
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
  formatDate(y, m, d, hr, min) {
    return ` ${FormatDatesFront(new Date(y, m, d))} a las ${FormatHoursFront(
      hr,
      min,
    )} `;
  }
}
