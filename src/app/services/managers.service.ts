import { Injectable } from '@angular/core';
import { END_POINT } from '../_config/api.end-points';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { IManager } from '../models/manager.model';

@Injectable({
  providedIn: 'root'
})
export class ManagersService {
  constructor(private http: HttpClient) {}

  public newManager(manager: IManager): Observable<IManager> {
    return this.http
      .post(END_POINT.MANAGER, manager)
      .pipe(map((data: any) => data.data));
  }
  public putManager(manager: IManager): Observable<IManager> {
    return this.http
      .put(END_POINT.MANAGER + manager._id, manager)
      .pipe(map((data: any) => data.data));
  }
  public getManagerAll(): Observable<IManager[]> {
    return this.http.get(END_POINT.MANAGER).pipe(map((data: any) => data.data));
  }
  public getManagerById(id: string): Observable<IManager> {
    return this.http
      .get(END_POINT.MANAGER_ID + id)
      .pipe(map((data: any) => data.data));
  }
  public deleteManagerById(id: string): Observable<boolean> {
    return this.http
      .delete(END_POINT.MANAGER + id)
      .pipe(map((data: any) => data.data));
  }
}
