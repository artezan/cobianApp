import { Component, OnInit } from '@angular/core';
import {
  TableColumsModel,
  TableStatusChips,
  TableTagStyle
} from '../../models/tableColums.model';
import {
  Platform,
  AlertController,
  ToastController,
  NavController,
  LoadingController
} from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { IAdviser } from '../../models/adviser.model';
import { SellerService } from '../../services/seller.service';
import { BuyerService } from '../../services/buyer.service';
import { AdviserService } from '../../services/adviser.service';
import { INotification } from '../../models/notification.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogGeneralComponent } from '../general/dialog-general/dialog-general.component';
import { MailService } from '../../services/mail.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  isLoading = false;
  columns: TableColumsModel[];
  rows: any[] = [];
  isDesktop = false;
  openMenu: boolean;
  // numofFilters
  numOfFilters = 0;
  allUsers = [];
  selectedUsers = [];
  showLoader: boolean;

  constructor(
    private adviserService: AdviserService,
    private buyerService: BuyerService,
    private sellerService: SellerService,
    private platform: Platform,
    private router: Router,
    public alertController: AlertController,
    public toastController: ToastController,
    public navCtr: NavController,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    private mailService: MailService,
    public loadingController: LoadingController
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
        name: '',
        prop: 'checkBox',
        type: 'checkBox',
        disabledSort: true
      },
      {
        name: 'Nombre',
        prop: 'name',
        type: 'normal'
      },
      {
        name: 'Apellido',
        prop: 'lastName',
        type: 'normal'
      },
      {
        name: 'Email',
        prop: 'email',
        type: 'normal'
      },
      {
        name: 'Fecha Alta',
        prop: 'timestamp',
        type: 'date'
      },
      {
        name: 'Tipo Usuario',
        prop: 'type',
        type: 'tags'
      },
      {
        name: 'Estado',
        prop: 'properties',
        type: 'status'
      }
    ];
    this.getAllUsers();
  }
  async getAllUsers() {
    this.showLoader = true;
    this.numOfFilters = 0;
    const arrBuyer = await this.buyerService.getBuyerAll().toPromise();
    const arrAdv = await this.adviserService.getAdviserAll().toPromise();
    const arrSeller = await this.sellerService.getSellerAll().toPromise();
    arrBuyer.map(b => (b['typeOfUser'] = 'buyer'));
    arrAdv.map(b => (b['typeOfUser'] = 'adviser'));
    arrSeller.map(b => (b['typeOfUser'] = 'seller'));
    this.allUsers = [...arrBuyer, ...arrAdv, ...arrSeller];
    this.setRows(this.allUsers);
  }
  async setRows(allUsers: any[]) {
    const rows = [];

    allUsers.forEach((user, i) => {
      const properties: TableStatusChips[] = [];
      let type = {};

      if (user.typeOfUser === 'buyer') {
        user['lastName'] = user.fatherLastName;
        type = {
          name: 'Consumidor',
          style: 'buyer'
        };
        // propiedades
        if (user.statusBuyerProperty && user.statusBuyerProperty.length > 0) {
          user.statusBuyerProperty.forEach(sBP => {
            properties.push({
              name: sBP.property.name,
              status: sBP.status
            });
          });
        } else {
          properties.push({
            name: 'Sin interés',
            status: 'gris'
          });
        }
      } else if (user.typeOfUser === 'adviser') {
        type = {
          name: 'Asesor',
          style: 'adviser'
        };
      } else if (user.typeOfUser === 'seller') {
        type = {
          name: 'Dueño',
          style: 'seller'
        };
      }

      rows.push({
        _id: user._id,
        name: user.name,
        lastName: user.lastName,
        timestamp: user.timestamp,
        email: user.email,
        phone: user.phone ? user.phone : '',
        type: type,
        properties: properties,
        checkBox: false,
        nameChip: user.name
      });
    });
    this.rows = rows;
    this.isLoading = true;
    this.showLoader = false;
  }
  userSelect(event: { isChecked: boolean; row: any }) {
    const index = this.selectedUsers.findIndex(u => u._id === event.row._id);

    if (event.isChecked) {
      if (index === -1) {
        this.selectedUsers.push(event.row);
      }
    } else {
      if (index !== -1) {
        this.selectedUsers.splice(index, 1);
      }
    }
  }
  newBuyer() {
    const data: NavigationExtras = {
      queryParams: { id: 'new' }
    };
    this.router.navigate(['new-edit-adviser']);
  }
  edit(item) {
    const data: NavigationExtras = {
      queryParams: { id: item._id }
    };
    this.router.navigate(['new-edit-adviser'], data);
    // this.navCtr.navigateRoot('new-buyer', false, data);
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      message: 'Enviando...',
      translucent: true
    });
    return await loading;
  }
  getFilters(filters: {
    isBuyer: boolean;
    isAdviser: boolean;
    isSeller: boolean;
    status: string;
  }) {
    const advFinded = this.allUsers.filter(user => {
      if (filters.isBuyer) {
        if (user.typeOfUser === 'buyer') {
          return true;
        }
      }
      if (filters.isAdviser) {
        if (user.typeOfUser === 'adviser') {
          return true;
        }
      }
      if (filters.isSeller) {
        if (user.typeOfUser === 'seller') {
          return true;
        }
      }
      if (
        !filters.isBuyer &&
        !filters.isAdviser &&
        !filters.isSeller &&
        !filters.status
      ) {
        return true;
      }
      if (filters.status !== undefined) {
        if (user.statusBuyerProperty && user.statusBuyerProperty.length > 0) {
          const isfinded = user.statusBuyerProperty.some(
            p => p.status === filters.status
          );
          if (isfinded) {
            return true;
          }
        } else if (
          user.statusBuyerProperty &&
          user.statusBuyerProperty.length === 0
        ) {
          if (filters.status === 'gris') {
            return true;
          }
        }
      }
    });
    //  setea buyers
    this.setRows(advFinded);
    // num filters
    let numFilters = 0;
    if (filters.isBuyer) {
      numFilters++;
    }
    if (filters.isAdviser) {
      numFilters++;
    }
    if (filters.isSeller) {
      numFilters++;
    }
    if (filters.status) {
      numFilters++;
    }
    this.numOfFilters = numFilters;
  }
  resetAll() {
    this.getAllUsers();
  }
  async setEmail(n) {
    const dialogRef = this.dialog.open(DialogGeneralComponent, {
      data: {
        header: 'Documentos',
        subHeader: `Seleccione documentos a adjuntar`,
        isform: false,
        hasFileInput: true,
        okButton: 'Siguiente'
      }
    });
    const sub = dialogRef.componentInstance.buttons.subscribe(res => {
      if (res.button) {
        this.sendEmail(res.formData);
      }
    });
  }
  private sendEmail(formData: FormData) {
    const arr = Array.from(formData.getAll('file'));
    const dialogRef = this.dialog.open(DialogGeneralComponent, {
      data: {
        header: 'Mensaje',
        subHeader: `Escriba un mensaje a los destinatarios`,
        body: `<p>⚠️ Se enviarán ${arr.length} archivos a ${
          this.selectedUsers.length
        } usuarios</p>`,
        isform: true,
        formLabel: 'Mensaje',
        okButton: 'Enviar'
      }
    });
    const sub = dialogRef.componentInstance.buttons.subscribe(async res => {
      if (res.button) {
        formData.append('msg', res.inputValue);
        formData.append(
          'mails',
          this.selectedUsers.map(u => u.email).toString()
        );
        console.log(formData.getAll('mails'));
        console.log(formData.getAll('msg'));
        console.log(formData.getAll('file'));
        const load = await this.presentLoadingWithOptions();
        load.present();
        const isSend = await this.mailService.sendFiles(formData).toPromise();
        if (isSend) {
          load.dismiss();
          this.presentToast('Correo enviado');
        } else {
          load.dismiss();
          this.presentToast('Error, no se pudo enviar');
        }
      }
    });
  }
}
