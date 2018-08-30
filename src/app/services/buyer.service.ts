import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
}
