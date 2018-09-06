import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAdministrator } from '../models/administrator.model';
import { END_POINT } from '../_config/api.end-points';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdministratorService {
  constructor(private http: HttpClient) {}
  public getBuyerById(id: string): Observable<IAdministrator> {
    return this.http
      .get(END_POINT.ADMINISTRATOR + id)
      .pipe(map((data: any) => data.data));
  }
}
