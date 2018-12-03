import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { END_POINT } from '../_config/api.end-points';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MailService {
  constructor(private http: HttpClient) {}
  public addEmail(email: string): Observable<boolean> {
    return this.http
      .post(END_POINT.EMAIL_ADD, { email })
      .pipe(map((data: any) => data.data));
  }
  public findEmail(email: string, token: string): Observable<boolean> {
    return this.http
      .post(END_POINT.EMAIL_FIND, { email, token })
      .pipe(map((data: any) => data.data));
  }
  /**
   * enviar archivos
   */
  public sendFiles(formData: FormData, isFile: boolean): Observable<boolean> {
    if (isFile) {
      return this.http
        .post(END_POINT.EMAIL_FILES, formData)
        .pipe(map((data: any) => data.data));
    } else {
      return this.http
        .post(END_POINT.EMAIL_MSG, formData)
        .pipe(map((data: any) => data.data));
    }
  }
}
