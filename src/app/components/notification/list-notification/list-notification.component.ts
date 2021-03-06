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
import { DialogGeneralComponent } from '../../general/dialog-general/dialog-general.component';
import { MatDialog } from '@angular/material';
import { END_POINT } from '../../../_config/api.end-points';

@Component({
  selector: 'app-list-notification',
  templateUrl: './list-notification.component.html',
  styleUrls: ['./list-notification.component.scss'],
  encapsulation: ViewEncapsulation.None
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
  currentSection: string;

  constructor(
    private userSessionService: UserSessionService,
    private platform: Platform,
    private oneSignalService: OnesignalService,
    private socketIOService: SocketIoService,
    private router: Router,
    public dialog: MatDialog
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
          n.type === 'ofert'
      );
      this.notificationsOld = this.notificationsOld.filter(
        n =>
          n.type === 'buyer' ||
          n.type === 'like' ||
          n.type === 'credit' ||
          n.type === 'ofert'
      );
    } else if (numTab === 2) {
      this.notificationsNew = this.notificationsNew.filter(
        n => n.type === 'schedule'
      );
      this.notificationsOld = this.notificationsOld.filter(
        n => n.type === 'schedule'
      );
    } else if (numTab === 3) {
      this.notificationsNew = this.notificationsNew.filter(
        n => n.type === 'celebrate' || n.type === 'goal'
      );
      this.notificationsOld = this.notificationsOld.filter(
        n => n.type === 'celebrate' || n.type === 'goal'
      );
    } else if (numTab === 4) {
      this.notificationsNew = this.notificationsNew.filter(
        n => n.type === 'build' || n.type === 'property'
      );
      this.notificationsOld = this.notificationsOld.filter(
        n => n.type === 'build' || n.type === 'property'
      );
    }
  }
  logTab2(event: MdcTabActivatedEvent): void {
    this.notificationsNew = this.notificationsNewBack;
    this.notificationsOld = this.notificationsOldBack;
    const numTab = event.index;
    if (numTab === 1) {
      this.notificationsNew = this.notificationsNew.filter(
        n => n.type === 'ofert'
      );
      this.notificationsOld = this.notificationsOld.filter(
        n => n.type === 'ofert'
      );
    } else if (numTab === 2) {
      this.notificationsNew = this.notificationsNew.filter(
        n => n.type === 'credit'
      );
      this.notificationsOld = this.notificationsOld.filter(
        n => n.type === 'credit'
      );
    } else if (numTab === 3) {
      this.notificationsNew = this.notificationsNew.filter(
        n => n.type === 'schedule'
      );
      this.notificationsOld = this.notificationsOld.filter(
        n => n.type === 'schedule'
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
            ...nts.filter(n => this.isNewTitle(n.readBy))
          ];
          this.notificationsOld = [
            ...this.notificationsOld,
            ...nts.filter(n => !this.isNewTitle(n.readBy))
          ];
          this.notificationsNewBack = this.notificationsNew;
          this.notificationsOldBack = this.notificationsOld;
        }
        const isCelebrate = this.notificationsNew.filter(
          n => n.type === 'celebrate' || n.title === 'Propiedad Adquirida'
        );
        console.log('cele', isCelebrate);
        if (isCelebrate.length > 0) {
          isCelebrate.forEach(n => {
            this.dialogCelebrate(n);
          });
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
        readerId: this.user.id
      });
      this.oneSignalService.putNotification(n).subscribe();
    });
  }
  private markAsRead(noti: INotification) {
    noti.readBy.push({
      readAt: new Date(),
      readerId: this.user.id
    });
    this.oneSignalService.putNotification(noti).subscribe(() => {
      this.socketIOService.minusOne();
      const indexFind = this.notificationsNew.findIndex(
        n => n._id === noti._id
      );
      if (indexFind !== -1) {
        this.notificationsNew.splice(indexFind, 1);
        this.notificationsNewBack = this.notificationsNew;
        this.notificationsOld.push(noti);
        this.notificationsOldBack = this.notificationsOld;
      }
    });
  }

  goToDetails(n: INotification) {
    this.markAsRead(n);
    if (this.user.type === 'preBuyer') {
      this.router.navigate(['login-select-user']);
    } else if (this.user.type === 'maker') {
      this.router.navigate(['detail-build-admin']);
    } else {
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
      } else if (n.type === 'msg') {
        this.router.navigate(['chat']);
      }
    }
  }
  getNotificationRealTime() {
    this.socketIOService.onNewPost().subscribe(ntf => {
      this.notificationsNew.push(ntf);
      this.notificationsNewBack = this.notificationsNew;
    });
  }
  // dialog
  private async dialogCelebrate(n: INotification) {
    const dialogRef = this.dialog.open(DialogGeneralComponent, {
      /*  maxWidth: '50%',
      minWidth: '20%', */
      data: {
        header: 'Felicidades',
        subHeader: n.message,
        body: `<img src="${END_POINT.IP}celebrate.png">`,
        isform: false,
        hideButtonCancel: true,
        okButton: 'Gracias'
      }
    });
    const sub = dialogRef.componentInstance.buttons.subscribe(res => {
      this.markAsRead(n);
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
      | 'celebrate'
      | 'msg'
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
    } else if (str === 'msg') {
      return 'chat';
    }
  }
  onSectionChange(sectionId: string) {
    console.log('sectionId', sectionId);
    this.currentSection = sectionId;
  }

  scrollTo(section) {
    document.querySelector('#' + section).scrollIntoView();
  }
  onScroll(e) {
    // console.log(e);
  }
}
