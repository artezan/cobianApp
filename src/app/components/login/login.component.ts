import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '../../services/user-session.service';
import { Router } from '@angular/router';
import {
  NavController,
  MenuController,
  LoadingController,
  Platform,
} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { IUserSession } from '../../models/userSession.model';

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
    storage.length().then(num => {
      if (num === 0) {
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
          if (data.type === 'buyer') {
            load.dismiss();
            this.navController.navigateRoot('list-prop-buyer', false);
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
    this.navController.navigateRoot('login-select-user', false);
  }
}
