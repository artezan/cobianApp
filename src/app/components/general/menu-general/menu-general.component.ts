import { Component, OnInit, Input } from '@angular/core';
import { SocketIoService } from '../../../services/socket-io.service';
import { IUserSession } from '../../../models/userSession.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Platform, PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';

@Component({
  selector: 'app-menu-general',
  templateUrl: './menu-general.component.html',
  styleUrls: ['./menu-general.component.scss'],
})
export class MenuGeneralComponent implements OnInit {
  /**
   * true menu,
   * false back
   */
  @Input()
  isMenuButton: boolean;
  @Input()
  colorMenuButton: string;
  @Input()
  titleMenu: string;
  @Input()
  buttonNotification: string;
  @Input()
  buttonUser: string;
  user: IUserSession;
  numOfNewNoti: BehaviorSubject<number>;
  isDesktop: boolean;
  constructor(
    private socketIOService: SocketIoService,
    private platform: Platform,
    public popoverController: PopoverController,
  ) {
    this.isDesktop = this.platform.is('desktop');
    this.numOfNewNoti = this.socketIOService.numOfNewNoti;
  }

  ngOnInit() {}
  async presentPopover(ev: any) {
    // await this.popoverController.componentOnReady();
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      // translucent: true,
    });
    return await popover.present();
  }
}
