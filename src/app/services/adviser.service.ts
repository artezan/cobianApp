import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAdviser } from '../models/adviser.model';
import { HttpClient } from '@angular/common/http';
import { END_POINT } from '../_config/api.end-points';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdviserService {
  constructor(private http: HttpClient) {}
  public getAdviserAll(): Observable<IAdviser[]> {
    return this.http.get(END_POINT.ADVISER).pipe(map((data: any) => data.data));
  }
  public newAdviser(adviser: IAdviser): Observable<IAdviser> {
    return this.http
      .post(END_POINT.ADVISER, adviser)
      .pipe(map((data: any) => data.data));
  }
  public putAdviser(adviser: IAdviser): Observable<boolean> {
    return this.http
      .put(END_POINT.ADVISER + adviser._id, adviser)
      .pipe(map((data: any) => data.data));
  }
  public getAdviserById(id: string): Observable<IAdviser> {
    return this.http
      .get(END_POINT.ADVISER_ID + id)
      .pipe(map((data: any) => data.data));
  }
  public deletedAdviserById(id: string): Observable<boolean> {
    return this.http
      .delete(END_POINT.ADVISER + id)
      .pipe(map((data: any) => data.data));
  }
}
