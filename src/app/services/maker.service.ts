import { Injectable } from '@angular/core';
import { IMaker } from '../models/maker.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { END_POINT } from '../_config/api.end-points';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MakerService {
  constructor(private http: HttpClient) {}
  public newMaker(maker: IMaker): Observable<IMaker> {
    return this.http
      .post(END_POINT.MAKER, maker)
      .pipe(map((data: any) => data.data));
  }
  public putMaker(maker: IMaker): Observable<boolean> {
    return this.http
      .put(END_POINT.MAKER + maker._id, maker)
      .pipe(map((data: any) => data.data));
  }
  public getMakerAll(): Observable<IMaker[]> {
    return this.http.get(END_POINT.MAKER).pipe(map((data: any) => data.data));
  }
  public getMakerById(id: string): Observable<IMaker> {
    return this.http
      .get(END_POINT.MAKER_ID + id)
      .pipe(map((data: any) => data.data));
  }
  public deltedMakerById(id: string): Observable<boolean> {
    return this.http
      .delete(END_POINT.MAKER + id)
      .pipe(map((data: any) => data.data));
  }
}
