import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { END_POINT } from '../_config/api.end-points';
import { IPreBuild } from '../models/preBuild';
import { IFatherPre } from '../models/fatherPreBuild.model';

@Injectable({
  providedIn: 'root',
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
  // --------------------
  public newBuildFather(build: IFatherPre): Observable<IPreBuild> {
    return this.http
      .post(END_POINT.PRE_BUILD_FATHER, build)
      .pipe(map((data: any) => data.data));
  }
  public putFatherBuild(build: IFatherPre): Observable<boolean> {
    return this.http
      .put(END_POINT.PRE_BUILD_FATHER + build._id, build)
      .pipe(map((data: any) => data.data));
  }
  public getFatherBuildById(id: string): Observable<IPreBuild> {
    return this.http
      .get(END_POINT.PRE_BUILD_FATHER + id)
      .pipe(map((data: any) => data.data));
  }
  public deltedBuildByIdFather(id: string): Observable<boolean> {
    return this.http
      .delete(END_POINT.PRE_BUILD_FATHER + id)
      .pipe(map((data: any) => data.data));
  }
  public getAllFather(): Observable<IFatherPre[]> {
    return this.http
      .get(END_POINT.PRE_BUILD_FATHER)
      .pipe(map((data: any) => data.data));
  }
}
