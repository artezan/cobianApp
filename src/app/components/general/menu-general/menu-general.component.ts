import { Component, OnInit, Input } from '@angular/core';
import { SocketIoService } from '../../../services/socket-io.service';
import { OnesignalService } from '../../../services/onesignal.service';
import { UserSessionService } from '../../../services/user-session.service';
import { IUserSession } from '../../../models/userSession.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-menu-general',
  templateUrl: './menu-general.component.html',
  styleUrls: ['./menu-general.component.scss'],
})
export class MenuGeneralComponent implements OnInit {
  @Input()
  isMenuButton: boolean;
  @Input()
  colorMenuButton: string;
  @Input()
  titleMenu: string;
  @Input()
  buttonNotification: string;
  @Input()
  buttonEnd2: string;
  user: IUserSession;
  numOfNewNoti: BehaviorSubject<number>;
  isDesktop: boolean;

  constructor(
    private socketIOService: SocketIoService,
    private userSessionService: UserSessionService,
    private platform: Platform,
  ) {
    this.isDesktop = platform.is('desktop');
    this.numOfNewNoti = this.socketIOService.numOfNewNoti;
    this.userSessionService.userSession.subscribe(user => {
      if (user.name) {
        this.user = user;
      }
    });
  }

  ngOnInit() {}
}
