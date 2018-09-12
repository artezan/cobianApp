import { Component, OnInit } from '@angular/core';
import {
  TableColumsModel,
  TableStatusChips,
} from '../../../models/tableColums.model';
import { ICredit, ICreditGet } from '../../../models/credit.model';
import { CreditService } from '../../../services/credit.service';
import {
  Platform,
  AlertController,
  ToastController,
  NavController,
} from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ISeller } from '../../../models/seller.model';
import { SellerFilter } from '../../../_config/_helpers';

@Component({
  selector: 'app-list-credit-admin',
  templateUrl: './list-credit-admin.component.html',
  styleUrls: ['./list-credit-admin.component.scss'],
})
export class ListCreditAdminComponent implements OnInit {
  isLoading = false;
  columns: TableColumsModel[];
  rows: any[] = [];
  isDesktop = false;
  openMenu: boolean;
  // credit
  credits: ICreditGet[] = [];
  // numofFilters
  numOfFilters = 0;

  constructor(
    private creditService: CreditService,
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
        name: 'Nombre Consumidor',
        prop: 'buyerName',
        type: 'normal',
      },
      {
        name: 'Nombre Prop',
        prop: 'propertyName',
        type: 'normal',
      },
      {
        name: 'Notas',
        prop: 'notes',
        type: 'normal',
      },
      {
        name: 'Modificado',
        prop: 'timestamp',
        type: 'date',
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
      },
    ];
    this.getCreditAll();
  }
  getCreditAll() {
    this.numOfFilters = 0;
    this.creditService.getCredit().subscribe(credits => {
      this.credits = <any>credits;
      console.log(credits);
      this.setRows(this.credits);
    });
  }
  setRows(credits: ICreditGet[]) {
    const rows = [];

    credits.forEach(credit => {
      const properties: TableStatusChips[] = [];
      if (credit.status) {
        if (credit.status === 'verde') {
          properties.push({
            name: 'Interés',
            status: credit.status,
          });
        } else if (credit.status === 'amarillo') {
          properties.push({
            name: 'Negociación',
            status: credit.status,
          });
        } else if (credit.status === 'rojo') {
          properties.push({
            name: 'Respuesta',
            status: credit.status,
          });
        } else if (credit.status === 'azul') {
          properties.push({
            name: 'Post Venta',
            status: credit.status,
          });
        }
      }
      rows.push({
        _id: credit._id,
        buyerName: credit.buyer.name,
        propertyName: credit.property.name,
        notes: credit.notes,
        timestamp: credit.timestamp,
        properties: properties,
      });
    });
    this.rows = rows;
    this.isLoading = true;
  }
  edit(item) {
    console.log(item);
    const data: NavigationExtras = {
      queryParams: { id: item._id },
    };
    this.router.navigate(['new-edit-credit'], data);
    // this.navCtr.navigateRoot('new-buyer', false, data);
  }
  deleted(c: ICredit) {
    this.creditService
      .deleteCredit(c._id)
      .toPromise()
      .then(() => {
        this.getCreditAll();
      });
  }
  async presentAlertConfirm(c) {
    const alert = await this.alertController.create({
      header: 'Eliminar Credito',
      message: `¿Desea eliminar credito ?`,
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
