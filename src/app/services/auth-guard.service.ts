import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { UserSessionService } from './user-session.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private userSession: UserSessionService,
    private alertCtrl: AlertController,
  ) {}
  /**
   *
   * @param route contiene la ruta futura que se activará
   * @param state el stado futuro
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    const url: string = state.url;
    const rol: string[] = route.data['rol'];
    return this.checkLogin(rol);
  }
  /**
   *
   * @param rol rol viene el user
   */
  checkLogin(rol: string[]): boolean {
    const currentUser = this.userSession.userSession.value;
    if (currentUser && currentUser.id) {
      const isRolFind = rol.some(r => r === currentUser.type);
      if (isRolFind) {
        return true;
      } else {
        this.presentAlert();
        this.userSession.loggout();
        return false;
      }
    } else {
      this.presentAlert();
      this.userSession.loggout();
      return false;
    }
  }
  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      subHeader: 'Acceso Denegado',
      message: 'No cuentas con los permisos necesarios.',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
