import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { UserSessionService } from '../../../services/user-session.service';
import { Storage } from '@ionic/storage';
import { IUserSession } from '../../../models/userSession.model';

@Component({
  selector: 'app-user-session',
  templateUrl: './user-session.page.html',
  styleUrls: ['./user-session.page.scss'],
})
export class UserSessionPage implements OnInit {
  emailInput: string;
  passInput: string;
  isFind = true;
  isDevice: boolean;
  isLogin: boolean;

  constructor(
    public loadingController: LoadingController,
    private userSession: UserSessionService,
    private storage: Storage,
  ) {
    this.getSessions();
  }
  async getSessions() {
    const sessions = await this.userSession.getSessionsSaved();
    console.log('sessions', sessions);
  }

  ngOnInit() {}
  async login() {
    const load = await this.presentLoadingWithOptions();
    load.present();
    const userData = await this.userSession
      .logginUserSession(this.emailInput, this.passInput)
      .toPromise();
    if (userData !== 'error') {
      const currentData: IUserSession = {
        type: userData.type,
        name: userData.data[0].name,
        id: userData.data[0]._id,
        password: userData.data[0].password,
        email: userData.data[0].email,
      };
      this.storage.set('userSessionCurrent', currentData);
      this.userSession.saveSession(currentData);
      this.userSession.loggoutWithoutStore();
      load.dismiss();
    } else {
      load.dismiss();
      this.isFind = false;
    }
  }
  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      message: 'Iniciando...',
      translucent: true,
    });
    return await loading;
  }
  pressEnter(event) {
    if (event.keyCode === 13) {
      this.login();
    }
  }
}
