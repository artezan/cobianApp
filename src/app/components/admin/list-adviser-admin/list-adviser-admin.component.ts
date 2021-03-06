import { Component, OnInit } from '@angular/core';
import {
  TableColumsModel,
  TableStatusChips,
} from '../../../models/tableColums.model';
import { IAdviser } from '../../../models/adviser.model';
import { AdviserService } from '../../../services/adviser.service';
import {
  Platform,
  MenuController,
  AlertController,
  ToastController,
  NavController,
} from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { OnlyDates, AdvFilter } from '../../../_config/_helpers';
import { SaleService } from '../../../services/sale.service';
import { ISale } from '../../../models/sale.model';

@Component({
  selector: 'app-list-adviser-admin',
  templateUrl: './list-adviser-admin.component.html',
  styleUrls: ['./list-adviser-admin.component.scss'],
})
export class ListAdviserAdminComponent implements OnInit {
  isLoading = false;
  columns: TableColumsModel[];
  rows: any[] = [];
  isDesktop = false;
  openMenu: boolean;
  // buyers
  adviser: IAdviser[] = [];
  realData: IAdviser[] = [];
  // numofFilters
  numOfFilters = 0;

  constructor(
    private adviserService: AdviserService,
    private platform: Platform,
    private router: Router,
    public alertController: AlertController,
    public toastController: ToastController,
    public navCtr: NavController,
    public route: ActivatedRoute,
    private salesService: SaleService,
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
        name: 'Fecha Alta',
        prop: 'timestamp',
        type: 'date',
      },
      {
        name: '# De Consumidores',
        prop: 'numOfBuyers',
        type: 'normal',
      },
      {
        name: 'Disponibilidad',
        prop: 'range',
        type: 'normal',
      },
      /* {
        name: '# Renta/Venta',
        prop: 'numOfSale',
        type: 'normal',
      }, */

      {
        name: 'Acciones',
        prop: 'acction',
        type: 'buttons',
        buttonEdit: true,
        buttonDeleted: true,
        buttonDetails: true,
      },
    ];
    this.getAdviserAll();
  }
  getAdviserAll() {
    this.numOfFilters = 0;
    this.adviserService.getAdviserAll().subscribe(adv => {
      this.realData = adv;
      this.adviser = adv;
      this.setRows(this.realData);
    });
  }
  async setRows(advisers: IAdviser[]) {
    const rows = [];

    advisers.forEach((adviser, i) => {
      let numOfBuyers = 0;
      const range = `De ${adviser.hourStart} a ${adviser.hourEnd}`;
      if (adviser.buyer) {
        numOfBuyers = adviser.buyer.length;
      }
      rows.push({
        _id: adviser._id,
        name: adviser.name,
        lastName: adviser.lastName,
        timestamp: adviser.timestamp,
        numOfBuyers: numOfBuyers,
        range: range,
        // numOfSale: arr[i],
      });
    });
    this.rows = rows;
    this.isLoading = true;
  }
  getNumOfSales(advisers: IAdviser[]) {
    const arrNum: number[] = [];
    advisers.forEach(async adviser => {
      const sale = await this.salesService
        .getSaleByIdAdv(adviser._id)
        .toPromise();
      arrNum.push(sale.length);
    });
    return arrNum;
  }
  newBuyer() {
    const data: NavigationExtras = {
      queryParams: { id: 'new' },
    };
    this.router.navigate(['new-edit-adviser']);
  }
  edit(item) {
    const data: NavigationExtras = {
      queryParams: { id: item._id },
    };
    this.router.navigate(['new-edit-adviser'], data);
    // this.navCtr.navigateRoot('new-buyer', false, data);
  }
  deleted(adviser: IAdviser) {
    this.adviserService
      .deletedAdviserById(adviser._id)
      .toPromise()
      .then(() => {
        this.getAdviserAll();
      });
  }
  detailAdv(buyer: IAdviser) {
    const data: NavigationExtras = {
      queryParams: { id: buyer._id },
    };
    this.router.navigate(['detail-adviser-admin'], data);
  }
  async presentAlertConfirm(adviser: IAdviser) {
    const alert = await this.alertController.create({
      header: 'Eliminar Usuario',
      message: `¿Desea eliminar usuario: <strong>${adviser.name}</strong>?`,
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
        this.deleted(adviser);
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
  getFilters(filters: {
    day: number;
    month: number;
    year: number;
    status: string;
    hourStart?: number;
    hourEnd?: number;
    city: string;
  }) {
    const advFinded = this.adviser.filter(adv => AdvFilter(adv, filters));
    console.log(advFinded);
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
    if (filters.status) {
      numFilters++;
    }
    this.numOfFilters = numFilters;
  }
}
