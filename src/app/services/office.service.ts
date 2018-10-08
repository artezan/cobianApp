import { Injectable } from '@angular/core';
import { IOffice } from '../models/office.model';
import { END_POINT } from '../_config/api.end-points';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class OfficeService {
  constructor(private http: HttpClient) {}

  public newOffice(office: IOffice): Observable<IOffice> {
    return this.http
      .post(END_POINT.OFFICE, office)
      .pipe(map((data: any) => data.data));
  }
  public putOffice(office: IOffice): Observable<boolean> {
    return this.http
      .put(END_POINT.OFFICE + office._id, office)
      .pipe(map((data: any) => data.data));
  }
  public getOffice(): Observable<IOffice[]> {
    return this.http.get(END_POINT.OFFICE).pipe(map((data: any) => data.data));
  }
  public getOfficeById(id: string): Observable<IOffice> {
    return this.http
      .get(END_POINT.OFFICE_ID + id)
      .pipe(map((data: any) => data.data));
  }
  public deleteOfficeById(id: string): Observable<boolean> {
    return this.http
      .delete(END_POINT.OFFICE + id)
      .pipe(map((data: any) => data.data));
  }
}
