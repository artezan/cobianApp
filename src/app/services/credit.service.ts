import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICredit } from '../models/credit.model';
import { HttpClient } from '@angular/common/http';
import { END_POINT } from '../_config/api.end-points';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CreditService {
  constructor(private http: HttpClient) {}
  public newCredit(credit: ICredit): Observable<ICredit> {
    return this.http
      .post(END_POINT.CREDIT, credit)
      .pipe(map((data: any) => data.data));
  }
  public putCredit(credit: ICredit): Observable<boolean> {
    return this.http
      .put(END_POINT.CREDIT + credit._id, credit)
      .pipe(map((data: any) => data.data));
  }
}
