import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { IBuyer } from '../../../models/buyer.model';
import { BuyerService } from '../../../services/buyer.service';
import { fromEvent } from 'rxjs';
import { UserSessionService } from '../../../services/user-session.service';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-new-buyer',
  templateUrl: './new-buyer.component.html',
  styleUrls: ['./new-buyer.component.scss'],
})
export class NewBuyerComponent implements OnInit {
  newBuyer: IBuyer = {};
  isCorrect: boolean;
  // ver elemento en scroll
  @ViewChild('product')
  productSelect: ElementRef;
  months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  monthSelect: number;
  yearSelect: number;
  daySelect: number;
  words: string;
  isEdit = false;
  constructor(
    private buyerService: BuyerService,
    private userSession: UserSessionService,
    private navController: NavController,
    public loadingController: LoadingController,
  ) {
    const buyerId = userSession.userSession.value.id;
    if (buyerId) {
      this.edit(buyerId);
    }
  }
  edit(id) {
    this.buyerService.getBuyerById(id).subscribe(buyer => {
      console.log(buyer);
      Object.keys(buyer).forEach(key => {
        if (buyer[key] === false) {
          buyer[key] = 'false';
        } else if (buyer[key] === true) {
          buyer[key] = 'true';
        }
      });
      this.newBuyer = buyer;
      this.words = '';
      this.newBuyer.tag.forEach((word, i) => {
        if (this.newBuyer.tag.length === i + 1) {
          this.words += word;
        } else {
          this.words += word + ',';
        }
      });
      const date = this.newBuyer.dateToBuy.split('/');
      this.daySelect = +date[0];
      this.monthSelect = +date[1];
      this.yearSelect = +date[2];
      this.isEdit = true;
      this.isCorrect = true;
    });
  }

  ngOnInit() {}
  check() {
    this.buyerService.checkBuyer(this.newBuyer).subscribe(buyer => {
      if (buyer === null) {
        this.isCorrect = true;
      } else {
        this.isCorrect = false;
      }
    });
    this.scroll();
  }
  scroll() {
    this.productSelect.nativeElement.scrollIntoView();
  }
  async checkUser() {
    const load = await this.presentLoadingWithOptions('Registrando...');
    load.present();
    this.newBuyer.tag = this.words.split(',');
    this.newBuyer.dateToBuy = `${this.daySelect}/${this.monthSelect}/${
      this.yearSelect
    }`;
    console.log(this.newBuyer);
    this.buyerService.newBuyer(this.newBuyer).subscribe(buyer => {
      if (buyer) {
        this.userSession.setUserSession(
          buyer.name,
          'buyer',
          buyer._id,
          buyer.password,
        );
        this.navController.navigateRoot('login', false);
      }
      load.dismiss();
    });
  }
  async editUser() {
    const load = await this.presentLoadingWithOptions('Editando...');
    load.present();
    this.newBuyer.tag = this.words.split(',');
    this.newBuyer.dateToBuy = `${this.daySelect}/${this.monthSelect}/${
      this.yearSelect
    }`;
    console.log(this.newBuyer);
    this.buyerService.putBuyer(this.newBuyer).subscribe(val => {
      if (val) {
        this.navController.navigateRoot('list-prop-buyer', false);
      }
      load.dismiss();
    });
  }
  async presentLoadingWithOptions(message) {
    const loading = await this.loadingController.create({
      message: message,
      translucent: true,
    });
    return await loading;
  }
}
