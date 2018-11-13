import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBuild } from '../models/build.model';
import { Observable } from 'rxjs/internal/Observable';
import { END_POINT } from '../_config/api.end-points';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BuildService {
  constructor(private http: HttpClient) {}
  public newBuild(build: IBuild): Observable<IBuild> {
    return this.http
      .post(END_POINT.BUILD, build)
      .pipe(map((data: any) => data.data));
  }
  public putBuild(build: IBuild): Observable<boolean> {
    return this.http
      .put(END_POINT.BUILD + build._id, build)
      .pipe(map((data: any) => data.data));
  }
  public getBuildAll(): Observable<IBuild[]> {
    return this.http.get(END_POINT.BUILD).pipe(map((data: any) => data.data));
  }
  public getBuildById(id: string): Observable<IBuild> {
    return this.http
      .get(END_POINT.BUILD_ID + id)
      .pipe(map((data: any) => data.data));
  }
  public deltedBuildById(id: string): Observable<boolean> {
    return this.http
      .delete(END_POINT.BUILD + id)
      .pipe(map((data: any) => data.data));
  }
  public updateBuildPhase(timeLine, id): Observable<IBuild> {
    return this.http
      .put(END_POINT.BUILD_UPDATE_PHASE + id, timeLine)
      .pipe(map((data: any) => data.data));
  }
  public uploadImg(formData: FormData): Observable<string[]> {
    return this.http
      .post(END_POINT.BUILD_UPLOAD_IMG, formData)
      .pipe(map((data: any) => data.data));
  }
  /**
   *
   * @param imgName ej: imagen.PNG
   */
  public deletedImg(imgName: string): Observable<boolean> {
    return this.http
      .get(END_POINT.BUILD_DELETE_IMG + imgName)
      .pipe(map((data: any) => data.data));
  }
}
