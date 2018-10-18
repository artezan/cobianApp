import { Component, OnInit } from '@angular/core';
import { IGoal } from '../../../models/goal.model';
import { GoalService } from '../../../services/goal.service';
import { ActivatedRoute } from '@angular/router';
import { UserSessionService } from '../../../services/user-session.service';
import { ToastController, Platform } from '@ionic/angular';
import { FormatHoursFront, FormatDatesFront } from '../../../_config/_helpers';
import { IUserSession } from '../../../models/userSession.model';
import { INotification } from '../../../models/notification.model';
import { OnesignalService } from '../../../services/onesignal.service';
import { SaleService } from '../../../services/sale.service';
import { ISale } from '../../../models/sale.model';

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
  user: IUserSession;
  titleCard: string;
  totalCurrent: number;
  isMoney: boolean;
  constructor(
    private route: ActivatedRoute,
    private goalService: GoalService,
    private userSessionService: UserSessionService,
    public toastController: ToastController,
    private platform: Platform,
    private userSession: UserSessionService,
    private oneSignalService: OnesignalService,
    private salesService: SaleService,
  ) {
    this.user = userSession.userSession.value;
    this.route.queryParams.subscribe(params => {
      if (params.id) {
        this.getGoalById(params.id);
      }
    });
  }

  ngOnInit() {}
  getGoalById(id: string) {
    this.isLoad = false;
    this.goalService.getGoaltById(id).subscribe(async goal => {
      this.goal = goal;
      if (goal.typeOfGoal === 'goals') {
        this.getPercent(goal.goals);
        this.titleCard = 'Lista de Objetivos';
      } else if (goal.typeOfGoal === 'rentTotal') {
        this.isMoney = false;
        this.titleCard = 'Rentas Totales';
        //  arr sales con filtros de asesores
        const sales = await this.getTotalSalesRent(goal);
        //  conteo de ventas
        this.totalCurrent = sales.length;
        //  % de la meta
        this.getPercentNotGoals(goal.quantitative, sales.length);
      } else if (goal.typeOfGoal === 'costOfRent') {
        this.isMoney = true;
        // obtiene las ventas de los asesores
        this.titleCard = 'Total Recaudado en Rentas';
        const sales = await this.getTotalSalesRent(goal);
        // total numerico
        const total = this.getSumOfNumber(sales.map(s => s.price));
        this.totalCurrent = total;
        // % de la meta
        this.getPercentNotGoals(goal.quantitative, total);
      } else if (goal.typeOfGoal === 'salesTotal') {
        this.isMoney = false;
        //  obtiene ventas asesores
        this.titleCard = 'Total de Ventas';
        //  arr sales con filtros de asesores
        const sales = await this.getTotalSalesNoRent(goal);
        //  conteo de ventas
        this.totalCurrent = sales.length;
        //  % de la meta
        this.getPercentNotGoals(goal.quantitative, sales.length);
      } else if (goal.typeOfGoal === 'costOfSales') {
        this.isMoney = true;
        this.titleCard = 'Total Recaudado en Ventas';
        const sales = await this.getTotalSalesNoRent(goal);
        // total numerico
        const total = this.getSumOfNumber(sales.map(s => s.price));
        this.totalCurrent = total;
        // % de la meta
        this.getPercentNotGoals(goal.quantitative, total);
      } else if (goal.typeOfGoal === 'rentSalesTotal') {
        this.isMoney = false;
        this.titleCard = 'Total de Ventas y Rentas';
        //  arr sales con filtros de asesores
        const sales = await this.getTotalSalesRentSale(goal);
        //  conteo de ventas
        this.totalCurrent = sales.length;
        //  % de la meta
        this.getPercentNotGoals(goal.quantitative, sales.length);
      } else if (goal.typeOfGoal === 'rentSalesCost') {
        this.isMoney = true;
        this.titleCard = 'Total Recaudado en Ventas y Rentas';
        const sales = await this.getTotalSalesRentSale(goal);
        // total numerico
        const total = this.getSumOfNumber(sales.map(s => s.price));
        this.totalCurrent = total;
        // % de la meta
        this.getPercentNotGoals(goal.quantitative, total);
      }
      this.isLoad = true;
    });
  }
  async getTotalSalesRent(goal: IGoal) {
    const sale = await this.salesService.getSale().toPromise();
    const dateStart = new Date(goal.timestamp).getTime();
    const dateEnd = new Date(goal.year, goal.month, goal.day).getTime();
    const salesFilter: ISale[] = [];
    for (const adv of goal.adviser) {
      sale
        .filter(
          s =>
            s.adviser.some(a => a._id === adv._id) &&
            s.isRent &&
            (dateStart <= new Date(s.timestamp).getTime() &&
              dateEnd > new Date(s.timestamp).getTime()),
        )
        .forEach(s => {
          const isFinded = salesFilter.some(
            saleFilter => saleFilter._id === s._id,
          );
          if (!isFinded) {
            salesFilter.push(s);
          }
        });
    }
    return salesFilter;
  }
  async getTotalSalesRentSale(goal: IGoal) {
    const sale = await this.salesService.getSale().toPromise();
    const dateStart = new Date(goal.timestamp).getTime();
    const dateEnd = new Date(goal.year, goal.month, goal.day).getTime();
    const salesFilter: ISale[] = [];
    for (const adv of goal.adviser) {
      sale.filter(s => s.adviser.some(a => a._id === adv._id)).forEach(s => {
        const isFinded = salesFilter.some(
          saleFilter =>
            saleFilter._id === s._id &&
            (dateStart <= new Date(s.timestamp).getTime() &&
              dateEnd > new Date(s.timestamp).getTime()),
        );
        if (!isFinded) {
          salesFilter.push(s);
        }
      });
    }
    return salesFilter;
  }
  async getTotalSalesNoRent(goal: IGoal) {
    const sale = await this.salesService.getSale().toPromise();
    console.log(sale);
    console.log(new Date('2018-10-16T17:42:09.777Z'));
    const dateStart = new Date(goal.timestamp).getTime();
    const dateEnd = new Date(goal.year, goal.month, goal.day).getTime();
    const salesFilter: ISale[] = [];
    for (const adv of goal.adviser) {
      sale
        .filter(
          s =>
            s.adviser.some(a => a._id === adv._id) &&
            s.isRent === false &&
            (dateStart <= new Date(s.timestamp).getTime() &&
              dateEnd > new Date(s.timestamp).getTime()),
        )
        .forEach(s => {
          const isFinded = salesFilter.some(
            saleFilter => saleFilter._id === s._id,
          );
          if (!isFinded) {
            salesFilter.push(s);
          }
        });
    }
    return salesFilter;
  }
  getSumOfNumber(arrNum: number[]): number {
    let sum = 0;
    for (const num of arrNum) {
      sum = sum + num;
    }
    return sum;
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
  getPercentNotGoals(finalNumber, currentNumber) {
    this.percent = (currentNumber * 100) / finalNumber;
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
    });
    toast.present();
  }
  changeGoal(e) {
    this.goal.isComplete = false;
    this.goalService.putGoal(this.goal).subscribe(() => {
      this.getPercent(this.goal.goals);
      if (this.percent === 100) {
        this.goal.isComplete = true;
        this.goalService.putGoal(this.goal).subscribe(() => {
          this.presentToast('Se ha completado un objetivo');
        });
        if (this.user.type !== 'adviser') {
          this.notification(
            'Meta lograda',
            `Se ha completado la meta: "${this.goal.title}"`,
            'azul',
            'celebrate',
            undefined,
            this.goal.adviser.map(a => a._id),
          );
        }
      } else {
        if (this.user.type !== 'adviser' && e.checked) {
          this.notification(
            'Objetivo Cumplido',
            `Se ha completado una meta de el objetivo: "${this.goal.title}"`,
            'rojo',
            'celebrate',
            undefined,
            this.goal.adviser.map(a => a._id),
          );
        }
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
  // noti
  private notification(
    title,
    message,
    status,
    type,
    tags,
    receiversId: string[],
  ) {
    // notificacion
    const notification: INotification = {
      title: title,
      message: message,
      tags: tags,
      receiversId: receiversId,
      senderId: this.userSession.userSession.value.id,
      status: status,
      type: type,
    };
    // onesignal
    this.oneSignalService
      .postOneSignalByTag(notification.title, message, tags, receiversId)
      .subscribe(c => {
        // guardar noti
        this.oneSignalService.newNotification(notification).subscribe();
      });
  }
}
