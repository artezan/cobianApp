import { Component, OnInit } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { UserSessionService } from './services/user-session.service';
import { Router } from '@angular/router';
import { IUserSession } from './models/userSession.model';
import { CONST_GENERAL } from './_config/_const-general';
import { map } from 'rxjs/operators';
import { SocketIoService } from './services/socket-io.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { OnesignalService } from './services/onesignal.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  public appPages = [
    // buyer
    {
      title: 'Propiedades',
      url: '/list-prop-buyer',
      icon: 'business',
      userType: 'buyer',
    },
    {
      title: 'Calendario',
      url: '/calendar-buyer',
      icon: 'calendar',
      userType: 'buyer',
    },
    {
      title: 'Lista de deseos',
      url: '/inter-prop-buyer',
      icon: 'heart',
      userType: 'buyer',
    },
    {
      title: 'Ofertas',
      url: '/ofert-buyer',
      icon: 'clipboard',
      userType: 'buyer',
    },
    {
      title: 'Editar Perfil',
      url: '/new-buyer',
      icon: 'contact',
      userType: 'buyer',
    },
    // admin
    {
      title: 'Principal',
      url: '/main-admin',
      icon: 'home',
      userType: 'administrator',
    },
    {
      title: 'Consumidores',
      url: '/list-buyer-admin',
      icon: 'clipboard',
      userType: 'administrator',
    },
    {
      title: 'Asesores',
      url: '/list-adviser-admin',
      icon: 'people',
      userType: 'administrator',
    },
    {
      title: 'Dueño',
      url: '/list-seller-admin',
      icon: 'cash',
      userType: 'administrator',
    },
    {
      title: 'Oficina',
      url: '/list-office-admin',
      icon: 'desktop',
      userType: 'administrator',
    },
    {
      title: 'Propiedades',
      url: '/list-prop-admin',
      icon: 'business',
      userType: 'administrator',
    },
    {
      title: 'Créditos',
      url: '/list-credit-admin',
      icon: 'document',
      userType: 'administrator',
    },
    {
      title: 'Ofertas',
      url: '/list-ofert-admin',
      icon: 'card',
      userType: 'administrator',
    },
    {
      title: 'Obras',
      url: '/list-build-admin',
      icon: 'construct',
      userType: 'administrator',
    },
    {
      title: 'Constructores',
      url: '/list-maker-admin',
      icon: 'walk',
      userType: 'administrator',
    },
    {
      title: 'Calendario',
      url: '/list-schedule-admin',
      icon: 'calendar',
      userType: 'administrator',
    },
    {
      title: 'Metas',
      url: '/list-goals-admin',
      icon: 'stats',
      userType: 'administrator',
    },
    {
      title: 'Simulador Match',
      url: '/simulate-search-admin',
      icon: 'heart-empty',
      userType: 'administrator',
    },
    {
      title: 'Propiedades Apartadas',
      url: '/list-salesprop-admin',
      icon: 'timer',
      userType: 'administrator',
    },
    {
      title: 'Propiedades Aquiridas',
      url: '/list-sales-admin',
      icon: 'trending-up',
      userType: 'administrator',
    },
    // asesores
    {
      title: 'Consumidores',
      url: '/list-buyer-admin',
      icon: 'clipboard',
      userType: 'adviser',
    },
    {
      title: 'Propiedades',
      url: '/list-prop-admin',
      icon: 'business',
      userType: 'adviser',
    },
    {
      title: 'Calendario',
      url: '/list-schedule-admin',
      icon: 'calendar',
      userType: 'adviser',
    },
    {
      title: 'Metas',
      url: '/list-goals-admin',
      icon: 'stats',
      userType: 'adviser',
    },
    {
      title: 'Perfil',
      url: '/new-edit-adviser',
      icon: 'contact',
      userType: 'adviser',
    },
    {
      title: 'Simulador Match',
      url: '/simulate-search-admin',
      icon: 'heart-empty',
      userType: 'adviser',
    },
    // Seller
    {
      title: 'Consumidores',
      url: '/list-buyer-admin',
      icon: 'clipboard',
      userType: 'seller',
    },
    {
      title: 'Propiedades',
      url: '/list-prop-admin',
      icon: 'business',
      userType: 'seller',
    },
    {
      title: 'Perfil',
      url: '/new-edit-seller',
      icon: 'contact',
      userType: 'seller',
    },
    {
      title: 'Simulador Match',
      url: '/simulate-search-admin',
      icon: 'heart-empty',
      userType: 'seller',
    },
    // office
    {
      title: 'Consumidores',
      url: '/list-buyer-admin',
      icon: 'clipboard',
      userType: 'office',
    },
    {
      title: 'Asesores',
      url: '/list-adviser-admin',
      icon: 'people',
      userType: 'office',
    },
    {
      title: 'Dueño',
      url: '/list-seller-admin',
      icon: 'cash',
      userType: 'office',
    },
    {
      title: 'Propiedades',
      url: '/list-prop-admin',
      icon: 'business',
      userType: 'office',
    },
    {
      title: 'Créditos',
      url: '/list-credit-admin',
      icon: 'document',
      userType: 'office',
    },
    {
      title: 'Ofertas',
      url: '/list-ofert-admin',
      icon: 'card',
      userType: 'office',
    },
    {
      title: 'Obras',
      url: '/list-build-admin',
      icon: 'construct',
      userType: 'office',
    },
    {
      title: 'Constructores',
      url: '/list-maker-admin',
      icon: 'walk',
      userType: 'office',
    },
    {
      title: 'Calendario',
      url: '/list-schedule-admin',
      icon: 'calendar',
      userType: 'office',
    },
    {
      title: 'Metas',
      url: '/list-goals-admin',
      icon: 'stats',
      userType: 'office',
    },
    {
      title: 'Simulador Match',
      url: '/simulate-search-admin',
      icon: 'heart-empty',
      userType: 'office',
    },
    {
      title: 'Propiedades Apartadas',
      url: '/list-salesprop-admin',
      icon: 'timer',
      userType: 'office',
    },
    {
      title: 'Propiedades Aquiridas',
      url: '/list-sales-admin',
      icon: 'trending-up',
      userType: 'office',
    },
    {
      title: 'Perfil',
      url: '/new-edit-office',
      icon: 'contact',
      userType: 'office',
    },
    // list-notification
    {
      title: 'Notificaciones',
      url: '/list-notification',
      icon: 'notifications',
      userType: 'all',
    },
  ];
  isLoggin = false;
  user: IUserSession;
  link: string;
  numOfNewNoti: BehaviorSubject<number>;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private userSessionService: UserSessionService,
    private router: Router,
    private navController: NavController,
    private socketIOService: SocketIoService,
    private oneSignalService: OnesignalService,
  ) {
    this.initializeApp();
    this.getNotification();
    this.numOfNewNoti = socketIOService.numOfNewNoti;
    // socketIOService.numOfNewNoti.subscribe(c => console.log(c));
    userSessionService.userSession.subscribe(user => {
      if (user.name) {
        this.isLoggin = true;
        this.user = user;
        this.setNotificationStart(user.id, user.type);
        // no hay en local manda a login
      } else {
        this.isLoggin = false;
        this.user = undefined;
        this.navController.navigateRoot('login', false);
        /*  this.router
          .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
          .then(() => this.router.navigate(['login'])); */
      }
      // item select
      if (user.type === 'administrator') {
        this.link = '/main-admin';
      } else {
        this.link = '/list-buyer-admin';
      }
    });
    router.events.pipe(map((m: any) => m.url)).subscribe(r => {
      if (r !== undefined) {
        const urlSet = this.appPages.map(ap => ap.url).find(url => url === r);
        if (urlSet) {
          this.link = r;
        }
      }
    });
    // android one signal
    userSessionService.activateMenu.subscribe(str => {
      if (str === 'list-notification') {
        navController.navigateRoot(str);
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  private handleAndroidCameraRestart(event: any) {
    if (event && event.pendingResult) {
      const status: string =
        event.pendingResult.pluginStatus !== null
          ? ''
          : event.pendingResult.pluginStatus.toUpperCase();

      if (
        'Camera' === event.pendingResult.pluginServiceName &&
        'OK' !== status &&
        event.pendingResult.result !== ''
      ) {
        // this.myService.saveAndroidPhotoRecoveryURI(event.pendingResult.result);
      }
    }
  }
  logout() {
    this.storage.remove('userSessionCurrent').then(() => {
      this.navController.navigateRoot('login', false);
      /* this.router
        .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
        .then(() => this.router.navigate(['login'])); */
    });
  }
  // num of no read
  getNotification() {
    this.socketIOService.onNewPost().subscribe(n => {
      const isForMe =
        !!n.receiversId.find(r => r === this.user.id) ||
        !!n.tags.find(t => t === this.user.type);
      if (isForMe) {
        this.socketIOService.addNum();
      }
    });
  }
  setNotificationStart(id, tags) {
    this.socketIOService.resetNum();
    this.oneSignalService.notRead(id, tags).subscribe(nts => {
      console.log('no read', nts);
      nts.forEach(n => {
        this.socketIOService.addNum();
      });
    });
  }
}
