import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { IBuyer } from '../../../models/buyer.model';
import { BuyerService } from '../../../services/buyer.service';
import { fromEvent } from 'rxjs';
import { UserSessionService } from '../../../services/user-session.service';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AdviserService } from '../../../services/adviser.service';

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
  numOfForm = 0;
  constructor(
    private buyerService: BuyerService,
    private userSession: UserSessionService,
    private navController: NavController,
    public loadingController: LoadingController,
    private route: ActivatedRoute,
    private router: Router,
    private adviseService: AdviserService,
  ) {
    const buyerId = userSession.userSession.value.id;
    const user = userSession.userSession.value;
    console.log(user);
    if (buyerId && user.type === 'buyer') {
      this.edit(buyerId);
    }
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.edit(params['id']);
      }
    });
  }
  edit(id) {
    this.buyerService.getBuyerById(id).subscribe(buyer => {
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

  check() {
    this.buyerService.checkBuyer(this.newBuyer).subscribe(buyer => {
      if (buyer === null) {
        this.isCorrect = true;
      } else {
        this.isCorrect = false;
      }
    });
  }

  async checkUser() {
    const user1 = this.userSession.userSession.value;
    const load = await this.presentLoadingWithOptions('Registrando...');
    load.present();
    if (this.words) {
      this.newBuyer.tag = this.words.split(',');
    }
    this.newBuyer.dateToBuy = `${this.daySelect}/${this.monthSelect}/${
      this.yearSelect
    }`;
    if (user1.type && user1.type === 'adviser') {
      const arr: any = [user1.id];
      this.newBuyer.adviser = arr;
    }
    this.buyerService.newBuyer(this.newBuyer).subscribe(buyer => {
      const user = this.userSession.userSession.value;
      // data  administrator buyer seller adviser management
      // ADMIN
      if (
        user.type &&
        (user.type === 'administrator' || user.type === 'office')
      ) {
        // this.router.navigate(['list-buyer-admin']);
        const toast: NavigationExtras = {
          queryParams: { res: ' Comprador Creado' },
        };
        /**
         * Es para recargar el componente previo
         */
        this.router
          .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
          .then(() => this.router.navigate(['list-buyer-admin'], toast));
        // ADVISER
      } else if (user.type && user.type === 'adviser') {
        this.adviseService.getAdviserById(user.id).subscribe(adv => {
          adv.buyer.push(buyer);
          this.adviseService.putAdviser(adv).subscribe(() => {
            const toast: NavigationExtras = {
              queryParams: { res: ' Comprador Creado' },
            };
            /**
             * Es para recargar el componente previo
             */
            this.router
              .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
              .then(() => this.router.navigate(['list-buyer-admin'], toast));
          });
        });
        // NEW
      } else {
        if (buyer) {
          console.log(buyer);
          this.userSession.setUserSession(
            buyer.name,
            'buyer',
            buyer._id,
            buyer.password,
            buyer.email,
          );
          this.navController.navigateRoot('list-prop-buyer', false);
        }
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
    this.buyerService.putBuyer(this.newBuyer).subscribe(val => {
      const user = this.userSession.userSession.value;
      // data  administrator buyer seller adviser management
      if (user.type && user.type !== 'buyer') {
        // this.navController.navigateRoot('list-buyer-admin');
        // this.router.navigate('/list-buyer-admin');
        const toast: NavigationExtras = {
          queryParams: { res: ' Comprador Editado' },
        };
        /**
         * Es para recargar el componente previo
         */
        this.router
          .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
          .then(() => this.router.navigate(['list-buyer-admin'], toast));
      } else {
        if (val) {
          this.navController.navigateRoot('list-prop-buyer', false);
        }
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
