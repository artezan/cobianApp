import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserSessionService } from '../services/user-session.service';
import { AlertController } from '@ionic/angular';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private userSessionService: UserSessionService,
    private alertCtrl: AlertController,
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 401) {
          this.presentAlert();
          // auto logout if 401 response returned from api
          this.userSessionService.loggout();
          //   location.reload(true);
        }
        if (err.status === 500) {
          this.presentAlert();
          // auto logout if 401 response returned from api
          this.userSessionService.loggout();
          //   location.reload(true);
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      }),
    );
  }
  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      subHeader: '',
      message: 'Se ha detectado un error.',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
