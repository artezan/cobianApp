import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IOfert } from '../models/ofert.model';
import { Observable } from 'rxjs';
import { END_POINT } from '../_config/api.end-points';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OfertService {
  constructor(private http: HttpClient) {}
  public newOfert(ofert: IOfert): Observable<IOfert> {
    return this.http
      .post(END_POINT.OFERT, ofert)
      .pipe(map((data: any) => data.data));
  }
  public putOfert(ofert: IOfert): Observable<boolean> {
    return this.http
      .put(END_POINT.OFERT + ofert._id, ofert)
      .pipe(map((data: any) => data.data));
  }
  public getOfert(): Observable<IOfert[]> {
    return this.http.get(END_POINT.OFERT).pipe(map((data: any) => data.data));
  }
  public getOfertById(id: string): Observable<IOfert> {
    return this.http
      .get(END_POINT.OFERT_ID + id)
      .pipe(map((data: any) => data.data));
  }
  public deleteOfertById(id: string): Observable<boolean> {
    return this.http
      .delete(END_POINT.OFERT + id)
      .pipe(map((data: any) => data.data));
  }
}
