import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '../../services/user-session.service';
import { Router, NavigationExtras } from '@angular/router';
import {
  NavController,
  MenuController,
  LoadingController,
  Platform,
} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { IUserSession } from '../../models/userSession.model';
import { IMaker } from '../../models/maker.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  emailInput: string;
  passInput: string;
  isFind = true;
  isDevice: boolean;
  isLogin: boolean;

  constructor(
    private userSession: UserSessionService,
    private router: Router,
    private navController: NavController,
    private menuController: MenuController,
    private storage: Storage,
    public loadingController: LoadingController,
    private platform: Platform,
  ) {
    this.isDevice = this.platform.is('cordova');
    // console.log(this.platform.is('desktop'));
    this.storage.keys().then(keys => {
      const keyUserSession = keys.find(key => key === 'userSession');
      if (!keyUserSession) {
        this.isLogin = false;
        userSession.loggout();
      } else {
        storage.get('userSession').then((val: IUserSession) => {
          this.emailInput = val.name;
          this.passInput = val.password;
          this.login();
        });
      }
    });
  }

  ngOnInit() {}
  close() {}
  async login() {
    const load = await this.presentLoadingWithOptions();
    load.present();
    this.userSession
      .logginUserSession(this.emailInput, this.passInput)
      .subscribe(data => {
        // data  administrator buyer seller adviser management

        if (data !== 'error') {
          this.userSession.setUserSession(
            data.data[0].name,
            data.type,
            data.data[0]._id,
            data.data[0].password,
          );
          this.isFind = true;
          // maker
          if (data.type === 'maker') {
            const maker: IMaker[] = data.data;
            this.isLogin = true;
            load.dismiss();
            const query: NavigationExtras = {
              queryParams: { id: maker[0].build },
            };
            this.router.navigate(['detail-build-admin'], query);
          }
          // buyer
          if (data.type === 'buyer') {
            this.isLogin = true;
            load.dismiss();
            this.navController.navigateRoot('list-prop-buyer', false);
          }
          //  admin
          if (data.type === 'administrator') {
            this.isLogin = true;
            load.dismiss();
            this.navController.navigateRoot('main-admin', false);
          }
        } else {
          load.dismiss();
          this.isFind = false;
        }
      });
  }
  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      message: 'Iniciando...',
      translucent: true,
    });
    return await loading;
  }
  newUser() {
    this.navController.navigateForward('login-select-user', false);
  }
  pressEnter(event) {
    if (event.keyCode === 13) {
      this.login();
    }
  }
}
