import { Component, OnInit } from '@angular/core';
import { ISeller } from '../../../models/seller.model';
import { TableColumsModel } from '../../../models/tableColums.model';
import { SellerService } from '../../../services/seller.service';
import {
  Platform,
  AlertController,
  ToastController,
  NavController,
} from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { OnlyDates, SellerFilter } from '../../../_config/_helpers';

@Component({
  selector: 'app-list-seller-admin',
  templateUrl: './list-seller-admin.component.html',
  styleUrls: ['./list-seller-admin.component.scss'],
})
export class ListSellerAdminComponent implements OnInit {
  isLoading = false;
  columns: TableColumsModel[];
  rows: any[] = [];
  isDesktop = false;
  openMenu: boolean;
  // sellers
  seller: ISeller[] = [];
  // numofFilters
  numOfFilters = 0;

  constructor(
    private sellerService: SellerService,
    private platform: Platform,
    private router: Router,
    public alertController: AlertController,
    public toastController: ToastController,
    public navCtr: NavController,
    public route: ActivatedRoute,
  ) {
    console.log('init');
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
        name: 'Tipo',
        prop: 'typeSeller',
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
    this.getSellerAll();
  }
  getSellerAll() {
    this.isLoading = false;
    this.numOfFilters = 0;
    this.sellerService.getSellerAll().subscribe(seller => {
      this.seller = seller;
      console.log(seller);
      this.setRows(seller);
    });
  }
  setRows(sellers: ISeller[]) {
    const rows = [];

    sellers.forEach(seller => {
      let typeSeller = 'Vende';
      if (seller.isRenter) {
        typeSeller = 'Renta';
      }
      rows.push({
        _id: seller._id,
        name: seller.name,
        lastName: seller.lastName,
        timestamp: seller.timestamp,
        typeSeller: typeSeller,
      });
    });
    this.rows = rows;
    this.isLoading = true;
  }
  newBuyer() {
    const data: NavigationExtras = {
      queryParams: { id: 'new' },
    };
    // this.navCtr.navigateRoot('new-edit-seller');
    this.router.navigate(['new-edit-seller']);
  }
  edit(item) {
    const data: NavigationExtras = {
      queryParams: { id: item._id },
    };
    this.router.navigate(['new-edit-seller'], data);
    // this.router
    //   .navigateByUrl('/list-seller-admin', { skipLocationChange: true })
    //   .then(() => this.router.navigate(['new-edit-seller'], data));
    // this.isLoading = false;

    // this.navCtr.navigateRoot('new-edit-seller', false, data);
  }
  deleted(seller: ISeller) {
    this.sellerService
      .deletedSellerById(seller._id)
      .toPromise()
      .then(() => {
        this.getSellerAll();
      });
  }
  detailSeller(buyer: ISeller) {
    const data: NavigationExtras = {
      queryParams: { id: buyer._id },
    };
    this.router.navigate(['detail-seller-admin'], data);
  }
  async presentAlertConfirm(seller: ISeller) {
    const alert = await this.alertController.create({
      header: 'Eliminar Usuario',
      message: `¿Desea eliminar usuario: <strong>${seller.name}</strong>?`,
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
        this.deleted(seller);
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
  }
}
