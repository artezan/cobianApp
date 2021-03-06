import { Component, OnInit } from '@angular/core';
import { FilerBuild } from '../../../_config/_helpers';
import { TableColumsModel } from '../../../models/tableColums.model';
import { IPreBuild } from '../../../models/preBuild';
import { Platform, AlertController, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { PreBuildService } from '../../../services/pre-build.service';
import { IFatherPre } from '../../../models/fatherPreBuild.model';

@Component({
  selector: 'app-list-pre-build',
  templateUrl: './list-pre-build.component.html',
  styleUrls: ['./list-pre-build.component.scss'],
})
export class ListPreBuildComponent implements OnInit {
  isLoading = false;
  columns: TableColumsModel[];
  rows: any[] = [];
  isDesktop = false;
  openMenu: boolean;
  // buildings
  buildings: IFatherPre[] = [];
  // numofFilters
  numOfFilters = 0;

  constructor(
    private platform: Platform,
    private router: Router,
    public alertController: AlertController,
    public toastController: ToastController,
    public route: ActivatedRoute,
    private preBuildService: PreBuildService,
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
        name: '#Preventa',
        prop: 'preBuyer',
        type: 'number',
      },
      {
        name: 'Ciudad',
        prop: 'city',
        type: 'normal',
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
    this.preBuildService.getAllFather().subscribe(buildings => {
      this.buildings = buildings;
      console.log(buildings);
      this.setRows(this.buildings);
    });
  }
  setRows(buildings: IFatherPre[]) {
    const rows = [];

    buildings.forEach(build => {
      rows.push({
        _id: build._id,
        name: build.name,
        city: build.city,
        preBuyer: build.numOfChild,
        notes: build.notes,
        timestamp: build.timestamp,
      });
    });
    this.rows = rows;
    this.isLoading = true;
  }
  newBuild() {
    this.router.navigate(['new-edit-father']);
  }
  edit(item) {
    const data: NavigationExtras = {
      queryParams: { id: item._id },
    };
    this.router.navigate(['new-edit-father'], data);
    // this.navCtr.navigateRoot('new-buyer', false, data);
  }
  deleted(prop: IPreBuild) {
    this.preBuildService
      .deltedBuildById(prop._id)
      .toPromise()
      .then(() => {
        this.getBuildAll();
      });
  }
  detailBuild(prop: IPreBuild) {
    const data: NavigationExtras = {
      queryParams: { id: prop._id },
    };
    this.router.navigate(['list-prechild-admin'], data);
  }
  async presentAlertConfirm(prop: IPreBuild) {
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
