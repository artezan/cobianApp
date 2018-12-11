import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { HttpClient } from '@angular/common/http';
import { END_POINT } from '../_config/api.end-points';
import { map } from 'rxjs/operators';
import { IManager } from '../models/manager.model';

@Injectable({
  providedIn: 'root',
})
export class SubManagerService {
  constructor(private http: HttpClient) {}

  public newManager(manager: IManager): Observable<IManager> {
    return this.http
      .post(END_POINT.SUBMANAGER, manager)
      .pipe(map((data: any) => data.data));
  }
  public putManager(manager: IManager): Observable<IManager> {
    return this.http
      .put(END_POINT.SUBMANAGER + manager._id, manager)
      .pipe(map((data: any) => data.data));
  }
  public getManagerAll(): Observable<IManager[]> {
    return this.http
      .get(END_POINT.SUBMANAGER)
      .pipe(map((data: any) => data.data));
  }
  public getManagerById(id: string): Observable<IManager> {
    return this.http
      .get(END_POINT.SUBMANAGER_ID + id)
      .pipe(map((data: any) => data.data));
  }
  public deleteManagerById(id: string): Observable<boolean> {
    return this.http
      .delete(END_POINT.SUBMANAGER + id)
      .pipe(map((data: any) => data.data));
  }
}
