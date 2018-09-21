import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IUserSession } from '../models/userSession.model';
import { END_POINT } from '../_config/api.end-points';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class UserSessionService {
  public userSession = new BehaviorSubject<IUserSession>({});
  constructor(private http: HttpClient, private storage: Storage) {}

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
  }
  public loggout(): void {
    this.storage.remove('userSession');
    // localStorage.removeItem('userSession');
    this.userSession.next({
      name: undefined,
      type: undefined,
      id: undefined,
      password: undefined,
    });
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
}
