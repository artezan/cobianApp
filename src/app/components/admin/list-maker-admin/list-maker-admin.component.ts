import { Component, OnInit } from '@angular/core';
import { TableColumsModel } from '../../../models/tableColums.model';
import { IMaker } from '../../../models/maker.model';
import { MakerService } from '../../../services/maker.service';
import {
  Platform,
  AlertController,
  ToastController,
  NavController,
} from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-list-maker-admin',
  templateUrl: './list-maker-admin.component.html',
  styleUrls: ['./list-maker-admin.component.scss'],
})
export class ListMakerAdminComponent implements OnInit {
  isLoading = false;
  columns: TableColumsModel[];
  rows: any[] = [];
  isDesktop = false;
  openMenu: boolean;
  // makers
  makers: IMaker[] = [];
  // numofFilters
  numOfFilters = 0;

  constructor(
    private makerService: MakerService,
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
        name: 'Apellido',
        prop: 'lastName',
        type: 'normal',
      },
      {
        name: 'Obra',
        prop: 'build',
        type: 'normal',
      },
      {
        name: 'Fecha Alta',
        prop: 'timestamp',
        type: 'date',
      },
      {
        name: 'Ciudad',
        prop: 'city',
        type: 'normal',
      },
      {
        name: 'Correo',
        prop: 'email',
        type: 'normal',
      },
      {
        name: 'Teléfono',
        prop: 'phone',
        type: 'phone',
      },
      {
        name: 'Acciones',
        prop: 'acction',
        type: 'buttons',
        buttonEdit: true,
        buttonDeleted: true,
      },
    ];
    this.getMakerAll();
  }
  getMakerAll() {
    this.isLoading = false;
    this.numOfFilters = 0;
    this.makerService.getMakerAll().subscribe(makers => {
      this.makers = makers;
      console.log(makers);
      this.setRows(this.makers);
    });
  }
  setRows(makers: IMaker[]) {
    const rows = [];

    makers.forEach(maker => {
      let nameBuild;
      if (maker.build && maker.build.name) {
        nameBuild = maker.build.name;
      } else {
        nameBuild = 'Sin Obra Asignada';
      }
      rows.push({
        _id: maker._id,
        name: maker.name,
        lastName: maker.lastName,
        build: nameBuild,
        city: maker.city,
        email: maker.email,
        phone: maker.phone,
        timestamp: maker.timestamp,
      });
    });
    this.rows = rows;
    this.isLoading = true;
  }
  newBuild() {
    this.router.navigate(['new-edit-maker']);
  }
  edit(item) {
    const data: NavigationExtras = {
      queryParams: { id: item._id },
    };
    this.router.navigate(['new-edit-maker'], data);
    // this.navCtr.navigateRoot('new-buyer', false, data);
  }
  deleted(prop: IMaker) {
    this.makerService
      .deltedMakerById(prop._id)
      .toPromise()
      .then(() => {
        this.getMakerAll();
      });
  }
  detailBuild(prop: IMaker) {
    const data: NavigationExtras = {
      queryParams: { id: prop._id },
    };
    this.router.navigate(['detail-build-admin'], data);
  }
  async presentAlertConfirm(prop: IMaker) {
    const alert = await this.alertController.create({
      header: 'Eliminar Constructor',
      message: `¿Desea eliminar constructor: <strong>${prop.name}</strong>?`,
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
  /*  getFilters(filters) {
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
  } */
}
