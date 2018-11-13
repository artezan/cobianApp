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
import { SaleService } from '../../../services/sale.service';
import { ISale } from '../../../models/sale.model';
import { IAdviser } from '../../../models/adviser.model';
import { IUserSession } from '../../../models/userSession.model';
import { UserSessionService } from '../../../services/user-session.service';
import { SellerService } from '../../../services/seller.service';
import { AdviserService } from '../../../services/adviser.service';

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
  user: IUserSession;
  constructor(
    private propertyService: PropertyService,
    private platform: Platform,
    private router: Router,
    public alertController: AlertController,
    public toastController: ToastController,
    public navCtr: NavController,
    public route: ActivatedRoute,
    private salesService: SaleService,
    private userSession: UserSessionService,
    private sellerService: SellerService,
    private advService: AdviserService,
  ) {
    this.user = userSession.userSession.value;
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
        name: 'Asesores',
        prop: 'advsNames',
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
    if (this.user.type === 'adviser') {
      this.salesService.getSaleByIdAdv(this.user.id).subscribe(sales => {
        this.sales = sales;
        this.setRows(sales);
        this.getSumary(sales);
      });
    } else if (this.user.type === 'seller') {
      this.salesService.getSale().subscribe(sales => {
        this.sellerService.getSellerById(this.user.id).subscribe(seller => {
          this.sales = sales.filter(s => {
            return !!seller.property.find(p => p._id === s.property._id);
          });
          this.setRows(this.sales);
          this.getSumary(this.sales);
        });
      });
    } else {
      this.salesService.getSale().subscribe(sales => {
        this.sales = sales;
        this.setRows(sales);
        this.getSumary(sales);
      });
    }
  }
  setRows(sales: ISale[]) {
    const rows = [];
    sales.forEach(sale => {
      const advsNames = sale.adviser.map(a => a.name).toString();
      rows.push({
        _id: sale._id,
        buyer: sale.buyer.name,
        property: sale.property.name,
        adviser: sale.adviser,
        advsNames: advsNames,
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
  async getSumary(sales: ISale[]) {
    const add = (a, b) => a + b;
    this.totalSales = sales.length;
    this.totalSalesOfRent = sales.filter(s => s.isRent).length;
    this.totalSalesOfBuy = sales.filter(s => !s.isRent).length;
    this.totalCost = sales.map(s => s.price).reduce(add);
    // adv number
    let numMax = 0;
    let arr = [];
    sales
      .map(s => s.adviser)
      .map(adv => adv.map(a => a._id))
      .forEach(advIds => {
        arr = [...arr, ...advIds];
      });
    let idMayor;
    arr.forEach(id => {
      const num = arr.filter(str => str === id).length;
      if (num > numMax) {
        numMax = num;
        idMayor = id;
      }
    });
    this.advTop = await this.getAdvName(idMayor);
  }
  getAdvName(id: string) {
    return this.advService.getAdviserById(id).toPromise();
  }
}
