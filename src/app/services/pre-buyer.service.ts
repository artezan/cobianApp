import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { IPreBuyer } from '../models/preBuyer';
import { END_POINT } from '../_config/api.end-points';

@Injectable({
  providedIn: 'root'
})
export class PreBuyerService {
  constructor(private http: HttpClient) {}
  public newBuyer(buyer: IPreBuyer): Observable<IPreBuyer> {
    return this.http
      .post(END_POINT.PRE_BUYER, buyer)
      .pipe(map((data: any) => data.data));
  }
  public putBuyer(buyer: IPreBuyer): Observable<boolean> {
    return this.http
      .put(END_POINT.PRE_BUYER + buyer._id, buyer)
      .pipe(map((data: any) => data.data));
  }
  public getBuyerById(id: string): Observable<IPreBuyer> {
    return this.http
      .get(END_POINT.PRE_BUYER + id)
      .pipe(map((data: any) => data.data));
  }
  public getAll(): Observable<IPreBuyer[]> {
    return this.http
      .get(END_POINT.PRE_BUYER)
      .pipe(map((data: any) => data.data));
  }
  public deltedBuyerById(id: string): Observable<boolean> {
    return this.http
      .delete(END_POINT.PRE_BUYER + id)
      .pipe(map((data: any) => data.data));
  }
}
