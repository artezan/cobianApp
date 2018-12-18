import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPost } from '../models/post.model';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { END_POINT } from '../_config/api.end-points';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}
  public newPost(post: IPost): Observable<IPost> {
    return this.http
      .post(END_POINT.POST, post)
      .pipe(map((data: any) => data.data));
  }
  public searchPost(id: string, tags: string): Observable<IPost[]> {
    return this.http
      .post(END_POINT.POST_SEARCH, { id, tags })
      .pipe(map((data: any) => data.data));
  }
  public putPost(build: IPost): Observable<boolean> {
    return this.http
      .put(END_POINT.POST + build._id, build)
      .pipe(map((data: any) => data.data));
  }
  public getPostById(id: string): Observable<IPost> {
    return this.http
      .get(END_POINT.POST + id)
      .pipe(map((data: any) => data.data));
  }
  public deltedPostById(id: string): Observable<boolean> {
    return this.http
      .delete(END_POINT.POST + id)
      .pipe(map((data: any) => data.data));
  }
  public getAll(): Observable<IPost[]> {
    return this.http.get(END_POINT.POST).pipe(map((data: any) => data.data));
  }
}
