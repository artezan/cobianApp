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
  newStatusBuyerProperty(
    sBP: IStatusBuyerProperty,
  ): Observable<IStatusBuyerProperty> {
    return this.http
      .post(END_POINT.STATUS_BP, sBP)
      .pipe(map((data: any) => data.data));
  }
  deletedStatusBuyerProperty(sBPId: string): Observable<Boolean> {
    return this.http
      .delete(END_POINT.STATUS_BP + sBPId)
      .pipe(map((data: any) => data.data));
  }
}
