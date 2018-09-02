import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { END_POINT } from '../_config/api.end-points';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IProperty } from '../models/property.model';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  constructor(private http: HttpClient) {}
  public matchSearch(buyerId: string, percentage = 10): Observable<boolean> {
    const body = { percentage: percentage };
    return this.http
      .post(END_POINT.PROPERTY_MATCH_SEARCH + buyerId, body)
      .pipe(map((data: any) => data.data));
  }
  public getPropertyById(id: string): Observable<IProperty> {
    return this.http
      .get(END_POINT.PROPERTY_BY_ID + id)
      .pipe(map((data: any) => data.data));
  }
  public getAll(): Observable<IProperty[]>{
    return this.http.get(END_POINT.PROPERTY)
    .pipe(map((data: any) => data.data));
  }
}
