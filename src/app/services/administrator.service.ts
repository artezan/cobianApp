import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAdministrator, IEvents } from '../models/administrator.model';
import { END_POINT } from '../_config/api.end-points';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdministratorService {
  constructor(private http: HttpClient) {}
  public getAdminById(id: string): Observable<IAdministrator> {
    return this.http
      .get(END_POINT.ADMINISTRATOR + id)
      .pipe(map((data: any) => data.data));
  }
  public getAdminEvents(
    pageNumber: number,
    nPerPage = 15,
  ): Observable<IEvents[]> {
    const body = { pageNumber, nPerPage };
    return this.http
      .post(END_POINT.ADMINISTRATOR_EVENTS, body)
      .pipe(map((data: any) => data.data));
  }
}
