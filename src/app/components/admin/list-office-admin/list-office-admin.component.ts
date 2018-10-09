import { Component, OnInit } from '@angular/core';
import {
  TableColumsModel,
  TableStatusChips,
} from '../../../models/tableColums.model';
import { IOffice } from '../../../models/office.model';
import { OfficeService } from '../../../services/office.service';
import {
  Platform,
  AlertController,
  ToastController,
  NavController,
} from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-list-office-admin',
  templateUrl: './list-office-admin.component.html',
  styleUrls: ['./list-office-admin.component.scss'],
})
export class ListOfficeAdminComponent implements OnInit {
  isLoading = false;
  columns: TableColumsModel[];
  rows: any[] = [];
  isDesktop = false;
  openMenu: boolean;
  // office
  office: IOffice[] = [];
  // numofFilters
  numOfFilters = 0;

  constructor(
    private officeService: OfficeService,
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
        name: 'Teléfono',
        prop: 'phone',
        type: 'phone',
      },
      {
        name: 'Correo',
        prop: 'email',
        type: 'normal',
      },
      {
        name: 'Fecha Alta',
        prop: 'timestamp',
        type: 'date',
      },

      {
        name: 'Acciones',
        prop: 'acction',
        type: 'buttons',
        buttonEdit: true,
        buttonDeleted: true,
      },
    ];
    this.getOfficeAll();
  }
  getOfficeAll() {
    this.isLoading = false;
    this.numOfFilters = 0;
    this.officeService.getOffice().subscribe(officies => {
      this.office = officies;
      this.setRows(this.office);
    });
  }
  newOffice() {
    this.router.navigate(['new-edit-office']);
  }
  setRows(offices: IOffice[]) {
    const rows = [];
    offices.forEach(office => {
      rows.push({
        _id: office._id,
        name: office.name,
        email: office.email,
        phone: office.phone,
        timestamp: office.timestamp,
      });
    });
    this.rows = rows;
    this.isLoading = true;
  }
  edit(item) {
    const data: NavigationExtras = {
      queryParams: { id: item._id },
    };
    this.router.navigate(['new-edit-office'], data);
    // this.navCtr.navigateRoot('new-buyer', false, data);
  }
  deleted(c: IOffice) {
    this.officeService
      .deleteOfficeById(c._id)
      .toPromise()
      .then(() => {
        this.getOfficeAll();
      });
  }
  async presentAlertConfirm(c) {
    const alert = await this.alertController.create({
      header: 'Eliminar Oficinista',
      message: `¿Desea eliminar oficinista?`,
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
