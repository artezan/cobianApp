import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '../../services/user-session.service';
import { Router, NavigationExtras } from '@angular/router';
import {
  NavController,
  MenuController,
  LoadingController,
  Platform
} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { IUserSession } from '../../models/userSession.model';
import { IMaker } from '../../models/maker.model';
import { IPreBuyer } from '../../models/preBuyer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailInput: string;
  passInput: string;
  isFind = true;
  isDevice: boolean;
  isLogin: boolean;
  isiOS: boolean;
  constructor(
    private userSession: UserSessionService,
    private router: Router,
    private navController: NavController,
    private menuController: MenuController,
    private storage: Storage,
    public loadingController: LoadingController,
    private platform: Platform
  ) {
    platform.ready().then(() => {
      this.isiOS = platform.is('ios');
    });
    this.storage.keys().then(keys => {
      const keyUserSession = keys.find(key => key === 'userSessionCurrent');
      if (!keyUserSession) {
        this.isLogin = false;
        userSession.loggout();
      } else {
        storage.get('userSessionCurrent').then((val: IUserSession) => {
          this.emailInput = val.email;
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
            data.data[0].email,
            data.token
          );
          this.isFind = true;
          // seller
          if (data.type === 'seller') {
            this.isLogin = true;
            load.dismiss();
            const noty = this.userSession.activateMenu.value;
            if (noty && noty !== '') {
              this.router.navigate([noty]);
            } else {
              this.navController.navigateRoot('list-buyer-admin', false);
            }
          }
          // office
          if (data.type === 'office') {
            this.isLogin = true;
            load.dismiss();
            const noty = this.userSession.activateMenu.value;
            if (noty && noty !== '') {
              this.router.navigate([noty]);
            } else {
              this.navController.navigateRoot('list-buyer-admin', false);
            }
          }
          // **management
          if (data.type === 'management') {
            this.isLogin = true;
            load.dismiss();
            const noty = this.userSession.activateMenu.value;
            if (noty && noty !== '') {
              this.router.navigate([noty]);
            } else {
              this.navController.navigateRoot('list-buyer-admin', false);
            }
          }
          // adviser
          if (data.type === 'adviser') {
            this.isLogin = true;
            load.dismiss();
            const noty = this.userSession.activateMenu.value;
            if (noty && noty !== '') {
              this.router.navigate([noty]);
            } else {
              this.navController.navigateRoot('list-schedule-admin', false);
            }
          }
          // maker
          if (data.type === 'maker') {
            const maker: IMaker[] = data.data;
            this.isLogin = true;
            load.dismiss();
            this.userSession.buildId = <string>maker[0].build;
            const query: NavigationExtras = {
              queryParams: { id: maker[0].build }
            };
            const noty = this.userSession.activateMenu.value;
            if (noty && noty !== '') {
              this.router.navigate([noty]);
            } else {
              this.router.navigate(['detail-build-admin'], query);
            }
          }
          // preBuyer
          if (data.type === 'preBuyer') {
            const preBuyer: IPreBuyer[] = data.data;
            this.isLogin = true;
            load.dismiss();
            const query: NavigationExtras = {
              queryParams: { id: preBuyer[0]._id }
            };
            const noty = this.userSession.activateMenu.value;
            if (noty && noty !== '') {
              this.router.navigate([noty]);
            } else {
              this.router.navigate(['login-select-user'], query);
            }
          }
          // buyer
          if (data.type === 'buyer') {
            this.isLogin = true;
            load.dismiss();
            const noty = this.userSession.activateMenu.value;
            if (noty && noty !== '') {
              this.router.navigate([noty]);
            } else {
              this.navController.navigateRoot('list-prop-buyer', false);
            }
          }
          //  admin
          if (data.type === 'administrator') {
            this.isLogin = true;
            load.dismiss();
            const noty = this.userSession.activateMenu.value;
            if (noty && noty !== '') {
              this.router.navigate([noty]);
            } else {
              this.navController.navigateRoot('main-admin', false);
            }
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
      translucent: true
    });
    return await loading;
  }
  newUser() {
    this.navController.navigateForward('new-buyer', false);
  }
  pressEnter(event) {
    if (event.keyCode === 13) {
      this.login();
    }
  }
}
