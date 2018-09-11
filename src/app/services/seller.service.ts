import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISeller } from '../models/seller.model';
import { Observable } from 'rxjs';
import { END_POINT } from '../_config/api.end-points';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  constructor(private http: HttpClient) {}
  public getSellerAll(): Observable<ISeller[]> {
    return this.http.get(END_POINT.SELLER).pipe(map((data: any) => data.data));
  }
  public newSeller(seller: ISeller): Observable<ISeller[]> {
    return this.http
      .post(END_POINT.SELLER, seller)
      .pipe(map((data: any) => data.data));
  }
  public putSeller(seller: ISeller): Observable<boolean> {
    return this.http
      .put(END_POINT.SELLER + seller._id, seller)
      .pipe(map((data: any) => data.data));
  }
  public getSellerById(id: string): Observable<ISeller> {
    return this.http
      .get(END_POINT.SELLER_ID + id)
      .pipe(map((data: any) => data.data));
  }
  public deletedSellerById(id: string): Observable<boolean> {
    return this.http
      .delete(END_POINT.SELLER + id)
      .pipe(map((data: any) => data.data));
  }
}
