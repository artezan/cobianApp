import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { END_POINT } from '../_config/api.end-points';
import { IChat, IMessage } from '../models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private http: HttpClient) {}
  public getAll(): Observable<IChat[]> {
    return this.http.get(END_POINT.CHAT).pipe(map((data: any) => data.data));
  }
  public getByProp(propertyId: string): Observable<IChat> {
    return this.http
      .get(END_POINT.CHAT_PROP_ID + propertyId)
      .pipe(map((data: any) => data.data));
  }
  public getByChatId(chatId: string): Observable<IChat> {
    return this.http
      .get(END_POINT.CHAT_ID + chatId)
      .pipe(map((data: any) => data.data));
  }
  public getByCity(cityId: string): Observable<IChat[]> {
    return this.http
      .get(END_POINT.CHAT_CITY_ID + cityId)
      .pipe(map((data: any) => data.data));
  }
  public addMsg(chatId: string, newMessages: IMessage): Observable<IChat> {
    const body = { _id: chatId, newMessages };
    return this.http
      .post(END_POINT.CHAT_ADD_MSG, body)
      .pipe(map((data: any) => data.data));
  }
  public addRead(chatId: string, messagesId: string[], uid): Observable<IChat> {
    const body = { _id: chatId, messagesId, uid };
    return this.http
      .post(END_POINT.CHAT_ADD_READ, body)
      .pipe(map((data: any) => data.data));
  }
  public newChat(
    buyerId: string,
    propertyId: string,
    city = 'Puebla'
  ): Observable<IChat> {
    const body = {
      buyer: buyerId,
      property: propertyId,
      city: city,
      messages: []
    };
    return this.http
      .post(END_POINT.CHAT, body)
      .pipe(map((data: any) => data.data));
  }
  public deletedById(id: string): Observable<boolean> {
    return this.http
      .delete(END_POINT.CHAT + id)
      .pipe(map((data: any) => data.data));
  }
  /*   public get(buyerId: string, percentage = 10): Observable<boolean> {
    const body = { percentage: percentage };
    return this.http
      .post(END_POINT.PROPERTY_MATCH_SEARCH + buyerId, body)
      .pipe(map((data: any) => data.data));
  }
  public getPropertyById(id: string): Observable<IProperty> {
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
