import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
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
import { Observable } from 'rxjs/internal/Observable';
import { UserSessionService } from '../../../services/user-session.service';
import { IUserSession } from '../../../models/userSession.model';
import { AdviserService } from '../../../services/adviser.service';
import { Storage } from '@ionic/storage';
import { SaleService } from '../../../services/sale.service';
import { ISale } from '../../../models/sale.model';
import { SellerService } from '../../../services/seller.service';
import { ISeller } from '../../../models/seller.model';
import { PropertyService } from '../../../services/property.service';

@Component({
  selector: 'app-list-buyer-admin',
  templateUrl: './list-buyer-admin.component.html',
  styleUrls: ['./list-buyer-admin.component.scss'],
  encapsulation: ViewEncapsulation.None,
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
  user: IUserSession;
  sales: ISale[];
  // filtros
  propertiesName: any[];
  showLoaderTable: boolean;
  constructor(
    private buyerService: BuyerService,
    private sBPService: StatusBuyerPropertyService,
    private platform: Platform,
    public menuCtr: MenuController,
    private router: Router,
    public alertController: AlertController,
    public toastController: ToastController,
    public navCtr: NavController,
    private userSession: UserSessionService,
    private storage: Storage,
    private saleService: SaleService,
    private sellerService: SellerService,
    private propertyService: PropertyService,
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
        buttonDeleted:
          this.user.type === 'administrator' || this.user.type === 'office'
            ? true
            : false,
        buttonDetails: true,
      },
    ];
    this.getBuyerAll();
    this.getProperty();
  }
  async getProperty() {
    const p = await this.propertyService.getAllSpecial().toPromise();
    this.propertiesName = p.map(property => property.name);
  }
  getBuyerAll() {
    this.numOfFilters = 0;
    this.showLoaderTable = true;
    if (this.user.type === 'administrator' || this.user.type === 'office') {
      // si es admin
      this.buyerService.getBuyerAll().subscribe(buyers => {
        this.realData = buyers;
        this.buyers = buyers;
        this.setRows(this.realData);
      });
    } else if (this.user.type === 'adviser') {
      // si es adviser
      this.toastPresent(`Bienvenido ${this.user.name}`);
      this.buyerService.getBuyerAll().subscribe(buyers => {
        // filtra por id en buyer !!!
        const buyerFilter = buyers.filter(b => {
          return !!b.adviser.find(adv => adv._id === this.user.id);
        });
        this.realData = buyerFilter;
        this.buyers = buyerFilter;
        this.setRows(this.realData);
        this.getTotalSalesByAdv();
      });
    } else if (this.user.type === 'seller') {
      // si es seller
      this.toastPresent(`Bienvenido ${this.user.name}`);
      this.buyerService.getBuyerAll().subscribe(buyers => {
        this.sellerService.getSellerById(this.user.id).subscribe(seller => {
          console.log(buyers);
          console.log(seller);
          // todos lo que le dieron me guta a las propiedades del seller
          const buyerFilter = buyers.filter(b => {
            return !!b.statusBuyerProperty.find(sbp => {
              return !!seller.property.find(p => p._id === sbp.property._id);
            });
          });
          console.log(buyerFilter);
          this.setRows(buyerFilter);
          this.getTotalSalesBySeller(seller);
        });
      });
    }
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
    this.showLoaderTable = false;
  }
  newBuyer() {
    /* this.router.navigate(['new-buyer']);
    this.rows.length = 0; */
    this.router.navigate(['new-buyer']);
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
  getTotalSalesByAdv() {
    this.saleService.getSaleByIdAdv(this.user.id).subscribe(sales => {
      this.sales = sales;
    });
  }
  getTotalSalesBySeller(seller: ISeller) {
    this.saleService.getSale().subscribe(sales => {
      this.sales = sales.filter(s => {
        return !!seller.property.find(p => p._id === s.property._id);
      });
    });
  }
  sendToTotalSales() {
    if (this.sales.length > 0) {
      this.router.navigate(['list-sales-admin']);
    }
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
          handler: blah => {},
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
    property: string;
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
  async toastPresent(m = 'Eventos pendientes hoy') {
    const isPresent = await this.storage.get('alert-adv');
    if (+isPresent !== new Date().getDate()) {
      const toast = await this.toastController.create(<any>{
        message: m,
        position: 'bottom',
        showCloseButton: false,
        cssClass: 'toast-adv',
        duration: 4000,
      });
      toast.present();
      toast.onWillDismiss().then(() => {
        this.storage.set('alert-adv', new Date().getDate());
      });
    }
  }
}
