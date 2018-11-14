import { Component, OnInit } from '@angular/core';
import { PreBuildService } from '../../../services/pre-build.service';
import { ActivatedRoute } from '@angular/router';
import { UserSessionService } from '../../../services/user-session.service';
import { IUserSession } from '../../../models/userSession.model';
import { IPreBuild } from '../../../models/preBuild';
import { INotification } from '../../../models/notification.model';
import { OnesignalService } from '../../../services/onesignal.service';
import { ToastController } from '@ionic/angular';
import { FormatDatesFront } from '../../../_config/_helpers';

@Component({
  selector: 'app-detail-pre-build',
  templateUrl: './detail-pre-build.component.html',
  styleUrls: ['./detail-pre-build.component.scss']
})
export class DetailPreBuildComponent implements OnInit {
  user: IUserSession;
  isDesktop = true;
  isLoad: boolean;
  preBuild: IPreBuild;
  percent: number;

  constructor(
    private preBuildService: PreBuildService,
    private route: ActivatedRoute,
    private userSession: UserSessionService,
    private oneSignalService: OnesignalService,
    public toastController: ToastController
  ) {
    this.user = userSession.userSession.value;
    this.route.queryParams.subscribe(params => {
      if (params.id) {
        this.getPreBuild(params.id);
      }
    });
  }

  ngOnInit() {}
  getPreBuild(id: string) {
    this.isLoad = false;
    this.preBuildService.getBuildById(id).subscribe(build => {
      this.preBuild = build;
      this.getPercent(build.timeLine);
      this.isLoad = true;
    });
  }
  getPercent(timeLine) {
    let numOfComplete = 0;
    timeLine.forEach(tl => {
      if (tl.isComplete) {
        numOfComplete++;
      }
    });
    this.percent = (numOfComplete * 100) / timeLine.length;
  }
  checkAdminRol(userType: string): boolean {
    if (userType === 'preBuyer') {
      return false;
    } else {
      return true;
    }
  }
  changeStatus(e: boolean) {
    this.preBuildService.putBuild(this.preBuild).subscribe(() => {
      this.getPercent(this.preBuild.timeLine);
      if (e) {
        if (this.percent === 100) {
          this.notification(
            'Obra Terminada',
            `Se ha completado la obra: "${this.preBuild.name}"`,
            'azul',
            'celebrate',
            undefined,
            this.preBuild.preBuyer.map(a => a._id)
          );
        } else {
          this.notification(
            'Fase Concluida',
            `Se ha completado una fase de la obra: "${this.preBuild.name}"`,
            'rojo',
            'celebrate',
            undefined,
            this.preBuild.preBuyer.map(a => a._id)
          );
        }
      }
      this.presentToast(
        this.percent === 100 ? 'Obra Terminada' : 'Se ha modificado una fase'
      );
    });
  }
  private notification(
    title,
    message,
    status,
    type,
    tags,
    receiversId: string[]
  ) {
    // notificacion
    const notification: INotification = {
      title: title,
      message: message,
      tags: tags,
      receiversId: receiversId,
      senderId: this.userSession.userSession.value.id,
      status: status,
      type: type
    };
    // onesignal
    this.oneSignalService
      .postOneSignalByTag(notification.title, message, tags, receiversId)
      .subscribe(c => {
        // guardar noti
        this.oneSignalService.newNotification(notification).subscribe();
      });
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
  formatDates(year, month, day): string {
    const date = new Date(year, month, day);
    return FormatDatesFront(date);
  }
  formatDates2(date: Date): string {
    return FormatDatesFront(date);
  }
}
