import { Component, OnInit } from '@angular/core';
import { IGoal } from '../../../models/goal.model';
import { GoalService } from '../../../services/goal.service';
import { ActivatedRoute } from '@angular/router';
import { UserSessionService } from '../../../services/user-session.service';
import { ToastController, Platform } from '@ionic/angular';
import { FormatHoursFront, FormatDatesFront } from '../../../_config/_helpers';

@Component({
  selector: 'app-detail-goal-admin',
  templateUrl: './detail-goal-admin.component.html',
  styleUrls: ['./detail-goal-admin.component.scss'],
})
export class DetailGoalAdminComponent implements OnInit {
  percent = 1;
  isLoad = false;
  arrPropLikes: string[] = [];
  arrSBP: string[] = [];
  goal: IGoal;
  isDesktop = true;
  constructor(
    private route: ActivatedRoute,
    private goalService: GoalService,
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
    this.goalService.getGoaltById(id).subscribe(goal => {
      console.log(goal);
      this.goal = goal;
      this.getPercent(goal.goals);
      this.isLoad = true;
    });
  }
  getPercent(
    goals: [
      {
        nameGoal: string;
        isComplete: boolean;
      }
    ],
  ) {
    let numOfComplete = 0;
    goals.forEach(goal => {
      if (goal.isComplete) {
        numOfComplete++;
      }
    });
    this.percent = (numOfComplete * 100) / goals.length;
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
    });
    toast.present();
  }
  changeGoal() {
    this.goal.isComplete = false;
    this.goalService.putGoal(this.goal).subscribe(() => {
      this.getPercent(this.goal.goals);
      if (this.percent === 100) {
        this.goal.isComplete = true;
        this.goalService.putGoal(this.goal).subscribe(() => {
          this.presentToast('Se ha completado un objetivo');
        });
      }
      this.presentToast('Se ha modificado una meta');
    });
  }
  formatDates(dateInput: Date): string {
    return FormatDatesFront(dateInput);
  }
  formatHours(hours, minutes) {
    return FormatHoursFront(hours, minutes);
  }
  fortmatDate2(year, montn, day) {
    const date = new Date(year, montn, day);
    return this.formatDates(date);
  }
}
