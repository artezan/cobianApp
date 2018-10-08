import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { UserSessionService } from '../../../services/user-session.service';
import { Platform } from '@ionic/angular';
import { MdcTabActivatedEvent } from '@angular-mdc/web';
import { OnesignalService } from '../../../services/onesignal.service';
import { IUserSession } from '../../../models/userSession.model';
import { INotification } from '../../../models/notification.model';
import { FormatDatesFront } from '../../../_config/_helpers';
import { Router } from '@angular/router';
import { SocketIoService } from '../../../services/socket-io.service';

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
  notificationsNewBack: INotification[] = [];
  notificationsOld: INotification[] = [];
  notificationsOldBack: INotification[] = [];
  pageNumber = 1;
  isNew = true;
  Title;
  isLoad: boolean;
  isSpinner = false;

  constructor(
    private userSessionService: UserSessionService,
    private platform: Platform,
    private oneSignalService: OnesignalService,
    private socketIOService: SocketIoService,
    private router: Router,
  ) {
    this.isLoad = false;
    this.isDesktop = platform.is('desktop');
    this.user = userSessionService.userSession.value;
    this.getNotification(this.user, this.pageNumber);
    this.getNotificationRealTime();
  }

  ngOnInit() {}
  logTab(event: MdcTabActivatedEvent): void {
    this.notificationsNew = this.notificationsNewBack;
    this.notificationsOld = this.notificationsOldBack;
    const numTab = event.index;
    if (numTab === 1) {
      this.notificationsNew = this.notificationsNew.filter(
        n =>
          n.type === 'buyer' ||
          n.type === 'like' ||
          n.type === 'credit' ||
          n.type === 'ofert',
      );
      this.notificationsOld = this.notificationsOld.filter(
        n =>
          n.type === 'buyer' ||
          n.type === 'like' ||
          n.type === 'credit' ||
          n.type === 'ofert',
      );
    } else if (numTab === 2) {
      this.notificationsNew = this.notificationsNew.filter(
        n => n.type === 'schedule',
      );
      this.notificationsOld = this.notificationsOld.filter(
        n => n.type === 'schedule',
      );
    } else if (numTab === 3) {
      this.notificationsNew = this.notificationsNew.filter(
        n => n.type === 'celebrate' || n.type === 'goal',
      );
      this.notificationsOld = this.notificationsOld.filter(
        n => n.type === 'celebrate' || n.type === 'goal',
      );
    } else if (numTab === 4) {
      this.notificationsNew = this.notificationsNew.filter(
        n => n.type === 'build' || n.type === 'property',
      );
      this.notificationsOld = this.notificationsOld.filter(
        n => n.type === 'build' || n.type === 'property',
      );
    }
  }
  logTab2(event: MdcTabActivatedEvent): void {
    this.notificationsNew = this.notificationsNewBack;
    this.notificationsOld = this.notificationsOldBack;
    const numTab = event.index;
    if (numTab === 1) {
      this.notificationsNew = this.notificationsNew.filter(
        n => n.type === 'ofert',
      );
      this.notificationsOld = this.notificationsOld.filter(
        n => n.type === 'ofert',
      );
    } else if (numTab === 2) {
      this.notificationsNew = this.notificationsNew.filter(
        n => n.type === 'credit',
      );
      this.notificationsOld = this.notificationsOld.filter(
        n => n.type === 'credit',
      );
    } else if (numTab === 3) {
      this.notificationsNew = this.notificationsNew.filter(
        n => n.type === 'schedule',
      );
      this.notificationsOld = this.notificationsOld.filter(
        n => n.type === 'schedule',
      );
    }
  }
  getNotification(user: IUserSession, pageNumber) {
    this.oneSignalService
      .search(user.id, user.type, pageNumber, 10)
      .subscribe(nts => {
        if (pageNumber === 1) {
          this.notificationsNew = nts.filter(n => this.isNewTitle(n.readBy));
          this.notificationsOld = nts.filter(n => !this.isNewTitle(n.readBy));
          this.notificationsNewBack = this.notificationsNew;
          this.notificationsOldBack = this.notificationsOld;
        } else {
          this.notificationsNew = [
            ...this.notificationsNew,
            ...nts.filter(n => this.isNewTitle(n.readBy)),
          ];
          this.notificationsOld = [
            ...this.notificationsOld,
            ...nts.filter(n => !this.isNewTitle(n.readBy)),
          ];
          this.notificationsNewBack = this.notificationsNew;
          this.notificationsOldBack = this.notificationsOld;
        }
        this.isSpinner = false;
        this.isLoad = true;
      });
  }
  loadMore() {
    this.isSpinner = true;
    this.notificationsNew = this.notificationsNewBack;
    this.notificationsOld = this.notificationsOldBack;
    this.pageNumber++;
    this.getNotification(this.user, this.pageNumber);
  }
  ngOnDestroy() {
    this.socketIOService.resetNum();
    this.notificationsNew.forEach(n => {
      n.readBy.push({
        readAt: new Date(),
        readerId: this.user.id,
      });
      this.oneSignalService.putNotification(n).subscribe();
    });
  }
  private markAsRead(noti: INotification) {
    noti.readBy.push({
      readAt: new Date(),
      readerId: this.user.id,
    });
    this.oneSignalService.putNotification(noti).subscribe(() => {
      this.socketIOService.minusOne();
      const indexFind = this.notificationsNew.findIndex(
        n => n._id === noti._id,
      );
      if (indexFind !== -1) {
        this.notificationsNew.splice(indexFind, 1);
        this.notificationsNewBack = this.notificationsNew;
      }
    });
  }

  goToDetails(n: INotification) {
    this.markAsRead(n);
    if (n.type === 'build') {
      this.router.navigate(['list-build-admin']);
    } else if (n.type === 'buyer') {
      this.router.navigate(['list-buyer-admin']);
    } else if (n.type === 'celebrate' || n.type === 'goal') {
      this.router.navigate(['list-goals-admin']);
    } else if (n.type === 'property') {
      if (this.user.type === 'buyer') {
        this.router.navigate(['inter-prop-buyer']);
      } else {
        this.router.navigate(['list-prop-admin']);
      }
    } else if (n.type === 'schedule') {
      if (this.user.type === 'buyer') {
        this.router.navigate(['calendar-buyer']);
      } else {
        this.router.navigate(['list-schedule-admin']);
      }
    } else if (n.type === 'ofert') {
      if (this.user.type === 'buyer') {
        this.router.navigate(['ofert-buyer']);
      } else {
        this.router.navigate(['list-ofert-admin']);
      }
    } else if (n.type === 'credit') {
      if (this.user.type === 'buyer') {
        this.router.navigate(['inter-prop-buyer']);
      } else {
        this.router.navigate(['list-credit-admin']);
      }
    } else if (n.type === 'like') {
      if (this.user.type === 'buyer') {
        this.router.navigate(['inter-prop-buyer']);
      } else {
        this.router.navigate(['list-buyer-admin']);
      }
    }
  }
  getNotificationRealTime() {
    this.socketIOService.onNewPost().subscribe(ntf => {
      this.notificationsNew.push(ntf);
      this.notificationsNewBack = this.notificationsNew;
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
