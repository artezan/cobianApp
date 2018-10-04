import { NgModule } from '@angular/core';
import {
  MdcButtonModule,
  MdcIconModule,
  MdcRippleModule,
  MdcTextFieldModule,
  MdcThemeModule,
  MdcTypographyModule,
  MdcTabBarModule,
} from '@angular-mdc/web';

@NgModule({
  exports: [
    MdcButtonModule,
    MdcIconModule,
    MdcRippleModule,
    MdcTextFieldModule,
    MdcThemeModule,
    MdcTypographyModule,
    MdcTabBarModule,
  ],
})
export class AppMaterialModule {}
