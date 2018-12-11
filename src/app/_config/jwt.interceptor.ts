import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserSessionService } from '../services/user-session.service';
import { END_POINT } from './api.end-points';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const currentUser = this.injector.get(UserSessionService).userSession.value;
    const isOneSignal = request.url.indexOf(END_POINT.ONESIGNAL);
    if (currentUser && currentUser.token && isOneSignal === -1) {
      if (this.injector.get(UserSessionService).city) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.token}`,
            City: this.injector.get(UserSessionService).city,
          },
        });
      } else {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });
      }
    }

    return next.handle(request);
  }
}
