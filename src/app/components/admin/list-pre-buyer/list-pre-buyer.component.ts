import { Component, OnInit } from '@angular/core';
import { TableColumsModel } from '../../../models/tableColums.model';
import {
  Platform,
  AlertController,
  ToastController,
  NavController
} from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { PreBuyerService } from '../../../services/pre-buyer.service';
import { IPreBuyer } from '../../../models/preBuyer';

@Component({
  selector: 'app-list-pre-buyer',
  templateUrl: './list-pre-buyer.component.html',
  styleUrls: ['./list-pre-buyer.component.scss']
})
export class ListPreBuyerComponent implements OnInit {
  isLoading = false;
  columns: TableColumsModel[];
  rows: any[] = [];
  isDesktop = false;
  openMenu: boolean;
  // buildings
  // numofFilters
  numOfFilters = 0;

  constructor(
    private platform: Platform,
    private router: Router,
    public alertController: AlertController,
    public toastController: ToastController,
    public navCtr: NavController,
    public route: ActivatedRoute,
    private preBuyerService: PreBuyerService
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
        type: 'normal'
      },
      {
        name: 'Apellido',
        prop: 'lastName',
        type: 'normal'
      },
      {
        name: 'Preventa',
        prop: 'preBuild',
        type: 'normal'
      },
      {
        name: 'Fecha Alta',
        prop: 'timestamp',
        type: 'date'
      },
      {
        name: 'Telefono',
        prop: 'phone',
        type: 'phone'
      },
      {
        name: 'Acciones',
        prop: 'acction',
        type: 'buttons',
        buttonEdit: true,
        buttonDeleted: true
      }
    ];
    this.getBuildAll();
  }
  getBuildAll() {
    this.numOfFilters = 0;
    this.preBuyerService.getAll().subscribe(preBuyers => {
      console.log(preBuyers);
      this.setRows(preBuyers);
    });
  }
  setRows(preBuyers: IPreBuyer[]) {
    this.rows = preBuyers.map(preBuyer => {
      return {
        _id: preBuyer._id,
        name: preBuyer.name,
        preBuild: preBuyer.preBuild.map(p => p.name).toString(),
        email: preBuyer.email,
        lastName: preBuyer.lastName,
        timestamp: preBuyer.timestamp,
        phone: preBuyer.phone
      };
    });
    this.isLoading = true;
  }
  newBuild() {
    this.router.navigate(['new-edit-prebuyer']);
  }
  edit(item) {
    const data: NavigationExtras = {
      queryParams: { id: item._id }
    };
    this.router.navigate(['new-edit-prebuyer'], data);
    // this.navCtr.navigateRoot('new-buyer', false, data);
  }
  deleted(prop: IPreBuyer) {
    this.preBuyerService
      .deltedBuyerById(prop._id)
      .toPromise()
      .then(() => {
        this.getBuildAll();
      });
  }
  async presentAlertConfirm(prop: IPreBuyer) {
    const alert = await this.alertController.create({
      header: 'Eliminar Usuario',
      message: `¿Desea eliminar Usuario: <strong>${prop.name}</strong>?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {
            console.log('Confirm Cancel: blah');
          }
        },
        {
          text: 'Sí',
          role: 'ok',
          handler: () => {
            /* this.deleted(buyer);
            this.getBuyerAll(); */
          }
        }
      ]
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
      duration: 2000
    });
    toast.present();
  }
}
