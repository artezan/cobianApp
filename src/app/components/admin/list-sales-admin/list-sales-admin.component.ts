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
import { StatusBuyerPropertyService } from '../../../services/status-buyer-property.service';
import { IStatusBuyerPropertyGet } from '../../../models/statusBuyerProperty.model';
import { PropertyFilter } from '../../../_config/_helpers';
import { SaleService } from '../../../services/sale.service';
import { ISale } from '../../../models/sale.model';
import { IAdviser } from '../../../models/adviser.model';

@Component({
  selector: 'app-list-sales-admin',
  templateUrl: './list-sales-admin.component.html',
  styleUrls: ['./list-sales-admin.component.scss'],
})
export class ListSalesAdminComponent implements OnInit {
  isLoading = false;
  columns: TableColumsModel[];
  rows: any[] = [];
  isDesktop = false;
  openMenu: boolean;
  // numofFilters
  numOfFilters = 0;
  sales: ISale[] = [];
  advTop: IAdviser;
  totalSales: number;
  totalSalesOfRent: number;
  totalSalesOfBuy: number;
  totalCost: number;

  constructor(
    private propertyService: PropertyService,
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
        name: 'Asesor',
        prop: 'adviser',
        type: 'normal',
      },
      {
        name: 'Notas',
        prop: 'note',
        type: 'normal',
      },
      {
        name: 'Renta',
        prop: 'isRent',
        type: 'boolean',
      },
      {
        name: 'Costo',
        prop: 'price',
        type: 'money',
      },
      {
        name: 'Fecha Adquisición',
        prop: 'timestamp',
        type: 'date',
      },

      /*  {
        name: 'Acciones',
        prop: 'acction',
        type: 'buttons',
        buttonDetails: true,
      }, */
    ];
    this.getSales();
  }
  getSales() {
    this.isLoading = false;
    this.salesService.getSale().subscribe(sales => {
      console.log(sales);
      this.sales = sales;
      this.setRows(sales);
      this.getSumary(sales);
    });
  }
  setRows(sales: ISale[]) {
    const rows = [];
    sales.forEach(sale => {
      rows.push({
        _id: sale._id,
        buyer: sale.buyer.name,
        property: sale.property.name,
        adviser: sale.adviser.name,
        isRent: sale.isRent,
        price: sale.price,
        note: sale.note,
        timestamp: sale.timestamp,
      });
    });
    this.rows = rows;
    this.isLoading = true;
  }
  /*  detailProp(item) {
    const data: NavigationExtras = {
      queryParams: { id: item._id, credit: item.credit, ofert: item.ofert },
    };
    this.router.navigate(['detail-salesprop-admin'], data);
  } */
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
  getSumary(sales: ISale[]) {
    const add = (a, b) => a + b;
    this.totalSales = sales.length;
    this.totalSalesOfRent = sales.filter(s => s.isRent).length;
    this.totalSalesOfBuy = sales.filter(s => !s.isRent).length;
    this.totalCost = sales.map(s => s.price).reduce(add);
    // adv number
    let numMax = 0;
    sales.map(s => s.adviser).forEach(adv => {
      const num = sales.filter(s => s.adviser._id === adv._id).length;
      if (num > numMax) {
        numMax = num;
        this.advTop = adv;
      }
    });
  }
  /*   getFilters(filters: IProperty) {
    console.log(filters);
    const advFinded = this.properties.filter(prop => {
      const temp = PropertyFilter(filters, prop);
      this.numOfFilters = temp.numOfFilters;
      return temp.isHope;
    });
    //  setea buyers
    this.setRows(advFinded);
  } */
}
