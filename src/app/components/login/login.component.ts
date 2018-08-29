import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '../../services/user-session.service';
import { Router } from '@angular/router';
import { NavController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  emailInput: string;
  passInput: string;
  isFind = true;

  constructor(
    private userSession: UserSessionService,
    private router: Router,
    private navController: NavController,
    private menuController: MenuController,
  ) {
    // menuController.close();
    this.userSession.loggout();
  }

  ngOnInit() {
    // this.menuController.close();
  }
  close() {
    // this.menuController.close();
  }
  login() {
    this.userSession
      .logginUserSession(this.emailInput, this.passInput)
      .subscribe(data => {
        // data  administrator buyer seller adviser management
        console.log(data);

        if (data !== 'error') {
          this.userSession.setUserSession(
            data.data[0].name,
            data.type,
            data.data[0]._id,
          );
          this.isFind = true;
          if (data.type === 'buyer') {
            // this.router.navigate(['list-prop-buyer']);
            this.navController.goRoot('list-prop-buyer', false);
          }
        } else {
          this.isFind = false;
        }
      });
  }
}
