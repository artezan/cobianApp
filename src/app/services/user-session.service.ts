import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IUserSession } from '../models/userSession.model';
import { END_POINT } from '../_config/api.end-points';
import { Storage } from '@ionic/storage';
import { CONST_GENERAL } from '../_config/_const-general';
import { Platform } from '@ionic/angular';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  public userSession = new BehaviorSubject<IUserSession>({});
  private isInitOne = false;
  /**
   * solo para mandar a notificaciones en android y build
   * list-notification
   */
  public activateMenu = new BehaviorSubject<string>('');
  /**
   * test
   */
  public saveURI;
  /**
   * solo para maker
   */
  public buildId: string;
  constructor(
    private http: HttpClient,
    private storage: Storage,
    private platform: Platform
  ) {}

  public logginUserSession(email, password): Observable<any> {
    const concatSession = btoa(email + ':' + password);
    return this.http
      .post(END_POINT.USER_SESSION, { base64: concatSession })
      .pipe(map((data: any) => data.data));
  }
  public setUserSession(name, type, id, password, email: string, token): void {
    const currentData: IUserSession = {
      type: type,
      name: name,
      id: id,
      password: password,
      email: email,
      token
    };
    this.userSession.next({
      name: name,
      type: type,
      id: id,
      password: password,
      email: email,
      token
    });
    // localStorage.setItem('userSession', JSON.stringify(currentData));
    this.storage.set('userSessionCurrent', currentData);
    this.saveSession(currentData);
    // onesignal
    this.platform.ready().then(c => {
      if (this.platform.is('cordova')) {
        this.oneSignalCordova(id, type);
      } else if (environment.production && !this.isInitOne) {
        this.oneSignalDesktop(id, type);
      }
    });
  }

  public loggout(): void {
    this.storage.remove('userSessionCurrent');
    // this.storage.remove('userSessionSaved');
    this.storage.remove('alert-adv');
    // localStorage.removeItem('userSession');
    this.userSession.next({
      name: undefined,
      type: undefined,
      id: undefined,
      password: undefined,
      email: undefined
    });
    this.platform.ready().then(c => {
      console.log(c);
      if (this.platform.is('cordova')) {
        this.oneSignalLogoutCordova();
      } else if (environment.production && this.isInitOne) {
        this.oneSignalLogoutDesktop();
      }
    });
  }
  public loggoutWithoutStore(): void {
    this.storage.remove('alert-adv');
    // localStorage.removeItem('userSession');
    this.userSession.next({
      name: undefined,
      type: undefined,
      id: undefined,
      password: undefined,
      email: undefined
    });
    // reset al cambiar user
    this.activateMenu.next('');
    this.platform.ready().then(c => {
      console.log(c);
      if (this.platform.is('cordova')) {
        this.oneSignalLogoutCordova();
      } else if (environment.production && this.isInitOne) {
        this.oneSignalLogoutDesktop();
      }
    });
  }
  public async saveSession(newUser: IUserSession) {
    const keys = await this.storage.keys();
    const isFind = keys.find(k => k === 'userSessionSaved');
    if (isFind) {
      const sessions: IUserSession[] = await this.storage.get(
        'userSessionSaved'
      );
      const indexFinded = sessions.findIndex(s => s.id === newUser.id);
      if (indexFinded !== -1) {
        sessions[indexFinded] = newUser;
      } else {
        sessions.push(newUser);
      }
      this.storage.set('userSessionSaved', sessions);
    } else {
      this.storage.set('userSessionSaved', [newUser]);
    }
  }
  public async removeSession(session: IUserSession) {
    const sessions: IUserSession[] = await this.storage.get('userSessionSaved');
    const indexFinded = sessions.findIndex(s => s.id === session.id);
    if (indexFinded !== -1) {
      sessions.splice(indexFinded, 1);
      this.storage.set('userSessionSaved', sessions);
    }
  }
  public async getSessionsSaved(): Promise<IUserSession[]> {
    return await this.storage.get('userSessionSaved');
  }

  // inicia antes que la app mandando un Promise en cada respuesta environment.production &&
  checkValidSession(): Promise<any> {
    return new Promise((resolve, reject) => {
      // ve si hay un usuario en el localstore
      this.storage.keys().then(keys => {
        const keyUserSession = keys.find(key => key === 'userSessionCurrent');
        if (keyUserSession) {
          this.storage.get('userSessionCurrent').then((val: IUserSession) => {
            this.logginUserSession(val.email, val.password).subscribe(data => {
              // data  administrator buyer seller adviser management

              if (data !== 'error') {
                this.setUserSession(
                  data.data[0].name,
                  data.type,
                  data.data[0]._id,
                  data.data[0].password,
                  data.data[0].email,
                  data.token
                );
                return resolve(true);
                // usuario o contrasena caducada
              } else {
                this.loggout();
                return resolve(true);
              }
            });
          });
          // no hay nada en local, manda a login en app.component
        } else {
          this.loggout();
          return resolve(true);
        }
      });
    });
  }
  //  one signal
  private oneSignalDesktop(id: any, type: any) {
    const OneSignalDektop = window['OneSignal'] || [];
    console.log('Init OneSignal');
    OneSignalDektop.push(function() {
      OneSignalDektop.init({
        appId: CONST_GENERAL.ONESIGNAL_APP_ID,
        autoRegister: true,
        notifyButton: {
          enable: false
        },
        promptOptions: {
          actionMessage:
            'Nos gustaría notificarle cuando se mande un nuevo programa',
          acceptButtonText: 'Permitir',
          cancelButtonText: 'No gracias'
        }
      });
      OneSignalDektop.getUserId(function(userId) {
        console.log('OneSignal User ID:', userId);
      });
      OneSignalDektop.sendTags({
        _id: id.toString(),
        type: type
      });
      OneSignalDektop.on('subscriptionChange', function(isSubscribed) {
        console.log('The user subscription state is now:', isSubscribed);
        OneSignalDektop.sendTags({
          _id: id.toString(),
          type: type
        });
      });
      OneSignalDektop.addListenerForNotificationOpened(function(data) {
        console.log('Received NotificationOpened:');
        console.log(data);
      });
      OneSignalDektop.on('notificationDisplay', function(event) {
        console.warn('OneSignal notification displayed:', event);
        /*
        {
            "id": "ce31de29-e1b0-4961-99ee-080644677cd7",
            "heading": "OneSignal Test Message",
            "content": "This is an example notification.",
            "url": "https://onesignal.com?_osp=do_not_open",
            "icon": "https://onesignal.com/images/notification_logo.png"
        }
        */
      });
      OneSignalDektop.setDefaultNotificationUrl(
        'http://31.220.52.51:3002/list-notification'
      );
    });
    this.isInitOne = true;
  }
  private oneSignalCordova(id, type) {
    const oneSignal = window['plugins'].OneSignal;
    oneSignal.startInit(
      CONST_GENERAL.ONESIGNAL_APP_ID,
      CONST_GENERAL.googleProjectNumber,
    );
    oneSignal.handleNotificationOpened(() => {
      this.activateMenu.next('list-notification');
    });
    oneSignal.sendTags({
      _id: id.toString(),
      type: type
    });
    oneSignal.endInit();
  }
  private oneSignalLogoutDesktop() {
    const OneSignalD = window['OneSignal'] || [];
    console.log('Delete OneSignal');
    OneSignalD.push(function() {
      OneSignalD.deleteTags(['_id', 'type']);
    });
    this.isInitOne = false;
  }
  private oneSignalLogoutCordova() {
    window['plugins'].OneSignal.deleteTags(['_id', 'type']);
  }
}
