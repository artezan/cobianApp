import { Component, OnInit } from '@angular/core';
import { TableColumsModel } from '../../../models/tableColums.model';
import { IProperty } from '../../../models/property.model';
import { PropertyService } from '../../../services/property.service';
import {
  Platform,
  AlertController,
  ToastController,
  NavController,
} from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { PropertyFilter } from '../../../_config/_helpers';

@Component({
  selector: 'app-list-prop-admin',
  templateUrl: './list-prop-admin.component.html',
  styleUrls: ['./list-prop-admin.component.scss'],
})
export class ListPropAdminComponent implements OnInit {
  isLoading = false;
  columns: TableColumsModel[];
  rows: any[] = [];
  isDesktop = false;
  openMenu: boolean;
  // prop
  properties: IProperty[] = [];
  // numofFilters
  numOfFilters = 0;

  constructor(
    private propertyService: PropertyService,
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
        name: 'Precio Max',
        prop: 'maxPrice',
        type: 'money',
      },
      {
        name: 'Precio Min',
        prop: 'minPrice',
        type: 'money',
      },
      {
        name: 'Fecha Alta',
        prop: 'timestamp',
        type: 'date',
      },
      {
        name: 'Nuevo',
        prop: 'isOld',
        type: 'boolean',
      },
      {
        name: 'Tipo',
        prop: 'typePop',
        type: 'normal',
      },
      {
        name: 'Adquirida',
        prop: 'isBuy',
        type: 'boolean',
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
    this.getPropAll();
  }
  getPropAll() {
    this.numOfFilters = 0;
    this.propertyService.getAllSpecial().subscribe(prop => {
      this.properties = prop;
      console.log(prop);
      this.setRows(prop);
    });
  }
  setRows(properties: IProperty[]) {
    const rows = [];

    properties.forEach(property => {
      let typePop = 'Vende';
      let iconName;
      if (property.isRent) {
        typePop = 'Renta';
      }
      if (property.typeOfProperty === 'departamento') {
        iconName = 'business';
      }
      if (property.typeOfProperty === 'casa') {
        iconName = 'home';
      }
      rows.push({
        _id: property._id,
        name: property.name,
        maxPrice: property.maxPrice,
        minPrice: property.minPrice,
        isOld: !property.isOld,
        timestamp: property.timestamp,
        typePop: typePop,
        isBuy: property.isBuy,
        iconName: iconName,
      });
    });
    this.rows = rows;
    this.isLoading = true;
  }
  newBuyer() {
    const data: NavigationExtras = {
      queryParams: { id: 'new' },
    };
    this.navCtr.navigateRoot('new-edit-prop');
  }
  edit(item) {
    const data: NavigationExtras = {
      queryParams: { id: item._id },
    };
    this.router.navigate(['new-edit-prop'], data);
    // this.navCtr.navigateRoot('new-buyer', false, data);
  }
  deleted(prop: IProperty) {
    this.propertyService
      .deletedById(prop._id)
      .toPromise()
      .then(() => {
        this.getPropAll();
      });
  }
  detailProp(prop: IProperty) {
    const data: NavigationExtras = {
      queryParams: { id: prop._id },
    };
    this.router.navigate(['detail-prop-admin'], data);
  }
  async presentAlertConfirm(prop: IProperty) {
    const alert = await this.alertController.create({
      header: 'Eliminar Usuario',
      message: `¿Desea eliminar propiedad: <strong>${prop.name}</strong>?`,
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
  getFilters(filters: IProperty) {
    console.log(filters);
    const advFinded = this.properties.filter(prop => {
      const temp = PropertyFilter(filters, prop);
      this.numOfFilters = temp.numOfFilters;
      return temp.isHope;
    });
    //  setea buyers
    this.setRows(advFinded);
  }
}
