import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {
  TableColumsModel,
  TableStatusChips,
} from '../../../models/tableColums.model';
import { IBuyer } from '../../../models/buyer.model';
import { BuyerService } from '../../../services/buyer.service';
import { StatusBuyerPropertyService } from '../../../services/status-buyer-property.service';
import {
  Platform,
  MenuController,
  AlertController,
  ToastController,
  NavController,
} from '@ionic/angular';
import { BuyersFilters } from '../../../_config/_helpers';
import { MatDrawer } from '@angular/material';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-buyer-admin',
  templateUrl: './list-buyer-admin.component.html',
  styleUrls: ['./list-buyer-admin.component.scss'],
})
export class ListBuyerAdminComponent implements OnInit {
  drawer: MatDrawer;
  isLoading = false;
  columns: TableColumsModel[];
  rows: any[] = [];
  rows$: Observable<IBuyer[]>;
  isDesktop = false;
  openMenu: boolean;
  // buyers
  buyers: IBuyer[] = [];
  realData: IBuyer[] = [];
  // numofFilters
  numOfFilters = 0;

  constructor(
    private buyerService: BuyerService,
    private sBPService: StatusBuyerPropertyService,
    private platform: Platform,
    public menuCtr: MenuController,
    private router: Router,
    public alertController: AlertController,
    public toastController: ToastController,
    public navCtr: NavController,
  ) {
    this.isDesktop = platform.is('desktop');
    if (this.isDesktop) {
      this.openMenu = true;
    } else {
      this.openMenu = false;
    }
  }

  ngOnInit() {
    this.columns = [
      {
        name: 'Nombre',
        prop: 'name',
        type: 'normal',
      },
      {
        name: 'Apellido',
        prop: 'fatherLastName',
        type: 'normal',
      },
      {
        name: 'Fecha Alta',
        prop: 'timestamp',
        type: 'date',
      },
      {
        name: 'Teléfono',
        prop: 'phone',
        type: 'phone',
      },
      {
        name: 'Estado',
        prop: 'properties',
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
    this.getBuyerAll();
  }
  getBuyerAll() {
    this.numOfFilters = 0;
    this.buyerService.getBuyerAll().subscribe(buyers => {
      this.realData = buyers;
      this.buyers = buyers;
      this.setRows(this.realData);
    });
  }
  setRows(buyers: IBuyer[]) {
    /* this.rows = [];
    this.rows.length = 0; */
    const rows = [];

    buyers.forEach(buyer => {
      const properties: TableStatusChips[] = [];
      if (buyer.statusBuyerProperty && buyer.statusBuyerProperty.length > 0) {
        buyer.statusBuyerProperty.forEach(sBP => {
          properties.push({
            name: sBP.property.name,
            status: sBP.status,
          });
        });
      } else {
        properties.push({
          name: 'Sin interés',
          status: 'gris',
        });
      }
      rows.push({
        _id: buyer._id,
        name: buyer.name,
        fatherLastName: buyer.fatherLastName,
        timestamp: buyer.timestamp,
        phone: buyer.phone,
        properties: properties,
      });
    });
    this.rows = rows;
    this.isLoading = true;
  }
  newBuyer() {
    /* this.router.navigate(['new-buyer']);
    this.rows.length = 0; */
    this.navCtr.navigateRoot('new-buyer');
  }
  edit(item) {
    const data: NavigationExtras = {
      queryParams: { id: item._id },
    };
    this.router.navigate(['new-buyer'], data);
    // this.navCtr.navigateRoot('new-buyer', false, data);
  }
  deleted(buyer: IBuyer) {
    this.buyerService
      .deletedBuyer(buyer)
      .toPromise()
      .then(() => {
        this.getBuyerAll();
      });
  }
  detailBuyer(buyer: IBuyer) {
    const data: NavigationExtras = {
      queryParams: { id: buyer._id },
    };
    this.router.navigate(['detail-buyer-admin'], data);
  }
  async presentAlertConfirm(buyer: IBuyer) {
    const alert = await this.alertController.create({
      header: 'Eliminar Usuario',
      message: `¿Desea eliminar usuario: <strong>${buyer.name}</strong>?`,
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
        this.deleted(buyer);
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
  }) {
    const buyersFinded = this.buyers.filter(buyer =>
      BuyersFilters(buyer, filters),
    );
    //  setea buyers
    this.setRows(buyersFinded);
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
