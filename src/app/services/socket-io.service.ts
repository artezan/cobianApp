import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INotification } from '../models/notification.model';
import { END_POINT } from '../_config/api.end-points';
import * as io from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketIoService {
  private socket: SocketIOClient.Socket; // The client instance of socket.io
  public numOfNewNoti = new BehaviorSubject<number>(0);
  private cont = 0;
  constructor() {
    // start listen
    this.socket = io(END_POINT.IP);
  }
  /**
   * evento llamado en los post notification
   */
  public onNewPost(): Observable<INotification> {
    return new Observable<INotification>(observer => {
      this.socket.on('NEW_NOTIFICATION', (newPost: INotification) =>
        observer.next(newPost),
      );
    });
  }
  public addNum() {
    this.cont++;
    this.numOfNewNoti.next(this.cont);
  }
  public resetNum() {
    this.cont = 0;
    this.numOfNewNoti.next(0);
  }
}
