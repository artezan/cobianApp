import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { END_POINT } from '../_config/api.end-points';
import { IPreBuild } from '../models/preBuild';

@Injectable({
  providedIn: 'root'
})
export class PreBuildService {
  constructor(private http: HttpClient) {}
  public newBuild(build: IPreBuild): Observable<IPreBuild> {
    return this.http
      .post(END_POINT.PRE_BUILD, build)
      .pipe(map((data: any) => data.data));
  }
  public putBuild(build: IPreBuild): Observable<boolean> {
    return this.http
      .put(END_POINT.PRE_BUILD + build._id, build)
      .pipe(map((data: any) => data.data));
  }
  public getBuildById(id: string): Observable<IPreBuild> {
    return this.http
      .get(END_POINT.PRE_BUILD + id)
      .pipe(map((data: any) => data.data));
  }
  public deltedBuildById(id: string): Observable<boolean> {
    return this.http
      .delete(END_POINT.PRE_BUILD + id)
      .pipe(map((data: any) => data.data));
  }
  public getAll(): Observable<IPreBuild[]> {
    return this.http
      .get(END_POINT.PRE_BUILD)
      .pipe(map((data: any) => data.data));
  }
}
