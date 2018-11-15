import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '../../services/user-session.service';
import { IUserSession } from '../../models/userSession.model';
import { StatusBuyerPropertyService } from '../../services/status-buyer-property.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import {
  IStatusBuyerProperty,
  IStatusBuyerPropertyGet
} from '../../models/statusBuyerProperty.model';
import { ChatService } from '../../services/chat.service';
import { Router, NavigationExtras } from '@angular/router';
import { IChat } from '../../models/chat.model';
import { SellerService } from '../../services/seller.service';
import { PropertyService } from '../../services/property.service';
import { PreBuyerService } from '../../services/pre-buyer.service';
import { PreBuildService } from '../../services/pre-build.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss']
})
export class ChatPage implements OnInit {
  user: IUserSession;
  propertiesBuyer = [];
  chats: any[] = [];
  isLoad: boolean;
  constructor(
    private userSessionService: UserSessionService,
    private statusBPService: StatusBuyerPropertyService,
    private chatService: ChatService,
    private router: Router,
    private sellerService: SellerService,
    private propertyService: PropertyService,
    private preBuyerService: PreBuyerService,
    private preBuildService: PreBuildService
  ) {
    this.user = userSessionService.userSession.value;
  }

  ngOnInit() {
    if (this.user.type === 'buyer') {
      this.getStatus();
    } else if (this.user.type === 'preBuyer') {
      this.getPrebuyer();
    } else {
      this.getRoomChatsByUser();
    }
  }
  getPrebuyer() {
    this.preBuyerService.getBuyerById(this.user.id).subscribe(buyer => {
      const buildsToChat = buyer.preBuild.filter(
        build => !build.timeLine.some(b => !b.isComplete)
      );
      console.log(buildsToChat);
      if (buildsToChat.length > 0) {
        buildsToChat.forEach(async build => {
          this.propertiesBuyer.push({
            status: 'azul',
            property: { _id: build._id, name: build.name },
            noRead: await this.getMsgNotReadByProp(build._id)
          });
        });
        console.log(this.propertiesBuyer);
      }
    });
  }
  getStatus() {
    // por status azul
    this.isLoad = false;
    this.statusBPService
      .findByBuyer(this.user.id)
      .pipe(map(sbp => sbp.filter(s => s.status === 'azul')))
      .subscribe(pb => {
        this.propertiesBuyer = pb;
        this.propertiesBuyer.map(async sBP => {
          sBP['noRead'] = await this.getMsgNotReadByProp(sBP.property._id);
        });
        this.isLoad = true;
      });
  }
  getRoomChatsByUser() {
    this.isLoad = false;
    this.chatService.getAll().subscribe(async chatsAll => {
      chatsAll.forEach(chat => {
        this.checkIsLive(chat.property, chat._id);
      });
      // filtro por seller
      if (this.user.type === 'seller') {
        const seller = await this.getSeller();
        this.chats = chatsAll.filter(chat => {
          return seller.property.some(p => p._id === chat.property);
        });
      } else if (this.user.type === 'management') {
        this.chats = chatsAll.filter(chat => {
          return chat.city === 'Puebla';
        });
      } else {
        this.chats = chatsAll;
      }
      this.chats.map(async c => {
        c['noRead'] = await this.getMsgNotReadByProp(c.property);
        c['prop'] = await this.getProperty(c.property);
      });
      this.isLoad = true;
    });
  }
  async getMsgNotReadByProp(propId: string) {
    const chat = await this.chatService.getByProp(propId).toPromise();
    if (chat !== null) {
      return chat.messages.filter(m => !m.readBy.some(r => r === this.user.id))
        .length;
    } else {
      return 0;
    }
  }
  goToRoom(id) {
    const data: NavigationExtras = { queryParams: { id: id } };
    this.router.navigate(['chat/room'], data);
  }
  async getSeller() {
    return await this.sellerService.getSellerById(this.user.id).toPromise();
  }
  async getProperty(id) {
    let prop = await this.propertyService.getPropertyById(id).toPromise();
    if (prop !== null) {
      return prop;
    } else {
      prop = await this.preBuildService.getBuildById(id).toPromise();
      return prop;
    }
  }
  async checkIsLive(propId, chatId) {
    let prop = await this.propertyService.getPropertyById(propId).toPromise();
    if (prop === null) {
      prop = await this.preBuildService.getBuildById(propId).toPromise();
      if (prop === null) {
        this.chatService.deletedById(chatId).subscribe();
      }
    }
  }
}
