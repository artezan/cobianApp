import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { UserSessionService } from '../../../services/user-session.service';
import { Platform } from '@ionic/angular';
import { MdcTabActivatedEvent } from '@angular-mdc/web';
import { OnesignalService } from '../../../services/onesignal.service';
import { IUserSession } from '../../../models/userSession.model';
import { INotification } from '../../../models/notification.model';
import { FormatDatesFront } from '../../../_config/_helpers';

@Component({
  selector: 'app-list-notification',
  templateUrl: './list-notification.component.html',
  styleUrls: ['./list-notification.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListNotificationComponent implements OnInit, OnDestroy {
  section = 0;
  isDesktop = false;
  user: IUserSession;
  notifications: INotification[] = [];
  notificationsNew: INotification[] = [];
  notificationsOld: INotification[] = [];
  pageNumber = 1;
  isNew = true;
  Title;
  isLoad: boolean;

  constructor(
    private userSessionService: UserSessionService,
    private platform: Platform,
    private oneSignalService: OnesignalService,
  ) {
    this.isDesktop = platform.is('desktop');
    this.user = userSessionService.userSession.value;
    this.getNotification(this.user, this.pageNumber);
  }

  ngOnInit() {}
  logTab(event: MdcTabActivatedEvent): void {
    console.log(event.index);
    this.section = event.index;
  }
  getNotification(user: IUserSession, pageNumber) {
    this.oneSignalService
      .search(user.id, user.type, pageNumber, 10)
      .subscribe(nts => {
        if (pageNumber === 1) {
          this.notificationsNew = nts.filter(n => this.isNewTitle(n.readBy));
          this.notificationsOld = nts.filter(n => !this.isNewTitle(n.readBy));
        } else {
          this.notificationsNew = [
            ...this.notificationsNew,
            ...nts.filter(n => this.isNewTitle(n.readBy)),
          ];
          this.notificationsOld = [
            ...this.notificationsOld,
            ...nts.filter(n => !this.isNewTitle(n.readBy)),
          ];
        }

        console.log(this.notificationsNew);
        console.log(this.notificationsOld);
        this.isLoad = true;
      });
  }
  loadMore() {
    this.pageNumber++;
    console.log(this.pageNumber);
    this.getNotification(this.user, this.pageNumber);
  }
  ngOnDestroy() {
    this.notificationsNew.forEach(n => {
      n.readBy.push({
        readAt: new Date(),
        readerId: this.user.id,
      });
      this.oneSignalService.putNotification(n).subscribe();
    });
  }
  // helpers
  formatDates(date) {
    return FormatDatesFront(date);
  }
  isNewTitle(readby: any[]) {
    const id = readby.find(r => r.readerId === this.user.id);
    if (id !== undefined) {
      return false;
    } else {
      return true;
    }
  }
  trasforIcon(
    str:
      | 'like'
      | 'credit'
      | 'schedule'
      | 'ofert'
      | 'property'
      | 'build'
      | 'buyer'
      | 'goal'
      | 'celebrate',
  ) {
    if (str === 'like') {
      return 'thumb_up';
    } else if (str === 'credit') {
      return 'payment';
    } else if (str === 'schedule') {
      return 'event';
    } else if (str === 'ofert') {
      return 'monetization_on';
    } else if (str === 'property') {
      return 'domain';
    } else if (str === 'build') {
      return 'build';
    } else if (str === 'buyer') {
      return 'account_circle';
    } else if (str === 'goal') {
      return 'insert_chart';
    } else if (str === 'celebrate') {
      return 'check_circle_outline';
    }
  }
}
