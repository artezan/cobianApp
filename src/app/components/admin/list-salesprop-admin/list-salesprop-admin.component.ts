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
import { StatusBuyerPropertyService } from '../../../services/status-buyer-property.service';
import {
  IStatusBuyerProperty,
  IStatusBuyerPropertyGet,
} from '../../../models/statusBuyerProperty.model';

@Component({
  selector: 'app-list-salesprop-admin',
  templateUrl: './list-salesprop-admin.component.html',
  styleUrls: ['./list-salesprop-admin.component.scss'],
})
export class ListSalespropAdminComponent implements OnInit {
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
    private statusBPService: StatusBuyerPropertyService,
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
        name: 'Consumidor',
        prop: 'buyer',
        type: 'normal',
      },
      {
        name: 'Propiedad',
        prop: 'property',
        type: 'normal',
      },
      {
        name: 'Ofertas',
        prop: 'ofert',
        type: 'boolean',
      },
      {
        name: 'Creditos',
        prop: 'credit',
        type: 'boolean',
      },
      {
        name: 'Fecha Actualización',
        prop: 'timestamp',
        type: 'date',
      },

      {
        name: 'Acciones',
        prop: 'acction',
        type: 'buttons',
        buttonDetails: true,
      },
    ];
    // this.getPropAll();
    this.getSBP();
  }
  /*   getPropAll() {
    this.numOfFilters = 0;
    this.propertyService.getAll().subscribe(prop => {
      this.properties = prop;
      console.log(prop);
      this.setRows(prop);
    });
  } */
  getSBP() {
    this.isLoading = false;
    this.statusBPService.getStatusBuyerProperty().subscribe(sBPs => {
      this.setRows(<any>sBPs);
    });
  }
  setRows(sBPs: IStatusBuyerPropertyGet[]) {
    const rows = [];
    // CAMBIAR !!! --------------------------
    sBPs.filter(s => s.status === 'rojo').forEach(sBP => {
      // rojo por credito
      const isCredidRed = sBP.buyer.credit.find(
        credit =>
          credit.status === 'rojo' &&
          credit.property === sBP.property._id &&
          credit.isAccept,
      );
      // rojo por oferta
      const isOfertRed = sBP.buyer.ofert.find(
        ofert =>
          ofert.status === 'rojo' &&
          ofert.property === sBP.property._id &&
          ofert.isAccept,
      );
      if (isOfertRed || isCredidRed) {
        rows.push({
          _id: sBP._id,
          buyer: sBP.buyer.name,
          property: sBP.property.name,
          credit: !!isCredidRed,
          ofert: !!isOfertRed,
          timestamp: sBP.timestamp,
        });
      }
    });
    this.rows = rows;
    this.isLoading = true;
  }
  detailProp(item) {
    const data: NavigationExtras = {
      queryParams: { id: item._id, credit: item.credit, ofert: item.ofert },
    };
    this.router.navigate(['detail-salesprop-admin'], data);
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
      /*  if (res.role === 'ok') {
        this.deleted(prop);
      } */
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
