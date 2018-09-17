import { Component, OnInit } from '@angular/core';
import { IGoal } from '../../../models/goal.model';
import { GoalService } from '../../../services/goal.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AdviserService } from '../../../services/adviser.service';
import { Observable } from 'rxjs';
import { IAdviser } from '../../../models/adviser.model';
import { Platform } from '@ionic/angular';
import { UserSessionService } from '../../../services/user-session.service';
@Component({
  selector: 'app-new-edit-goal',
  templateUrl: './new-edit-goal.component.html',
  styleUrls: ['./new-edit-goal.component.scss'],
})
export class NewEditGoalComponent implements OnInit {
  hide = true;
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
  arrList: string[] = [];
  numOfItems = 3;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private goalService: GoalService,
    private adviserService: AdviserService,
    private platform: Platform,
    private userService: UserSessionService,
  ) {
    this.isDesktop = platform.is('desktop');
    this.getAdviser();
    this.isLoad = false;
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        goalService.getGoaltById(params.id).subscribe(goal => {
          console.log(goal);
          this.goal = goal;
          if (goal.goals && goal.goals.length > 0) {
            this.arrList = goal.goals.map(g => g.nameGoal);
            this.numOfItems = this.arrList.length;
            console.log(this.arrList);
          }
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
    this.getSet();
    console.log(this.goal);
    console.log(this.arrList);
    this.goalService.putGoal(this.goal).subscribe(() => {
      const toast: NavigationExtras = {
        queryParams: { res: 'Objetivo Editado' },
      };
      this.router
        .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
        .then(() => this.router.navigate(['list-goals-admin'], toast));
    });
  }

  newGoal() {
    this.getSet();
    console.log(this.goal);
    this.goalService.newGoal(this.goal).subscribe(newGoal => {
      this.adviserSelect.forEach(adv => {
        this.adviserService.getAdviserById(adv._id).subscribe(a => {
          const arr = a.goal.map(g => g._id);
          arr.push(newGoal._id);
          a.goal = <any>arr;
          this.adviserService.putAdviser(a).subscribe(co => console.log('co'));
        });
      });
      const toast: NavigationExtras = {
        queryParams: { res: 'Objetivo Creado' },
      };
      this.router
        .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
        .then(() => this.router.navigate(['list-goals-admin'], toast));
    });
  }
  deleteAdviserOfGoal(adviserId: string) {
    console.log(adviserId);
    const index = this.goal.adviser.findIndex(adv => adv._id === adviserId);
    this.goal.adviser.splice(index, 1);
    this.adviserService.getAdviserById(adviserId).subscribe(adv => {
      const indexAdv = adv.goal.findIndex(g => g._id === this.goal._id);
      adv.goal.splice(indexAdv, 1);
      this.adviserService.putAdviser(adv).subscribe(() => {
        console.log('ok');
      });
    });
  }
  dateSelect(event) {
    if (event) {
      this.goal.day = event.value._i.date;
      this.goal.month = event.value._i.month;
      this.goal.year = event.value._i.year;
    }
  }
  private getSet() {
    // user
    const user = this.userService.userSession.value;
    if (user.type === 'administrator' || user.type === 'management') {
      this.goal.isByManagement = true;
    } else {
      this.goal.isByManagement = false;
    }
    // lista adv
    if (this.goal.adviser && this.goal.adviser.length > 0) {
      this.adviserSelect.forEach(adv => {
        const isFinded = this.goal.adviser.findIndex(
          gad => gad._id === adv._id,
        );
        if (isFinded === -1) {
          this.goal.adviser.push(adv);
        }
      });
    } else {
      this.goal.adviser = this.adviserSelect;
    }
    // lista str
    if (this.goal.goals && this.goal.goals.length > 0) {
      const goals = [];
      this.arrList.forEach((nameGoal, i) => {
        goals.push({
          isComplete: this.goal.goals[i]
            ? this.goal.goals[i].isComplete
            : false,
          nameGoal: nameGoal,
        });
      });
      this.goal.goals = <any>goals;
      // nuevo
    } else if (this.arrList.length > 0) {
      const goals = [];
      this.arrList.forEach((nameGoal, i) => {
        goals.push({
          isComplete: false,
          nameGoal: nameGoal,
        });
      });
      this.goal.goals = <any>goals;
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
