import { Component, OnInit } from '@angular/core';
import { SubManagerService } from '../../../services/sub-manager.service';
import { TableColumsModel } from '../../../models/tableColums.model';
import { IManager } from '../../../models/manager.model';
import { Platform, AlertController, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-list-submanager-admin',
  templateUrl: './list-submanager-admin.component.html',
  styleUrls: ['./list-submanager-admin.component.scss'],
})
export class ListSubmanagerAdminComponent implements OnInit {
  isLoading = false;
  columns: TableColumsModel[];
  rows: any[] = [];
  isDesktop = false;
  openMenu: boolean;
  // manager
  manager: IManager[] = [];
  // numofFilters
  numOfFilters = 0;

  constructor(
    private subManagerService: SubManagerService,
    private platform: Platform,
    private router: Router,
    public alertController: AlertController,
    public toastController: ToastController,
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
        name: 'Teléfono',
        prop: 'phone',
        type: 'phone',
      },
      {
        name: 'Correo',
        prop: 'email',
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
        name: 'Acciones',
        prop: 'acction',
        type: 'buttons',
        buttonEdit: true,
        buttonDeleted: true,
      },
    ];
    this.getOfficeAll();
  }
  getOfficeAll() {
    this.isLoading = false;
    this.numOfFilters = 0;
    this.subManagerService.getManagerAll().subscribe(m => {
      this.manager = m;
      this.setRows(this.manager);
    });
  }
  newOffice() {
    this.router.navigate(['new-edit-submanager']);
  }
  setRows(managers: IManager[]) {
    const rows = [];
    managers.forEach(m => {
      rows.push({
        _id: m._id,
        name: m.name,
        email: m.email,
        phone: m.phone,
        city: m.city.charAt(0).toUpperCase() + m.city.slice(1),
        timestamp: m.timestamp,
      });
    });
    this.rows = rows;
    this.isLoading = true;
  }
  edit(item) {
    const data: NavigationExtras = {
      queryParams: { id: item._id },
    };
    this.router.navigate(['new-edit-submanager'], data);
  }
  deleted(c: IManager) {
    this.subManagerService
      .deleteManagerById(c._id)
      .toPromise()
      .then(() => {
        this.getOfficeAll();
      });
  }
  async presentAlertConfirm(c) {
    const alert = await this.alertController.create({
      header: 'Eliminar Subgerente',
      message: `¿Desea eliminar subgerente?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {},
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
}
