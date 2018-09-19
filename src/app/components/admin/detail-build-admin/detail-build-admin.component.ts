import { Component, OnInit } from '@angular/core';
import { IBuild } from '../../../models/build.model';
import { BuildService } from '../../../services/build.service';
import { ActivatedRoute } from '@angular/router';
import { UserSessionService } from '../../../services/user-session.service';
import { ToastController, Platform } from '@ionic/angular';
import { FormatDatesFront, FormatHoursFront } from '../../../_config/_helpers';

@Component({
  selector: 'app-detail-build-admin',
  templateUrl: './detail-build-admin.component.html',
  styleUrls: ['./detail-build-admin.component.scss'],
})
export class DetailBuildAdminComponent implements OnInit {
  percent = 1;
  isLoad = false;
  arrPropLikes: string[] = [];
  arrSBP: string[] = [];
  build: IBuild;
  isDesktop = true;
  constructor(
    private route: ActivatedRoute,
    private buildService: BuildService,
    private userSessionService: UserSessionService,
    public toastController: ToastController,
    private platform: Platform,
  ) {
    this.route.queryParams.subscribe(params => {
      if (params.id) {
        this.getGoalById(params.id);
      }
    });
  }

  ngOnInit() {}
  getGoalById(id: string) {
    this.isLoad = false;
    this.buildService.getBuildById(id).subscribe(build => {
      console.log(build);
      this.build = build;
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
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
    });
    toast.present();
  }
  changeGoal() {
    console.log(this.build);
    this.buildService.putBuild(this.build).subscribe(() => {
      this.getPercent(this.build.timeLine);
      if (this.percent === 100) {
        this.presentToast('Se ha completado una Obra');
      } else {
        this.presentToast('Se ha modificado una Fase');
      }
    });
  }
  formatDates(year, month, day): string {
    const date = new Date(year, month, day);
    return FormatDatesFront(date);
  }
  formatHours(hours, minutes) {
    return FormatHoursFront(hours, minutes);
  }
}
