import { Component, OnInit } from '@angular/core';
import { TableColumsModel } from '../../../models/tableColums.model';
import { IBuild } from '../../../models/build.model';
import { BuildService } from '../../../services/build.service';
import {
  Platform,
  AlertController,
  ToastController,
  NavController,
} from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { FilerBuild } from '../../../_config/_helpers';

@Component({
  selector: 'app-list-build-admin',
  templateUrl: './list-build-admin.component.html',
  styleUrls: ['./list-build-admin.component.scss'],
})
export class ListBuildAdminComponent implements OnInit {
  isLoading = false;
  columns: TableColumsModel[];
  rows: any[] = [];
  isDesktop = false;
  openMenu: boolean;
  // buildings
  buildings: IBuild[] = [];
  // numofFilters
  numOfFilters = 0;

  constructor(
    private buildService: BuildService,
    private platform: Platform,
    private router: Router,
    public alertController: AlertController,
    public toastController: ToastController,
    public navCtr: NavController,
    public route: ActivatedRoute,
  ) {
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
        name: 'Nombre',
        prop: 'name',
        type: 'normal',
      },
      {
        name: '#Constructores',
        prop: 'maker',
        type: 'number',
      },
      {
        name: 'Ciudad',
        prop: 'city',
        type: 'normal',
      },
      {
        name: 'Fecha Inicio',
        prop: 'timestamp',
        type: 'date',
      },
      {
        name: 'Fecha Fin',
        prop: 'dateToEnd',
        type: 'date',
      },
      {
        name: 'Completado',
        prop: 'isComplete',
        type: 'boolean',
      },
      {
        name: 'notas',
        prop: 'notes',
        type: 'normal',
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
    this.getBuildAll();
  }
  getBuildAll() {
    this.numOfFilters = 0;
    this.buildService.getBuildAll().subscribe(buildings => {
      this.buildings = buildings;
      console.log(buildings);
      this.setRows(this.buildings);
    });
  }
  setRows(buildings: IBuild[]) {
    const rows = [];

    buildings.forEach(build => {
      let dateToEnd = new Date();
      let isComplete = true;
      if (build.timeLine) {
        const lastIndex = build.timeLine.length - 1;
        if (build.timeLine.length > 0) {
          const isFinded = build.timeLine.find(t => t.isComplete === false);
          if (isFinded) {
            isComplete = false;
          }
          const lastPhase = build.timeLine[lastIndex];
          dateToEnd = new Date(
            lastPhase.yearToEnd,
            lastPhase.monthToEnd,
            lastPhase.dayToEnd,
          );
        }
      }
      rows.push({
        _id: build._id,
        name: build.name,
        maker: build.maker.length,
        city: build.city,
        notes: build.notes,
        timestamp: build.timestamp,
        dateToEnd: dateToEnd,
        isComplete: isComplete,
      });
    });
    this.rows = rows;
    this.isLoading = true;
  }
  newBuild() {
    this.router.navigate(['new-edit-build']);
  }
  edit(item) {
    const data: NavigationExtras = {
      queryParams: { id: item._id },
    };
    this.router.navigate(['new-edit-build'], data);
    // this.navCtr.navigateRoot('new-buyer', false, data);
  }
  deleted(prop: IBuild) {
    this.buildService
      .deltedBuildById(prop._id)
      .toPromise()
      .then(() => {
        this.getBuildAll();
      });
  }
  detailBuild(prop: IBuild) {
    const data: NavigationExtras = {
      queryParams: { id: prop._id },
    };
    this.router.navigate(['detail-build-admin'], data);
  }
  async presentAlertConfirm(prop: IBuild) {
    const alert = await this.alertController.create({
      header: 'Eliminar Obra',
      message: `¿Desea eliminar obra: <strong>${prop.name}</strong>?`,
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
        this.deleted(prop);
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
  getFilters(filters) {
    console.log(filters);
    const advFinded = this.buildings.filter(b => FilerBuild(b, filters));
    //  setea buyers
    this.setRows(advFinded);
    // num
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
    if (filters.isComplete !== undefined || filters.isComplete !== null) {
      numFilters++;
    }
    if (filters.day2) {
      numFilters++;
    }
    if (filters.month2) {
      numFilters++;
    }
    if (filters.year2) {
      numFilters++;
    }
    this.numOfFilters = numFilters;
  }
}
