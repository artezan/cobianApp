import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISale } from '../models/sale.model';
import { Observable } from 'rxjs';
import { END_POINT } from '../_config/api.end-points';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  constructor(private http: HttpClient) {}
  public newSale(sale: ISale): Observable<ISale> {
    return this.http
      .post(END_POINT.SALE, sale)
      .pipe(map((data: any) => data.data));
  }
  public putSale(sale: ISale): Observable<boolean> {
    return this.http
      .put(END_POINT.SALE + sale._id, sale)
      .pipe(map((data: any) => data.data));
  }
  public getSale(): Observable<ISale[]> {
    return this.http.get(END_POINT.SALE).pipe(map((data: any) => data.data));
  }
  public getSaleById(id: string): Observable<ISale> {
    return this.http
      .get(END_POINT.SALE_ID + id)
      .pipe(map((data: any) => data.data));
  }
  public deltedSaleById(id: string): Observable<boolean> {
    return this.http
      .delete(END_POINT.SALE + id)
      .pipe(map((data: any) => data.data));
  }
  public getSaleByIdAdv(adviserId: string): Observable<ISale[]> {
    return this.http
      .post(END_POINT.SALE_ADV_ID, { adviser: adviserId })
      .pipe(map((data: any) => data.data));
  }
}
