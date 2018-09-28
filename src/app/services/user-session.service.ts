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
  providedIn: 'root',
})
export class UserSessionService {
  public userSession = new BehaviorSubject<IUserSession>({});
  constructor(
    private http: HttpClient,
    private storage: Storage,
    private platform: Platform,
  ) {}

  public logginUserSession(name, password): Observable<any> {
    const concatSession = btoa(name + ':' + password);
    return this.http
      .get(END_POINT.USER_SESSION + concatSession)
      .pipe(map((data: any) => data.data));
  }
  public setUserSession(name, type, id, password): void {
    const currentData: IUserSession = {
      type: type,
      name: name,
      id: id,
      password: password,
    };
    this.userSession.next({
      name: name,
      type: type,
      id: id,
      password: password,
    });
    // localStorage.setItem('userSession', JSON.stringify(currentData));
    this.storage.set('userSession', currentData);
    // onesignal
    if (this.platform.is('cordova')) {
      this.oneSignalCordova(id, type);
    } else if (environment.production) {
      this.oneSignalDesktop(id, type);
    }
  }

  public loggout(): void {
    this.storage.remove('userSession');
    this.storage.remove('alert-adv');
    // localStorage.removeItem('userSession');
    this.userSession.next({
      name: undefined,
      type: undefined,
      id: undefined,
      password: undefined,
    });
    if (this.platform.is('cordova')) {
      this.oneSignalLogoutCordova();
    } else if (environment.production) {
      this.oneSignalLogoutDesktop();
    }
  }

  // inicia antes que la app mandando un Promise en cada respuesta
  checkValidSession(): Promise<any> {
    return new Promise((resolve, reject) => {
      // ve si hay un usuario en el localstore
      this.storage.keys().then(keys => {
        const keyUserSession = keys.find(key => key === 'userSession');
        if (keyUserSession) {
          this.storage.get('userSession').then((val: IUserSession) => {
            this.logginUserSession(val.name, val.password).subscribe(data => {
              // data  administrator buyer seller adviser management

              if (data !== 'error') {
                this.setUserSession(
                  data.data[0].name,
                  data.type,
                  data.data[0]._id,
                  data.data[0].password,
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
          enable: false,
        },
        promptOptions: {
          actionMessage:
            'Nos gustaría notificarle cuando se mande un nuevo programa',
          acceptButtonText: 'Permitir',
          cancelButtonText: 'No gracias',
        },
      });
      OneSignalDektop.getUserId(function(userId) {
        console.log('OneSignal User ID:', userId);
      });
      OneSignalDektop.sendTags({
        _id: id.toString(),
        type: type,
      });
      OneSignalDektop.on('subscriptionChange', function(isSubscribed) {
        console.log('The user subscription state is now:', isSubscribed);
        OneSignalDektop.sendTags({
          _id: id.toString(),
          type: type,
        });
      });
    });
  }
  oneSignalCordova(id, type) {
    /* const notificationOpenedCallback = function(jsonData) {
      alert('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    }; */
    const oneSignal = window['plugins'].OneSignal;
    oneSignal.startInit(
      CONST_GENERAL.ONESIGNAL_APP_ID,
      CONST_GENERAL.googleProjectNumber,
    );
    /* oneSignal.handleNotificationOpened(notificationOpenedCallback); */
    oneSignal.sendTags({
      _id: id.toString(),
      type: type,
    });
    oneSignal.endInit();
  }
  private oneSignalLogoutDesktop() {
    const OneSignalD = window['OneSignal'] || [];
    console.log('Delete OneSignal');
    OneSignalD.push(function() {
      OneSignalD.deleteTags(['_id', 'type']);
    });
  }
  private oneSignalLogoutCordova() {
    window['plugins'].OneSignal.deleteTags(['_id', 'type']);
  }
}
