import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { AppMaterialModule } from './material.module';
import { IonicStorageModule } from '@ionic/storage';
import { UserSessionService } from './services/user-session.service';
import { GeneralCalendarComponent } from './components/general/general-calendar/general-calendar.component';
import { ListPropBuyerComponent } from './components/buyer/list-prop-buyer/list-prop-buyer.component';
import { CalendarBuyerComponent } from './components/buyer/calendar-buyer/calendar-buyer.component';
import { EventDetailBuyerComponent } from './components/buyer/event-detail-buyer/event-detail-buyer.component';
import { DetailPropBuyerComponent } from './components/buyer/detail-prop-buyer/detail-prop-buyer.component';
import { GeneralFiltersComponent } from './components/general/general-filters/general-filters.component';
import { UserSelectComponent } from './components/login/user-select/user-select.component';
import { NewBuyerComponent } from './components/buyer/new-buyer/new-buyer.component';
import { OfertBuyerComponent } from './components/buyer/ofert-buyer/ofert-buyer.component';
import { InterPropBuyerComponent } from './components/buyer/inter-prop-buyer/inter-prop-buyer.component';
import { CreditEventBuyerComponent } from './components/buyer/credit-event-buyer/credit-event-buyer.component';
import { MainAdminComponent } from './components/admin/main-admin/main-admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BarLineComponent } from './components/general/bar-line/bar-line.component';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatGridListModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTooltipModule,
  MatButtonToggleModule,
  MatChipsModule,
  MatBottomSheetModule,
  MatSnackBarModule,
  MatAutocompleteModule,
  MatExpansionModule,
  MatDialogModule,
  MatRadioModule,
  MatTabsModule,
  MatProgressSpinnerModule,
  MatDividerModule,
} from '@angular/material';
import { GeneralTableComponent } from './components/general/general-table/general-table.component';
import { LayoutModule } from '@angular/cdk/layout';
import { CdkTableModule } from '@angular/cdk/table';
import { ListBuyerAdminComponent } from './components/admin/list-buyer-admin/list-buyer-admin.component';
import { GeneralSkeletonComponent } from './components/general/general-skeleton/general-skeleton.component';
import { GeneralFilterBuyerComponent } from './components/general/general-filter-buyer/general-filter-buyer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListPropBuyerComponent,
    CalendarBuyerComponent,
    GeneralCalendarComponent,
    EventDetailBuyerComponent,
    DetailPropBuyerComponent,
    GeneralFiltersComponent,
    UserSelectComponent,
    NewBuyerComponent,
    OfertBuyerComponent,
    InterPropBuyerComponent,
    CreditEventBuyerComponent,
    MainAdminComponent,
    BarLineComponent,
    GeneralTableComponent,
    ListBuyerAdminComponent,
    GeneralSkeletonComponent,
    GeneralFilterBuyerComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // IonicModule.forRoot({ mode: 'ios' }),
    IonicModule.forRoot({ backButtonText: '' }),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    AppMaterialModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatDialogModule,
    MatRadioModule,
    MatTabsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    CdkTableModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: APP_INITIALIZER,
      useFactory: (check: UserSessionService) => () =>
        check.checkValidSession(),
      deps: [UserSessionService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
