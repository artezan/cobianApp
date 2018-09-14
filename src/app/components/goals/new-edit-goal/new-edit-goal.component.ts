import { Component, OnInit } from '@angular/core';
import { IGoal } from '../../../models/goal.model';
import { GoalService } from '../../../services/goal.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AdviserService } from '../../../services/adviser.service';
import { Observable } from 'rxjs';
import { IAdviser } from '../../../models/adviser.model';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-new-edit-goal',
  templateUrl: './new-edit-goal.component.html',
  styleUrls: ['./new-edit-goal.component.scss'],
})
export class NewEditGoalComponent implements OnInit {
  hide = true;
  percent = 89;
  companyId: string;
  isNew = true;
  errorToShow = '';
  errorToShowMat = 'Dato obligatorio';
  goal: IGoal = {};
  files: string;
  isLoad: boolean;
  buyer = '';
  property = '';
  buyers;
  adviserSelect: IAdviser[] = [];
  advisers$: Observable<IAdviser[]>;
  isDesktop = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private goalService: GoalService,
    private adviserService: AdviserService,
    private platform: Platform,
  ) {
    this.isDesktop = platform.is('desktop');
    this.getAdviser();
    this.isLoad = false;
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        goalService.getGoaltById(params.id).subscribe(goal => {
          this.goal = goal;
          this.percent = (goal.currentNumber * 100) / goal.goalNumber;
        });
        this.isNew = false;
        this.isLoad = true;
      } else {
        this.isNew = true;
        this.isLoad = true;
      }
    });
  }

  ngOnInit() {}
  getAdviser() {
    this.advisers$ = this.adviserService.getAdviserAll();
  }
  getPercent() {
    this.percent = (this.goal.currentNumber * 100) / this.goal.goalNumber;
    console.log(this.percent);
  }
  editGoal() {
    // adv
    this.adviserSelect.forEach(adv => {
      const findIndex = this.goal.adviser.findIndex(
        gadv => gadv._id === adv._id,
      );
      if (findIndex === -1) {
        this.adviserService.getAdviserById(adv._id).subscribe(a => {
          const arr = a.goal.map(g => g._id);
          arr.push(this.goal._id);
          a.goal = <any>arr;
          this.adviserService.putAdviser(a).subscribe(co => console.log('co'));
        });
      }
    });
    // goal
    this.goalService.putGoal(this.goal).subscribe(() => {
      const toast: NavigationExtras = {
        queryParams: { res: 'Oferta Creada' },
      };
      this.router
        .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
        .then(() => this.router.navigate(['list-goals-admin'], toast));
    });
  }
  newOGoal() {
    /* this.ofert.files = this.files.split(',');
    this.ofert.status = 'amarillo';
    this.ofertService.newOfert(this.ofert).subscribe(o => {
      this.update('amarillo', this.ofert.buyer, this.ofert.property);
      this.OfertsBuyer.push(o._id);
      const buyer: any = {
        _id: this.ofert.buyer,
        ofert: this.OfertsBuyer,
      };
      this.buyerService.putBuyer(buyer).subscribe(() => {
        // this.navCtr.navigateRoot('list-ofert-admin', true);
        const toast: NavigationExtras = {
          queryParams: { res: 'Oferta Creada' },
        };
        this.router
          .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
          .then(() => this.router.navigate(['list-ofert-admin'], toast));
      });
    }); */
  }
  dateSelect(event) {
    if (event) {
      this.goal.day = event.value._i.date;
      this.goal.month = event.value._i.month;
      this.goal.year = event.value._i.year;
    }
  }
  getDate(day, month, year) {
    return new Date(year, month, day);
  }
  getPopMessage(event) {
    const isDisabled = (<HTMLInputElement>document.getElementById('submitUser'))
      .disabled;
    if (isDisabled) {
      this.errorToShow = 'Verificar datos ingresados';
    } else {
      this.errorToShow = '';
    }
  }
  getMatError($event) {
    if ($event.target.validity.valueMissing) {
      this.errorToShowMat = 'Dato obligatorio';
    }
    if ($event.target.validity.patternMismatch) {
      this.errorToShowMat = 'Solo números, letras, guiones y puntos\n';
    }
    if ($event.target.validity.tooShort) {
      this.errorToShowMat = 'Ingrese al menos 4 caracteres\n';
    }
    if ($event.target.validity.tooLong) {
      this.errorToShowMat = 'Máximo 255 caracteres\n';
    }
    if ($event.target.validity.rangeUnderflow) {
      this.errorToShowMat = 'Debe ser mayor a 0\n';
    }
  }
}
