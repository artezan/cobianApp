import { NgModule } from '@angular/core';
import {
  MdcButtonModule,
  MdcIconModule,
  MdcRippleModule,
  MdcTextFieldModule,
  MdcThemeModule,
  MdcTypographyModule,
} from '@angular-mdc/web';

@NgModule({
  exports: [
    MdcButtonModule,
    MdcIconModule,
    MdcRippleModule,
    MdcTextFieldModule,
    MdcThemeModule,
    MdcTypographyModule,
  ],
})
export class AppMaterialModule {}
