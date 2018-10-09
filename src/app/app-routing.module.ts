import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ListPropBuyerComponent } from './components/buyer/list-prop-buyer/list-prop-buyer.component';
import { CalendarBuyerComponent } from './components/buyer/calendar-buyer/calendar-buyer.component';
import { EventDetailBuyerComponent } from './components/buyer/event-detail-buyer/event-detail-buyer.component';
import { DetailPropBuyerComponent } from './components/buyer/detail-prop-buyer/detail-prop-buyer.component';
import { UserSelectComponent } from './components/login/user-select/user-select.component';
import { NewBuyerComponent } from './components/buyer/new-buyer/new-buyer.component';
import { InterPropBuyerComponent } from './components/buyer/inter-prop-buyer/inter-prop-buyer.component';
import { CreditEventBuyerComponent } from './components/buyer/credit-event-buyer/credit-event-buyer.component';
import { OfertBuyerComponent } from './components/buyer/ofert-buyer/ofert-buyer.component';
import { MainAdminComponent } from './components/admin/main-admin/main-admin.component';
import { ListBuyerAdminComponent } from './components/admin/list-buyer-admin/list-buyer-admin.component';
import { DetailBuyerAdminComponent } from './components/admin/detail-buyer-admin/detail-buyer-admin.component';
import { ListAdviserAdminComponent } from './components/admin/list-adviser-admin/list-adviser-admin.component';
import { NewEditAdviserComponent } from './components/adviser/new-edit-adviser/new-edit-adviser.component';
import { DetailAdviserAdminComponent } from './components/admin/detail-adviser-admin/detail-adviser-admin.component';
import { ListSellerAdminComponent } from './components/admin/list-seller-admin/list-seller-admin.component';
import { DetailSellerAdminComponent } from './components/admin/detail-seller-admin/detail-seller-admin.component';
import { NewEditSellerComponent } from './components/seller/new-edit-seller/new-edit-seller.component';
import { NewEditPropComponent } from './components/prop/new-edit-prop/new-edit-prop.component';
import { ListPropAdminComponent } from './components/admin/list-prop-admin/list-prop-admin.component';
import { DetailPropAdminComponent } from './components/admin/detail-prop-admin/detail-prop-admin.component';
import { ListCreditAdminComponent } from './components/admin/list-credit-admin/list-credit-admin.component';
import { NewEditCreditComponent } from './components/credit/new-edit-credit/new-edit-credit.component';
import { ListOfertsAdminComponent } from './components/admin/list-oferts-admin/list-oferts-admin.component';
import { NewEditOfertComponent } from './components/oferts/new-edit-ofert/new-edit-ofert.component';
import { ListScheduleAdminComponent } from './components/admin/list-schedule-admin/list-schedule-admin.component';
import { NewEditScheduleComponent } from './components/schedule/new-edit-schedule/new-edit-schedule.component';
import { RefreComponent } from './components/general/refre/refre.component';
import { PersonalScheduleComponent } from './components/schedule/personal-schedule/personal-schedule.component';
import { ListGoalsComponent } from './components/admin/list-goals/list-goals.component';
import { NewEditGoalComponent } from './components/goals/new-edit-goal/new-edit-goal.component';
import { DetailGoalAdminComponent } from './components/admin/detail-goal-admin/detail-goal-admin.component';
import { SimulateSearchAdminComponent } from './components/admin/simulate-search-admin/simulate-search-admin.component';
import { ListBuildAdminComponent } from './components/admin/list-build-admin/list-build-admin.component';
import { NewEditBuildComponent } from './components/build/new-edit-build/new-edit-build.component';
import { ListMakerAdminComponent } from './components/admin/list-maker-admin/list-maker-admin.component';
import { NewEditMakerComponent } from './components/maker/new-edit-maker/new-edit-maker.component';
import { DetailBuildAdminComponent } from './components/admin/detail-build-admin/detail-build-admin.component';
import { ListSalespropAdminComponent } from './components/admin/list-salesprop-admin/list-salesprop-admin.component';
import { DetailSalespropAdminComponent } from './components/admin/detail-salesprop-admin/detail-salesprop-admin.component';
import { ListSalesAdminComponent } from './components/admin/list-sales-admin/list-sales-admin.component';
import { ListOfficeAdminComponent } from './components/admin/list-office-admin/list-office-admin.component';
import { NewEditOfficeComponent } from './components/office/new-edit-office/new-edit-office.component';
import { ListNotificationComponent } from './components/notification/list-notification/list-notification.component';

const routes: Routes = [
  // Rutas
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'list-prop-buyer', component: ListPropBuyerComponent },
  { path: 'calendar-buyer', component: CalendarBuyerComponent },
  { path: 'event-detail-buyer', component: EventDetailBuyerComponent },
  { path: 'buyer-property-detail', component: DetailPropBuyerComponent },
  { path: 'login-select-user', component: UserSelectComponent },
  { path: 'new-buyer', component: NewBuyerComponent },
  { path: 'inter-prop-buyer', component: InterPropBuyerComponent },
  { path: 'credit-event-buyer', component: CreditEventBuyerComponent },
  { path: 'ofert-buyer', component: OfertBuyerComponent },
  { path: 'main-admin', component: MainAdminComponent },
  { path: 'list-buyer-admin', component: ListBuyerAdminComponent },
  { path: 'detail-buyer-admin', component: DetailBuyerAdminComponent },
  { path: 'list-adviser-admin', component: ListAdviserAdminComponent },
  { path: 'new-edit-adviser', component: NewEditAdviserComponent },
  { path: 'detail-adviser-admin', component: DetailAdviserAdminComponent },
  { path: 'list-seller-admin', component: ListSellerAdminComponent },
  { path: 'detail-seller-admin', component: DetailSellerAdminComponent },
  { path: 'new-edit-seller', component: NewEditSellerComponent },
  { path: 'list-prop-admin', component: ListPropAdminComponent },
  { path: 'new-edit-prop', component: NewEditPropComponent },
  { path: 'detail-prop-admin', component: DetailPropAdminComponent },
  { path: 'list-credit-admin', component: ListCreditAdminComponent },
  { path: 'new-edit-credit', component: NewEditCreditComponent },
  { path: 'list-ofert-admin', component: ListOfertsAdminComponent },
  { path: 'new-edit-ofert', component: NewEditOfertComponent },
  { path: 'new-edit-schedule', component: NewEditScheduleComponent },
  { path: 'list-schedule-admin', component: ListScheduleAdminComponent },
  { path: 'personal-schedule', component: PersonalScheduleComponent },
  { path: 'RefrshComponent', component: RefreComponent },
  { path: 'list-goals-admin', component: ListGoalsComponent },
  { path: 'new-edit-goal', component: NewEditGoalComponent },
  { path: 'detail-goal-admin', component: DetailGoalAdminComponent },
  { path: 'simulate-search-admin', component: SimulateSearchAdminComponent },
  { path: 'list-build-admin', component: ListBuildAdminComponent },
  { path: 'new-edit-build', component: NewEditBuildComponent },
  { path: 'list-maker-admin', component: ListMakerAdminComponent },
  { path: 'new-edit-maker', component: NewEditMakerComponent },
  { path: 'detail-build-admin', component: DetailBuildAdminComponent },
  { path: 'list-salesprop-admin', component: ListSalespropAdminComponent },
  { path: 'detail-salesprop-admin', component: DetailSalespropAdminComponent },
  { path: 'list-sales-admin', component: ListSalesAdminComponent },
  { path: 'list-office-admin', component: ListOfficeAdminComponent },
  { path: 'new-edit-office', component: NewEditOfficeComponent },
  { path: 'list-notification', component: ListNotificationComponent },  { path: 'user-session', loadChildren: './components/user-session/user-session/user-session.module#UserSessionPageModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
