import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UserSessionService } from '../../../services/user-session.service';
import { IUserSession } from '../../../models/userSession.model';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {
  sessions: IUserSession[];
  user: IUserSession;

  constructor(
    public popoverController: PopoverController,
    private userSession: UserSessionService,
    private storage: Storage
  ) {
    this.user = userSession.userSession.value;
    this.getSessions();
  }

  ngOnInit() {}
  async presentPopover(ev: any) {
    const popover = await this.popoverController.getTop();
    return await popover.dismiss();
  }
  async getSessions() {
    this.sessions = await this.userSession.getSessionsSaved();
    console.log('sessions', this.sessions);
  }
  // cambia de sesion
  startSession(session: IUserSession) {
    this.storage.set('userSessionCurrent', session);
    this.userSession.loggoutWithoutStore();
  }
  // cierra solo la sesion actual
  closeSession(session: IUserSession) {
    this.userSession.removeSession(session);
    this.storage.remove('userSessionCurrent');
    this.userSession.loggoutWithoutStore();
  }
  getType(
    type:
      | 'administrator'
      | 'buyer'
      | 'seller'
      | 'adviser'
      | 'management'
      | 'maker'
      | 'office'
      | 'preBuyer'
  ) {
    if (type === 'administrator') {
      return 'Administrador';
    } else if (type === 'adviser') {
      return 'Asesor';
    } else if (type === 'buyer') {
      return 'Comprador';
    } else if (type === 'maker') {
      return 'Construc.';
    } else if (type === 'management') {
      return 'Gerente';
    } else if (type === 'office') {
      return 'Oficinista';
    } else if (type === 'seller') {
      return 'Vendedor';
    } else if (type === 'preBuyer') {
      return 'Preventa';
    }
  }
}
