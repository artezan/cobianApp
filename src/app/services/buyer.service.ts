import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { IBuyer } from '../models/buyer.model';
import { END_POINT } from '../_config/api.end-points';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BuyerService {
  constructor(private http: HttpClient) {}
  public getBuyerById(id: string): Observable<IBuyer> {
    return this.http
      .get(END_POINT.BUYER_ID + id)
      .pipe(map((data: any) => data.data));
  }
  public getBuyerAll(): Observable<IBuyer[]> {
    return this.http.get(END_POINT.BUYER).pipe(map((data: any) => data.data));
  }

  public putBuyer(buyer: IBuyer): Observable<boolean> {
    return this.http
      .put(END_POINT.BUYER + buyer._id, buyer)
      .pipe(map((data: any) => data.data));
  }
  public checkBuyer(buyer: IBuyer): Observable<IBuyer> {
    return this.http
      .post(END_POINT.BUYER_CHECK, buyer)
      .pipe(map((data: any) => data.data));
  }
  public newBuyer(buyer: IBuyer): Observable<IBuyer> {
    return this.http
      .post(END_POINT.BUYER, buyer)
      .pipe(map((data: any) => data.data));
  }
  public deletedBuyer(buyer: IBuyer): Observable<boolean> {
    return this.http
      .delete(END_POINT.BUYER + buyer._id)
      .pipe(map((data: any) => data.data));
  }
}
