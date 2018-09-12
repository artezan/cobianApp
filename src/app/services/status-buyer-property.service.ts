import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStatusBuyerProperty } from '../models/statusBuyerProperty.model';
import { HttpClient } from '@angular/common/http';
import { END_POINT } from '../_config/api.end-points';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StatusBuyerPropertyService {
  constructor(private http: HttpClient) {}
  public newStatusBuyerProperty(
    sBP: IStatusBuyerProperty,
  ): Observable<IStatusBuyerProperty> {
    return this.http
      .post(END_POINT.STATUS_BP, sBP)
      .pipe(map((data: any) => data.data));
  }
  public deletedStatusBuyerProperty(sBPId: string): Observable<Boolean> {
    return this.http
      .delete(END_POINT.STATUS_BP + sBPId)
      .pipe(map((data: any) => data.data));
  }
  public upgradeStatus(sBPId: string, sBPStatus: string): Observable<Boolean> {
    const body = { status: sBPStatus };
    return this.http
      .post(END_POINT.STATUS_UPGRADE + sBPId, body)
      .pipe(map((data: any) => data.data));
  }
  public getStatusBuyerProperty(): Observable<IStatusBuyerProperty[]> {
    return this.http
      .get(END_POINT.STATUS_BP)
      .pipe(map((data: any) => data.data));
  }
  public searchSpecial(buyerId, propertyId): Observable<IStatusBuyerProperty> {
    const body = { buyer: buyerId, property: propertyId };
    return this.http
      .post(END_POINT.STATUS_SEARCH, body)
      .pipe(map((data: any) => data.data));
  }
}
