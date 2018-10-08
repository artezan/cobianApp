import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { END_POINT } from '../_config/api.end-points';
import { INotification } from '../models/notification.model';
import { CONST_GENERAL } from '../_config/_const-general';

@Injectable({
  providedIn: 'root',
})
export class OnesignalService {
  constructor(private http: HttpClient) {}
  public search(
    id?: string,
    tags?: string,
    pageNumber = 1,
    nPerPage = 10,
  ): Observable<INotification[]> {
    const body = {
      id,
      pageNumber,
      nPerPage,
      tags,
    };
    return this.http
      .post(END_POINT.NOTIFICATION_SEARCH, body)
      .pipe(map((data: any) => data.data));
  }
  public notRead(id: string, tags: string): Observable<INotification[]> {
    const body = {
      id,
      tags,
    };
    return this.http
      .post(END_POINT.NOTIFICATION_NOT_READ, body)
      .pipe(map((data: any) => data.data));
  }
  public newNotification(
    notification: INotification,
  ): Observable<INotification> {
    return this.http
      .post(END_POINT.NOTIFICATION, notification)
      .pipe(map((data: any) => data.data));
  }
  public putNotification(notification: INotification): Observable<boolean> {
    return this.http
      .put(END_POINT.NOTIFICATION + notification._id, notification)
      .pipe(map((data: any) => data.data));
  }
  /**
   *
   * @param headings Titulo de la notificacion
   * @param contents contenido
   * @param tags typo se usuario  | 'administrator' | 'buyer' | 'seller' | 'adviser' | 'management' | 'maker' | 'office'
   * @param usersId [ids]
   */
  public postOneSignalByTag(
    headings: string,
    contents: string,
    tags?: string[],
    usersId?: string[],
  ): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Basic ${CONST_GENERAL.REST_API_KEY}`,
      'Content-Type': 'application/json; charset=utf-8',
    });
    const filters = this.filterByTags(tags, usersId);
    const body = {
      app_id: CONST_GENERAL.ONESIGNAL_APP_ID,
      headings: { en: headings },
      contents: { en: contents },
      filters: filters,
    };
    console.log(body);
    return this.http.post(END_POINT.ONESIGNAL, body, { headers: headers });
  }
  /**
   * Notif. con fecha
   * @param headings titulo
   * @param contents contenido
   * @param date fecha a mandar
   * @param tags grupos
   * @param usersId usuarios id
   * @param prevTimeSet minutos antes de evento
   */
  public postOneSignalBySchedule(
    headings: string,
    contents: string,
    date: Date,
    tags?: string[],
    usersId?: string[],
    prevTimeSet = 30,
  ): Observable<any> {
    const prevTime = prevTimeSet * 60000;
    const schedule = new Date(date).getTime() - prevTime;
    const headers = new HttpHeaders({
      Authorization: `Basic ${CONST_GENERAL.REST_API_KEY}`,
      'Content-Type': 'application/json; charset=utf-8',
    });
    const filters = this.filterByTags(tags, usersId);
    const body = {
      app_id: CONST_GENERAL.ONESIGNAL_APP_ID,
      headings: { en: headings },
      contents: { en: contents },
      filters: filters,
      send_after: new Date(schedule).toString(),
    };
    console.log(body);
    return this.http.post(END_POINT.ONESIGNAL, body, { headers: headers });
  }
  public deleteOneSignalSchedule(notificationId) {
    const headers = new HttpHeaders({
      Authorization: `Basic ${CONST_GENERAL.REST_API_KEY}`,
      'Content-Type': 'application/json; charset=utf-8',
    });
    return this.http.delete(
      `${END_POINT.ONESIGNAL}/${notificationId}?app_id=${
        CONST_GENERAL.ONESIGNAL_APP_ID
      }`,
      { headers: headers },
    );
  }
  public getAllNotificationOneSignal(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Basic ${CONST_GENERAL.REST_API_KEY}`,
      'Content-Type': 'application/json; charset=utf-8',
    });
    return this.http.get(
      `https://onesignal.com/api/v1/notifications?app_id=${
        CONST_GENERAL.ONESIGNAL_APP_ID
      }`,
      { headers: headers },
    );
  }
  // helpers
  private filterByTags(tags: string[], usersId: string[]) {
    let filters = [];
    if (tags && (usersId === undefined || usersId === null)) {
      filters = this.getFiltersTags(tags);
    }
    if (usersId && (tags === undefined || tags === null)) {
      filters = this.getFiltersIds(usersId);
    }
    if (
      usersId !== undefined &&
      usersId !== null &&
      (tags !== undefined && tags !== null)
    ) {
      filters = this.getFiltersTags(tags);
      filters.push({
        operator: 'OR',
      });
      filters = filters.concat(this.getFiltersIds(usersId));
    }

    return filters;
  }

  private getFiltersTags(tags: string[]) {
    const filters = [];
    tags.forEach((tag, i) => {
      if (i === 0) {
        filters.push({
          field: 'tag',
          key: 'type',
          relation: '=',
          value: tag,
        });
      } else {
        filters.push(
          {
            operator: 'OR',
          },
          {
            field: 'tag',
            key: 'type',
            relation: '=',
            value: tag,
          },
        );
      }
    });
    return filters;
  }
  private getFiltersIds(usersId: string[]) {
    const ids = [];
    usersId.forEach((userId, i) => {
      if (i === 0) {
        ids.push({
          field: 'tag',
          key: '_id',
          relation: '=',
          value: userId,
        });
      } else {
        ids.push(
          {
            operator: 'OR',
          },
          {
            field: 'tag',
            key: '_id',
            relation: '=',
            value: userId,
          },
        );
      }
    });
    return ids;
  }
  /* public getPropertyById(id: string): Observable<IProperty> {
    return this.http
      .get(END_POINT.PROPERTY_BY_ID + id)
      .pipe(map((data: any) => data.data));
  }
  public getAll(): Observable<IProperty[]> {
    return this.http
      .get(END_POINT.PROPERTY)
      .pipe(map((data: any) => data.data));
  }
  public getAllSpecial(): Observable<IProperty[]> {
    return this.http
      .get(END_POINT.PROPERTY_ALL)
      .pipe(map((data: any) => data.data));
  }
  public deletedById(id: string): Observable<boolean> {
    return this.http
      .delete(END_POINT.PROPERTY + id)
      .pipe(map((data: any) => data.data));
  }
  public newProperty(property: IProperty): Observable<IProperty> {
    return this.http
      .post(END_POINT.PROPERTY, property)
      .pipe(map((data: any) => data.data));
  }
  public putProperty(property: IProperty): Observable<boolean> {
    return this.http
      .put(END_POINT.PROPERTY + property._id, property)
      .pipe(map((data: any) => data.data));
  }
  public getPropertySimulate(
    property: IProperty,
    percentage: number,
  ): Observable<IProperty[]> {
    const body: any = property;
    body.percentage = percentage;
    return this.http
      .post(END_POINT.PROPERTY_SIMULATE, body)
      .pipe(map((data: any) => data.data));
  } */
}
