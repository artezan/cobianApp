import { Component, OnInit } from '@angular/core';
import {
  TableColumsModel,
  TableStatusChips
} from '../../../models/tableColums.model';
import { IBuyer } from '../../../models/buyer.model';
import { BuyerService } from '../../../services/buyer.service';
import { StatusBuyerPropertyService } from '../../../services/status-buyer-property.service';
import { Platform, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-list-buyer-admin',
  templateUrl: './list-buyer-admin.component.html',
  styleUrls: ['./list-buyer-admin.component.scss']
})
export class ListBuyerAdminComponent implements OnInit {
  isLoading = false;
  columns: TableColumsModel[];
  rows: IBuyer[];
  isDesktop = false;
  filterDay: number;
  filterMonth: number;
  filterYear: number;
  filterState: string;
  openMenu: boolean;

  constructor(
    private buyerService: BuyerService,
    private sBPService: StatusBuyerPropertyService,
    private platform: Platform,
    public menuCtr: MenuController
  ) {
    this.isDesktop = platform.is('desktop');
    if (this.isDesktop) {
      this.openMenu = true;
    } else {
      this.openMenu = false;
    }
    console.log(this.isDesktop);
    this.getBuyerAll();
  }

  ngOnInit() {
    this.columns = [
      {
        name: 'Nombre',
        prop: 'name',
        type: 'normal'
      },
      {
        name: 'Apellido',
        prop: 'fatherLastName',
        type: 'normal'
      },
      {
        name: 'Fecha Alta',
        prop: 'timestamp',
        type: 'date'
      },
      {
        name: 'Teléfono',
        prop: 'phone',
        type: 'phone'
      },
      {
        name: 'Estado',
        prop: 'properties',
        type: 'status'
      },

      {
        name: 'Acciones',
        prop: 'acction',
        type: 'buttons',
        buttonEdit: true,
        buttonDeleted: true,
        buttonDetails: true
      }
    ];
  }
  getBuyerAll() {
    this.buyerService.getBuyerAll().subscribe(buyers => {
      this.setRows(buyers);
    });
  }
  setRows(buyers: IBuyer[]) {
    const rows = [];

    buyers.forEach(buyer => {
      const properties: TableStatusChips[] = [];
      if (buyer.statusBuyerProperty && buyer.statusBuyerProperty.length > 0) {
        buyer.statusBuyerProperty.forEach(sBP => {
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
      rows.push({
        _id: buyer._id,
        name: buyer.name,
        fatherLastName: buyer.fatherLastName,
        timestamp: buyer.timestamp,
        phone: buyer.phone,
        properties: properties
      });
    });
    this.rows = rows;
    this.isLoading = true;
  }
  edit(item) {
    // this.router.navigate(['new-consultants-adm', item._id]);
  }
  deleted(item) {
    /*    const header = 'Borrar Consultor';
    const subHeader = 'Se eliminarán todos los datos';
    const body =
      '<p>Consultor: <b> ' + item.name + ' ' + item.lastName + '</b></p> ';
    this.openDialog(header, subHeader, body, item); */
  }
  getFilters(filter) {
    console.log(filter);
    this.filterDay = filter.day;
    this.filterYear = filter.year;
    this.filterMonth = filter.month;
    this.filterState = filter.status;
    if (!this.isDesktop) {
      this.openMenu = false;
    }
  }
}
