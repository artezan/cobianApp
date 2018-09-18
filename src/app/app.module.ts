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
  MatDatepickerModule,
  NativeDateModule,
  MAT_DATE_LOCALE,
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { GeneralTableComponent } from './components/general/general-table/general-table.component';
import { LayoutModule } from '@angular/cdk/layout';
import { CdkTableModule } from '@angular/cdk/table';
import { ListBuyerAdminComponent } from './components/admin/list-buyer-admin/list-buyer-admin.component';
import { GeneralSkeletonComponent } from './components/general/general-skeleton/general-skeleton.component';
import { GeneralFilterBuyerComponent } from './components/general/general-filter-buyer/general-filter-buyer.component';
import { DetailBuyerAdminComponent } from './components/admin/detail-buyer-admin/detail-buyer-admin.component';
import { ListAdviserAdminComponent } from './components/admin/list-adviser-admin/list-adviser-admin.component';
import { FilterAdviserComponent } from './components/general/filter-adviser/filter-adviser.component';
import { NewEditAdviserComponent } from './components/adviser/new-edit-adviser/new-edit-adviser.component';
import { NewEditSellerComponent } from './components/seller/new-edit-seller/new-edit-seller.component';
import { ListSellerAdminComponent } from './components/admin/list-seller-admin/list-seller-admin.component';
import { DetailSellerAdminComponent } from './components/admin/detail-seller-admin/detail-seller-admin.component';
import { DetailAdviserAdminComponent } from './components/admin/detail-adviser-admin/detail-adviser-admin.component';
import { FilterSellerComponent } from './components/general/filter-seller/filter-seller.component';
import { DetailPropAdminComponent } from './components/admin/detail-prop-admin/detail-prop-admin.component';
import { NewEditPropComponent } from './components/prop/new-edit-prop/new-edit-prop.component';
import { ListPropAdminComponent } from './components/admin/list-prop-admin/list-prop-admin.component';
import { ListCreditAdminComponent } from './components/admin/list-credit-admin/list-credit-admin.component';
import { NewEditCreditComponent } from './components/credit/new-edit-credit/new-edit-credit.component';
import { ListOfertsAdminComponent } from './components/admin/list-oferts-admin/list-oferts-admin.component';
import { NewEditOfertComponent } from './components/oferts/new-edit-ofert/new-edit-ofert.component';
import { NewEditScheduleComponent } from './components/schedule/new-edit-schedule/new-edit-schedule.component';
import { ListScheduleAdminComponent } from './components/admin/list-schedule-admin/list-schedule-admin.component';
import { RefreComponent } from './components/general/refre/refre.component';
import { PersonalScheduleComponent } from './components/schedule/personal-schedule/personal-schedule.component';
import { NewEditGoalComponent } from './components/goals/new-edit-goal/new-edit-goal.component';
import { ListGoalsComponent } from './components/admin/list-goals/list-goals.component';
import { GoalProgressComponent } from './components/general/goal-progress/goal-progress.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { DetailGoalAdminComponent } from './components/admin/detail-goal-admin/detail-goal-admin.component';
import { FormStrListComponent } from './components/general/form-str-list/form-str-list.component';
import { SimulateSearchAdminComponent } from './components/admin/simulate-search-admin/simulate-search-admin.component';
import { ListBuildAdminComponent } from './components/admin/list-build-admin/list-build-admin.component';
import { ListMakerAdminComponent } from './components/admin/list-maker-admin/list-maker-admin.component';
import { NewEditMakerComponent } from './components/maker/new-edit-maker/new-edit-maker.component';
import { NewEditBuildComponent } from './components/build/new-edit-build/new-edit-build.component';
import { FilterBuildComponent } from './components/general/filter-build/filter-build.component';
import { FilterMakerComponent } from './components/general/filter-maker/filter-maker.component';

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
    DetailBuyerAdminComponent,
    ListAdviserAdminComponent,
    FilterAdviserComponent,
    NewEditAdviserComponent,
    NewEditSellerComponent,
    ListSellerAdminComponent,
    DetailSellerAdminComponent,
    DetailAdviserAdminComponent,
    FilterSellerComponent,
    DetailPropAdminComponent,
    NewEditPropComponent,
    ListPropAdminComponent,
    ListCreditAdminComponent,
    NewEditCreditComponent,
    ListOfertsAdminComponent,
    NewEditOfertComponent,
    NewEditScheduleComponent,
    ListScheduleAdminComponent,
    RefreComponent,
    PersonalScheduleComponent,
    NewEditGoalComponent,
    ListGoalsComponent,
    GoalProgressComponent,
    DetailGoalAdminComponent,
    FormStrListComponent,
    SimulateSearchAdminComponent,
    ListBuildAdminComponent,
    ListMakerAdminComponent,
    NewEditMakerComponent,
    NewEditBuildComponent,
    FilterBuildComponent,
    FilterMakerComponent,
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
    MatDatepickerModule,
    NativeDateModule,
    MatMomentDateModule,
    NgCircleProgressModule.forRoot({
      showInnerStroke: false,
      responsive: true,
    }),
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
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
