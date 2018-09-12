import { Component, OnInit } from '@angular/core';
import {
  TableColumsModel,
  TableStatusChips,
} from '../../../models/tableColums.model';
import { IOfert } from '../../../models/ofert.model';
import { OfertService } from '../../../services/ofert.service';
import {
  Platform,
  AlertController,
  ToastController,
  NavController,
} from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ICreditGet, ICredit } from '../../../models/credit.model';

@Component({
  selector: 'app-list-oferts-admin',
  templateUrl: './list-oferts-admin.component.html',
  styleUrls: ['./list-oferts-admin.component.scss'],
})
export class ListOfertsAdminComponent implements OnInit {
  isLoading = false;
  columns: TableColumsModel[];
  rows: any[] = [];
  isDesktop = false;
  openMenu: boolean;
  // ofert
  oferts: IOfert[] = [];
  // numofFilters
  numOfFilters = 0;

  constructor(
    private ofertService: OfertService,
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
        prop: 'buyer',
        type: 'normal',
      },
      {
        name: 'Nombre Prop',
        prop: 'property',
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
    this.getOfertAll();
  }
  getOfertAll() {
    this.numOfFilters = 0;
    this.ofertService.getOfert().subscribe(oferts => {
      this.oferts = oferts;
      console.log(oferts);
      this.setRows(this.oferts);
    });
  }
  newOfert() {
    this.navCtr.navigateRoot('new-edit-ofert');
  }
  setRows(oferts: IOfert[]) {
    const rows = [];

    oferts.forEach(ofert => {
      const properties: TableStatusChips[] = [];
      if (ofert.status) {
        if (ofert.status === 'amarillo') {
          properties.push({
            name: 'Negociación',
            status: ofert.status,
          });
        } else if (ofert.status === 'rojo') {
          properties.push({
            name: 'Respuesta',
            status: ofert.status,
          });
        }
      }
      rows.push({
        _id: ofert._id,
        buyer: ofert.buyer.name,
        property: ofert.property.name,
        notes: ofert.notes,
        timestamp: ofert.timestamp,
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
    this.router.navigate(['new-edit-ofert'], data);
    // this.navCtr.navigateRoot('new-buyer', false, data);
  }
  deleted(c: IOfert) {
    this.ofertService
      .deleteOfertById(c._id)
      .toPromise()
      .then(() => {
        this.getOfertAll();
      });
  }
  async presentAlertConfirm(c) {
    const alert = await this.alertController.create({
      header: 'Eliminar Oferta',
      message: `¿Desea eliminar oferta ?`,
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
