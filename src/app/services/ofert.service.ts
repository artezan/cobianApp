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
}
