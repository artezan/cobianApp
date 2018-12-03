import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '../../services/user-session.service';
import { Router, NavigationExtras } from '@angular/router';
import {
  NavController,
  MenuController,
  LoadingController,
  Platform,
  AlertController,
} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { IUserSession } from '../../models/userSession.model';
import { IMaker } from '../../models/maker.model';
import { IPreBuyer } from '../../models/preBuyer';
import { BuyerService } from '../../services/buyer.service';
import { SellerService } from '../../services/seller.service';
import { AdministratorService } from '../../services/administrator.service';
import { AdviserService } from '../../services/adviser.service';
import { ManagersService } from '../../services/managers.service';
import { MakerService } from '../../services/maker.service';
import { OfficeService } from '../../services/office.service';
import { MailService } from '../../services/mail.service';
import { PreBuyerService } from '../../services/pre-buyer.service';

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
  isiOS: boolean;
  constructor(
    private userSession: UserSessionService,
    private router: Router,
    private navController: NavController,
    private menuController: MenuController,
    private storage: Storage,
    public loadingController: LoadingController,
    private platform: Platform,
    public alertController: AlertController,
    private buyerService: BuyerService,
    private sellerService: SellerService,
    private admService: AdministratorService,
    private advService: AdviserService,
    private managementService: ManagersService,
    private makerService: MakerService,
    private officeService: OfficeService,
    private mailService: MailService,
    private preBuyerService: PreBuyerService,
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
            data.token,
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
              queryParams: { id: maker[0].build },
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
              queryParams: { id: preBuyer[0]._id },
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
      translucent: true,
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
  // rest pass
  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Recuperar Contraseña',
      subHeader: 'Ingresa correo registrado',
      inputs: [
        {
          name: 'email',
          type: 'text',
          placeholder: 'Correo...',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Recuperar',
          role: 'ok',

          handler: () => {
            console.log('Confirm Ok');
          },
        },
      ],
    });
    await alert.present();
    await alert.onWillDismiss().then(res => {
      if (res.role === 'ok') {
        this.resetEmail(res.data.values.email);
      }
    });
  }
  async resetEmail(email: string) {
    const data = await this.userSession.resetUserSession(email).toPromise();
    // seller
    if (data.type === 'seller') {
      const seller = data.data[0];
      seller['password'] = Math.floor(1000 + Math.random() * 9000);
      const res = await this.sellerService.putSeller(seller).toPromise();
      if (res) {
        await this.mailService
          .resetPass(seller.email, seller.name, seller['password'])
          .toPromise();
      }
    }
    // office
    if (data.type === 'office') {
      const user = data.data[0];
      user['password'] = Math.floor(1000 + Math.random() * 9000);
      const res = await this.officeService.putOffice(user).toPromise();
      if (res) {
        await this.mailService
          .resetPass(user.email, user.name, user['password'])
          .toPromise();
      }
    }
    // **management
    if (data.type === 'management') {
      const user = data.data[0];
      user['password'] = Math.floor(1000 + Math.random() * 9000);
      const res = await this.managementService.putManager(user).toPromise();
      if (res) {
        await this.mailService
          .resetPass(user.email, user.name, user['password'])
          .toPromise();
      }
    }
    // adviser
    if (data.type === 'adviser') {
      const user = data.data[0];
      user['password'] = Math.floor(1000 + Math.random() * 9000);
      const res = await this.advService.putAdviser(user).toPromise();
      if (res) {
        await this.mailService
          .resetPass(user.email, user.name, user['password'])
          .toPromise();
      }
    }
    // maker
    if (data.type === 'maker') {
      const user = data.data[0];
      user['password'] = Math.floor(1000 + Math.random() * 9000);
      const res = await this.makerService.putMaker(user).toPromise();
      if (res) {
        await this.mailService
          .resetPass(user.email, user.name, user['password'])
          .toPromise();
      }
    }
    // preBuyer
    if (data.type === 'preBuyer') {
      const user = data.data[0];
      user['password'] = Math.floor(1000 + Math.random() * 9000);
      const res = await this.preBuyerService.putBuyer(user).toPromise();
      if (res) {
        await this.mailService
          .resetPass(user.email, user.name, user['password'])
          .toPromise();
      }
    }
    // buyer
    if (data.type === 'buyer') {
      console.log('rerset', data.data[0]);
      const buyer = data.data[0];
      buyer['password'] = Math.floor(1000 + Math.random() * 9000);
      const res = await this.buyerService.putBuyer(buyer).toPromise();
      if (res) {
        await this.mailService
          .resetPass(buyer.email, buyer.name, buyer['password'])
          .toPromise();
      }
    }
    //  admin
    /*  if (data.type === 'administrator') {
      const user = data.data[0];
      user['password'] = Math.floor(1000 + Math.random() * 9000);
      const res = await this.admService.pu(user).toPromise();
      if (res) {
        await this.mailService
          .resetPass(user.email, user.name, user['password'])
          .toPromise();
      }
    } */
  }
}
