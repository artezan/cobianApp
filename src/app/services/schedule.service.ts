import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ISchedule,
  IScheduleGet,
  CheckSchedule,
} from '../models/schedule.model';
import { END_POINT } from '../_config/api.end-points';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private http: HttpClient) {}
  public newSchedule(schedule: ISchedule): Observable<ISchedule> {
    return this.http
      .post(END_POINT.SCHEDULE, schedule)
      .pipe(map((data: any) => data.data));
  }
  public putSchedule(schedule: ISchedule): Observable<ISchedule> {
    return this.http
      .put(END_POINT.SCHEDULE + schedule._id, schedule)
      .pipe(map((data: any) => data.data));
  }
  public getSchedule(): Observable<ISchedule[]> {
    return this.http
      .get(END_POINT.SCHEDULE)
      .pipe(map((data: any) => data.data));
  }
  public getScheduleById(id: string): Observable<ISchedule> {
    return this.http
      .get(END_POINT.SCHEDULE_ID + id)
      .pipe(map((data: any) => data.data));
  }
  public deltedScheduleById(id: string): Observable<ISchedule> {
    return this.http
      .delete(END_POINT.SCHEDULE + id)
      .pipe(map((data: any) => data.data));
  }
  public checkSchedule(schedule: IScheduleGet): Observable<CheckSchedule> {
    return this.http
      .post(END_POINT.SCHEDULE_CHECK, schedule)
      .pipe(map((data: any) => data.data));
  }
}
