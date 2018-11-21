import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../../../services/chat.service';
import { Observable } from 'rxjs/internal/Observable';
import { IChat, IMessage } from '../../../models/chat.model';
import { Content } from '@ionic/angular';
import { UserSessionService } from '../../../services/user-session.service';
import { IUserSession } from '../../../models/userSession.model';
import { PropertyService } from '../../../services/property.service';
import { SocketIoService } from '../../../services/socket-io.service';
import { OnesignalService } from '../../../services/onesignal.service';
import { INotification } from '../../../models/notification.model';
import { map } from 'rxjs/internal/operators/map';
import { SellerService } from '../../../services/seller.service';
import { IProperty } from '../../../models/property.model';
import { ISeller } from '../../../models/seller.model';
import { BuyerService } from '../../../services/buyer.service';
import { IBuyer } from '../../../models/buyer.model';
import { PreBuildService } from '../../../services/pre-build.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  property: IProperty;
  chat: IChat;
  isLoad: boolean;
  isSending: boolean;
  istoLast = false;
  user: IUserSession;
  title: string;
  contentText: string;
  seller: ISeller;
  private oldHeigh: number;
  /**
   * heigh altura eb el numero de str
   */
  private stringHeigh: { heigh: number; numOfstring: number }[] = [];
  private isFirstEnter = false;
  @ViewChild(Content) content: Content;
  @ViewChild('myInput') myInput: ElementRef;
  buyer: IBuyer;

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private userService: UserSessionService,
    private propertyService: PropertyService,
    private preBuildService: PreBuildService,
    private socketService: SocketIoService,
    private oneSignalService: OnesignalService,
    private sellerService: SellerService,
    private router: Router,
    private buyerService: BuyerService,
  ) {
    this.user = userService.userSession.value;
    this.route.queryParams.subscribe(async params => {
      if (params.id) {
        if (this.user.type === 'preBuyer') {
          this.getRoomById(params.id);
          const prop = await this.getprePropertyById(params.id);
          this.property = prop;
          this.title = prop.name;
        } else {
          this.getRoomById(params.id);
          const prop = await this.getPropertyById(params.id);
          this.seller = await this.getSellerOfProperty(params.id);
          this.property = prop;
          this.title = prop.name ? prop.name : '';
        }
      }
    });
    this.socketService.onNewMsg().subscribe(chatId => {
      if (chatId === this.chat._id) {
        this.getRoomByChatId(this.chat._id);
      }
    });
  }

  ngOnInit() {}
  textAreaKeyup() {
    // da el primer valor
    if (!this.isFirstEnter) {
      this.oldHeigh = this.myInput.nativeElement.scrollHeight;
      this.isFirstEnter = true;
    }
    // solo cuando incrementa
    if (this.myInput.nativeElement.scrollHeight > this.oldHeigh) {
      // registra num de str si no esta en el arreglo
      this.stringHeigh.push({
        heigh: this.oldHeigh,
        numOfstring: this.contentText.length - 1,
      });
      // de nuevo valor para detectar cambio
      this.oldHeigh = this.myInput.nativeElement.scrollHeight;
    }
    const s = this.stringHeigh.findIndex(
      sh => sh.numOfstring === this.contentText.length,
    );
    // si regresa da valor de altura antiguo
    if (s !== -1) {
      this.myInput.nativeElement.style.height =
        this.stringHeigh[s].heigh + 'px';
      this.stringHeigh.splice(s, 1);
      this.oldHeigh = this.myInput.nativeElement.scrollHeight;
    } else {
      // valor nuevo de altura al incrementar
      this.myInput.nativeElement.style.height =
        this.myInput.nativeElement.scrollHeight + 'px';
    }
  }

  getRoomById(id) {
    this.isLoad = false;
    this.chatService.getByProp(id).subscribe(async chat => {
      if (chat === null) {
        this.newChat(id);
      } else {
        this.chat = chat;
        this.buyer = await this.getBuyerOfId(chat.buyer);

        this.scrollBottom();
        this.isLoad = true;
      }
    });
  }
  getRoomByChatId(id) {
    this.chatService.getByChatId(id).subscribe(chat => {
      this.chat = chat;
      this.scrollBottom();
      this.isLoad = true;
      this.isSending = true;
      console.log(chat);
    });
  }
  async getPropertyById(id) {
    let prop = await this.propertyService.getPropertyById(id).toPromise();
    if (prop !== null) {
      return prop;
    } else {
      prop = await this.preBuildService.getBuildById(id).toPromise();
      return prop;
    }
  }
  async getprePropertyById(propId) {
    return await this.preBuildService.getBuildById(propId).toPromise();
  }
  async submit() {
    this.isSending = false;
    const newMessage: IMessage = {
      content: this.contentText,
      createAt: new Date(),
      readBy: [this.user.id],
      uid: this.user.id,
      typeOfUser: this.user.type,
    };
    const res = await this.chatService
      .addMsg(this.chat._id, newMessage)
      .toPromise();
    if (res) {
      // vendedor id notifica
      const seller = await this.getSellerOfProperty(this.property._id);
      let arrToSendId = [];
      if (seller === undefined) {
        arrToSendId = [this.chat.buyer];
      } else {
        arrToSendId = [seller._id, this.chat.buyer];
      }
      const findIndex = arrToSendId.findIndex(id => id === this.user.id);
      if (findIndex !== -1) {
        arrToSendId.splice(findIndex, 0);
      }
      this.notification(
        'Nuevo Mensaje',
        `${this.user.name}: ${this.contentText}`,
        'verde',
        'msg',
        ['office', 'management'],
        arrToSendId,
      );
    }
    if (this.stringHeigh.length > 0) {
      this.myInput.nativeElement.style.height =
        this.stringHeigh[0].heigh + 'px';
      this.stringHeigh.length = 0;
    }
    this.contentText = ''.trim();
    this.scrollBottom();
  }
  newChat(propId) {
    this.chatService.newChat(this.user.id, propId).subscribe(chat => {
      this.chat = chat;
      this.isLoad = true;
    });
  }
  trackByCreated(msg: IMessage) {
    return msg.createAt;
  }
  scrollBottom() {
    // this.content.scrollToBottom();
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 10);
  }
  lastScroll(i) {
    // console.log(i);
    if (!this.istoLast && i === this.chat.messages.length - 1) {
      setTimeout(() => {
        this.content.scrollToBottom();
      }, 10);
      this.istoLast = true;
    }
  }
  // _helpers
  public notification(
    title,
    message,
    status,
    type,
    tags,
    reciversId: string[],
  ) {
    // notificacion
    const notification: INotification = {
      title: title,
      message: message,
      tags: tags,
      receiversId: reciversId,
      senderId: this.userService.userSession.value.id,
      status: status,
      type: type,
    };
    // onesignal
    this.oneSignalService
      .postOneSignalByTag(notification.title, message, tags, reciversId)
      .subscribe(() => {
        // guardar noti
        this.oneSignalService.newNotification(notification).subscribe();
      });
  }
  async getSellerOfProperty(id) {
    return await this.sellerService
      .getSellerAll()
      .pipe(
        map(sellers => sellers.find(s => !!s.property.find(p => p._id === id))),
      )
      .toPromise();
  }
  async getBuyerOfId(buyerId) {
    return await this.buyerService.getBuyerById(buyerId).toPromise();
  }
  private readMsg() {
    const ids = this.chat.messages
      .filter(m => !m.readBy.some(r => r === this.user.id))
      .map(msg => msg._id);

    this.chatService.addRead(this.chat._id, ids, this.user.id).subscribe();
  }
  ngOnDestroy() {
    this.readMsg();
  }
  backOne() {
    this.router
      .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
      .then(() => this.router.navigate(['chat']));
  }
}
