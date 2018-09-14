import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IGoal } from '../models/goal.model';
import { END_POINT } from '../_config/api.end-points';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GoalService {
  constructor(private http: HttpClient) {}
  public newGoal(goal: IGoal): Observable<IGoal> {
    return this.http
      .post(END_POINT.GOAL, goal)
      .pipe(map((data: any) => data.data));
  }
  public getGoal(): Observable<IGoal[]> {
    return this.http.get(END_POINT.GOAL).pipe(map((data: any) => data.data));
  }
  public getGoaltById(id: string): Observable<IGoal> {
    return this.http
      .get(END_POINT.GOAL_ID + id)
      .pipe(map((data: any) => data.data));
  }
  public putGoal(goal: IGoal): Observable<boolean> {
    return this.http
      .put(END_POINT.GOAL + goal._id, goal)
      .pipe(map((data: any) => data.data));
  }
  /* 
  
  public deleteCredit(id: string): Observable<ICredit> {
    return this.http
      .delete(END_POINT.CREDIT + id)
      .pipe(map((data: any) => data.data));
  } */
}
