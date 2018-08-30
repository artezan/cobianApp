import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { UserSessionService } from './services/user-session.service';
import { Router } from '@angular/router';
import { IUserSession } from './models/userSession.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  public appPages = [
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
      title: 'List',
      url: '/list',
      icon: 'list',
      userType: '',
    },
  ];
  isDevice: boolean;
  isLoggin = false;
  user: IUserSession;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private userSessionService: UserSessionService,
    private router: Router,
    private navController: NavController,
  ) {
    this.initializeApp();
    userSessionService.userSession.subscribe(user => {
      if (user.name) {
        this.isLoggin = true;
        this.user = user;
        // no hay en local manda a login
      } else {
        this.isLoggin = false;
        this.user = undefined;
        this.navController.navigateRoot('login', false);
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  logout() {
    this.storage.remove('userSession').then(() => {
      this.navController.navigateRoot('login', false);
    });
  }
}
