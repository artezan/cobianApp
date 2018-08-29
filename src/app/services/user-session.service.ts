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
  public setUserSession(name, type, id): void {
    const currentData: IUserSession = {
      type: type,
      name: name,
      id: id,
    };
    this.userSession.next({ name: name, type: type });
    // localStorage.setItem('userSession', JSON.stringify(currentData));
    this.storage.set('userSession', currentData);
  }
  public loggout(): void {
    this.storage.remove('userSession');
    // localStorage.removeItem('userSession');
    this.userSession.next({ name: undefined, type: undefined });
  }
}
