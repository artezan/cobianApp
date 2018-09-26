import { Component, OnInit } from '@angular/core';
import {
  TableColumsModel,
  TableStatusChips,
} from '../../../models/tableColums.model';
import { IGoal } from '../../../models/goal.model';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ToastController, AlertController, Platform } from '@ionic/angular';
import { OfertService } from '../../../services/ofert.service';
import { IOfert } from '../../../models/ofert.model';
import { GoalService } from '../../../services/goal.service';
import { UserSessionService } from '../../../services/user-session.service';
import { IUserSession } from '../../../models/userSession.model';

@Component({
  selector: 'app-list-goals',
  templateUrl: './list-goals.component.html',
  styleUrls: ['./list-goals.component.scss'],
})
export class ListGoalsComponent implements OnInit {
  isLoading = false;
  columns: TableColumsModel[];
  rows: any[] = [];
  isDesktop = false;
  openMenu: boolean;
  // goals
  goals: IGoal[] = [];
  // numofFilters
  numOfFilters = 0;
  user: IUserSession;
  constructor(
    private goalService: GoalService,
    private platform: Platform,
    private router: Router,
    public alertController: AlertController,
    public toastController: ToastController,
    public route: ActivatedRoute,
    private userSession: UserSessionService,
  ) {
    this.user = userSession.userSession.value;
    this.isDesktop = platform.is('desktop');
    if (this.isDesktop) {
      this.openMenu = true;
    } else {
      this.openMenu = false;
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['res']) {
        this.presentToast(params['res']);
      }
    });
    this.columns = [
      {
        name: 'Titulo Objetivo',
        prop: 'title',
        type: 'normal',
      },
      {
        name: 'Número de Asesores',
        prop: 'adviser',
        type: 'normal',
      },
      {
        name: 'Grupal',
        prop: 'isByManagement',
        type: 'boolean',
      },
      {
        name: 'Inicio',
        prop: 'timestamp',
        type: 'date',
      },
      {
        name: 'Fin',
        prop: 'dateToFinish',
        type: 'date',
      },
      {
        name: 'Contenido',
        prop: 'content',
        type: 'normal',
      },
      {
        name: 'Estado',
        prop: 'status',
        type: 'status',
      },

      {
        name: 'Acciones',
        prop: 'acction',
        type: 'buttons',
        buttonEdit: true,
        buttonDeleted: true,
        buttonDetails: true,
      },
    ];
    this.getGoalAll();
  }
  getGoalAll() {
    this.isLoading = false;
    this.numOfFilters = 0;
    if (this.user.type === 'adviser') {
      this.goalService.getGoal().subscribe(goal => {
        this.goals = goal.filter(g => {
          return !!g.adviser.find(adv => adv._id === this.user.id);
        });
        this.setRows(this.goals);
      });
    } else {
      this.goalService.getGoal().subscribe(goal => {
        this.goals = goal;
        this.setRows(this.goals);
      });
    }
  }
  newOfert() {
    this.router.navigate(['new-edit-goal']);
  }
  setRows(goals: IGoal[]) {
    const rows = [];

    goals.forEach(goal => {
      const properties: TableStatusChips[] = [];
      if (goal.status) {
        if (goal.status === 'amarillo') {
          properties.push({
            name: 'Media',
            status: goal.status,
          });
        } else if (goal.status === 'gris') {
          properties.push({
            name: 'En Espera',
            status: goal.status,
          });
        } else if (goal.status === 'verde') {
          properties.push({
            name: 'Baja',
            status: goal.status,
          });
        } else if (goal.status === 'rojo') {
          properties.push({
            name: 'Urgente',
            status: goal.status,
          });
        } else if (goal.status === 'azul') {
          properties.push({
            name: 'Cumplida',
            status: goal.status,
          });
        }
      }
      console.log(properties);
      rows.push({
        _id: goal._id,
        adviser: goal.adviser.length,
        isByManagement: goal.isByManagement,
        title: goal.title,
        content: goal.content,
        timestamp: goal.timestamp,
        dateToFinish: new Date(goal.year, goal.month, goal.day),
        status: properties,
      });
    });
    this.rows = rows;
    this.isLoading = true;
  }
  edit(item) {
    console.log(item);
    if (item.isByManagement && this.user.type !== 'adviser') {
      const data: NavigationExtras = {
        queryParams: { id: item._id },
      };
      this.router.navigate(['new-edit-goal'], data);
    } else if (this.user.type === 'adviser') {
      this.presentToast('Acceso denegado');
    }
    if (!item.isByManagement) {
      const data: NavigationExtras = {
        queryParams: { id: item._id },
      };
      this.router.navigate(['new-edit-goal'], data);
    }
    // this.navCtr.navigateRoot('new-buyer', false, data);
  }
  deleted(c: IGoal) {
    this.goalService
      .deleteGoal(c._id)
      .toPromise()
      .then(() => {
        this.getGoalAll();
      });
  }
  detail(item: IGoal) {
    const data: NavigationExtras = {
      queryParams: { id: item._id },
    };
    this.router.navigate(['detail-goal-admin'], data);
  }
  async presentAlertConfirm(c) {
    const alert = await this.alertController.create({
      header: 'Eliminar Meta',
      message: `¿Desea eliminar meta ?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Sí',
          role: 'ok',
          handler: () => {
            /* this.deleted(buyer);
            this.getBuyerAll(); */
          },
        },
      ],
    });

    await alert.present();
    // IMPORTANTE ASYNC !!!!!
    await alert.onWillDismiss().then(res => {
      if (res.role === 'ok') {
        this.deleted(c);
      }
    });
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }
  /*   getFilters(filters: {
    day: number;
    month: number;
    year: number;
    isRenter: boolean;
  }) {
    const advFinded = this.seller.filter(adv => SellerFilter(adv, filters));
    //  setea buyers
    this.setRows(advFinded);
    // num filters
    let numFilters = 0;
    if (filters.day) {
      numFilters++;
    }
    if (filters.month) {
      numFilters++;
    }
    if (filters.year) {
      numFilters++;
    }
    if (filters.isRenter) {
      numFilters++;
    }
    this.numOfFilters = numFilters;
  } */
}
