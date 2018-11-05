import { Component, OnInit, Input } from '@angular/core';
import { Platform } from '@ionic/angular';
import {
  LaunchNavigator,
  LaunchNavigatorOptions
} from '@ionic-native/launch-navigator/ngx';
declare var launchnavigator: any;

@Component({
  selector: 'app-maps-button',
  templateUrl: './maps-button.component.html',
  styleUrls: ['./maps-button.component.scss']
})
export class MapsButtonComponent implements OnInit {
  @Input()
  address = 'centro';
  @Input()
  city = 'Puebla';

  constructor(
    private platform: Platform,
    private launchNavigator: LaunchNavigator
  ) {}

  ngOnInit() {}
  openMaps() {
    const isCordova = this.platform.is('cordova');
    if (isCordova) {
      const isAndroid = this.platform.is('android');
      if (isAndroid) {
        const options: LaunchNavigatorOptions = {
          app: launchnavigator.APP.GOOGLE_MAPS
        };

        this.launchNavigator
          .navigate(this.address, options)
          .then(
            success => console.log('Launched navigator'),
            error => console.log('Error launching navigator', error)
          );
      } else {
        const options: LaunchNavigatorOptions = {
          app: launchnavigator.LAUNCH_MODE.MAPKIT
        };

        this.launchNavigator
          .navigate(this.address, options)
          .then(
            success => console.log('Launched navigator'),
            error => console.log('Error launching navigator', error)
          );
      }
    } else {
      window.location.href = `http://maps.google.com/?q=${this.address}, ${
        this.city
      }`;
    }
  }
}
