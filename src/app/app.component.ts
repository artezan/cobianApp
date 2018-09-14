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
      title: 'Vendedores',
      url: '/list-seller-admin',
      icon: 'cash',
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
      title: 'Eventos',
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
