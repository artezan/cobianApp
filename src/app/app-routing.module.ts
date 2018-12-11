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
import { AuthGuardService } from './services/auth-guard.service';
import { DocumentsComponent } from './components/documents/documents.component';
import { ListPreBuyerComponent } from './components/admin/list-pre-buyer/list-pre-buyer.component';
import { PreBuyerComponent } from './components/pre-buyer/pre-buyer.component';
import { ListPreBuildComponent } from './components/admin/list-pre-build/list-pre-build.component';
import { NewEditPreBuildComponent } from './components/pre-build/new-edit-pre-build/new-edit-pre-build.component';
import { DetailPreBuildComponent } from './components/admin/detail-pre-build/detail-pre-build.component';
import { ListManagerAdminComponent } from './components/admin/list-manager-admin/list-manager-admin.component';
import { NewEditManagerComponent } from './components/manager/new-edit-manager/new-edit-manager.component';
import { ListSubmanagerAdminComponent } from './components/admin/list-submanager-admin/list-submanager-admin.component';
import { NewEditSubmanagerAdminComponent } from './components/subman/new-edit-submanager-admin/new-edit-submanager-admin.component';

const routes: Routes = [
  // Rutas
  // roles : | 'administrator' | 'buyer' | 'seller' | 'adviser' | 'management' | 'maker' | 'office';
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'list-prop-buyer',
    component: ListPropBuyerComponent,
    canActivate: [AuthGuardService],
    data: { rol: ['buyer'] },
  },
  {
    path: 'calendar-buyer',
    component: CalendarBuyerComponent,
    canActivate: [AuthGuardService],
    data: { rol: ['buyer'] },
  },
  {
    path: 'event-detail-buyer',
    component: EventDetailBuyerComponent,
    canActivate: [AuthGuardService],
    data: { rol: ['buyer'] },
  },
  {
    path: 'buyer-property-detail',
    component: DetailPropBuyerComponent,
    canActivate: [AuthGuardService],
    data: { rol: ['buyer'] },
  },
  { path: 'login-select-user', component: UserSelectComponent },
  { path: 'new-buyer', component: NewBuyerComponent },
  {
    path: 'inter-prop-buyer',
    component: InterPropBuyerComponent,
    canActivate: [AuthGuardService],
    data: { rol: ['buyer'] },
  },
  {
    path: 'credit-event-buyer',
    component: CreditEventBuyerComponent,
    canActivate: [AuthGuardService],
    data: { rol: ['buyer'] },
  },
  {
    path: 'ofert-buyer',
    component: OfertBuyerComponent,
    canActivate: [AuthGuardService],
    data: { rol: ['buyer'] },
  },
  {
    path: 'main-admin',
    component: MainAdminComponent,
    canActivate: [AuthGuardService],
    data: { rol: ['administrator'] },
  },
  {
    path: 'list-buyer-admin',
    component: ListBuyerAdminComponent,
    canActivate: [AuthGuardService],
    data: {
      rol: ['administrator', 'seller', 'adviser', 'management', 'office'],
    },
  },
  {
    path: 'detail-buyer-admin',
    component: DetailBuyerAdminComponent,
    canActivate: [AuthGuardService],
    data: {
      rol: ['administrator', 'seller', 'adviser', 'management', 'office'],
    },
  },
  {
    path: 'list-adviser-admin',
    component: ListAdviserAdminComponent,
    canActivate: [AuthGuardService],
    data: {
      rol: ['administrator', 'seller', 'adviser', 'management', 'office'],
    },
  },
  {
    path: 'new-edit-adviser',
    component: NewEditAdviserComponent,
    canActivate: [AuthGuardService],
    data: {
      rol: ['administrator', 'seller', 'adviser', 'management', 'office'],
    },
  },
  {
    path: 'detail-adviser-admin',
    component: DetailAdviserAdminComponent,
    canActivate: [AuthGuardService],
    data: {
      rol: ['administrator', 'seller', 'adviser', 'management', 'office'],
    },
  },
  {
    path: 'list-seller-admin',
    component: ListSellerAdminComponent,
    canActivate: [AuthGuardService],
    data: {
      rol: ['administrator', 'seller', 'adviser', 'management', 'office'],
    },
  },
  {
    path: 'detail-seller-admin',
    component: DetailSellerAdminComponent,
    canActivate: [AuthGuardService],
    data: {
      rol: ['administrator', 'seller', 'adviser', 'management', 'office'],
    },
  },
  {
    path: 'new-edit-seller',
    component: NewEditSellerComponent,
    canActivate: [AuthGuardService],
    data: {
      rol: ['administrator', 'seller', 'adviser', 'management', 'office'],
    },
  },
  {
    path: 'list-prop-admin',
    component: ListPropAdminComponent,
    canActivate: [AuthGuardService],
    data: {
      rol: ['administrator', 'seller', 'adviser', 'management', 'office'],
    },
  },
  {
    path: 'new-edit-prop',
    component: NewEditPropComponent,
    canActivate: [AuthGuardService],
    data: {
      rol: ['administrator', 'management', 'office'],
    },
  },
  {
    path: 'detail-prop-admin',
    component: DetailPropAdminComponent,
    canActivate: [AuthGuardService],
    data: {
      rol: ['administrator', 'seller', 'adviser', 'management', 'office'],
    },
  },
  {
    path: 'list-credit-admin',
    component: ListCreditAdminComponent,
    canActivate: [AuthGuardService],
    data: {
      rol: ['administrator', 'adviser', 'management', 'office'],
    },
  },
  {
    path: 'new-edit-credit',
    component: NewEditCreditComponent,
    canActivate: [AuthGuardService],
    data: {
      rol: ['administrator', 'adviser', 'management', 'office'],
    },
  },
  {
    path: 'list-ofert-admin',
    component: ListOfertsAdminComponent,
    canActivate: [AuthGuardService],
    data: {
      rol: ['administrator', 'adviser', 'management', 'office'],
    },
  },
  {
    path: 'new-edit-ofert',
    component: NewEditOfertComponent,
    canActivate: [AuthGuardService],
    data: {
      rol: ['administrator', 'adviser', 'management', 'office'],
    },
  },
  {
    path: 'new-edit-schedule',
    component: NewEditScheduleComponent,
    canActivate: [AuthGuardService],
    data: {
      rol: ['administrator', 'adviser', 'management', 'office'],
    },
  },
  {
    path: 'list-schedule-admin',
    component: ListScheduleAdminComponent,
    canActivate: [AuthGuardService],
    data: {
      rol: ['administrator', 'adviser', 'management', 'office'],
    },
  },
  { path: 'personal-schedule', component: PersonalScheduleComponent },
  { path: 'RefrshComponent', component: RefreComponent },
  {
    path: 'list-goals-admin',
    component: ListGoalsComponent,
    canActivate: [AuthGuardService],
    data: {
      rol: ['administrator', 'adviser', 'management', 'office'],
    },
  },
  {
    path: 'new-edit-goal',
    component: NewEditGoalComponent,
    canActivate: [AuthGuardService],
    data: {
      rol: ['administrator', 'adviser', 'management', 'office'],
    },
  },
  {
    path: 'detail-goal-admin',
    component: DetailGoalAdminComponent,
    canActivate: [AuthGuardService],
    data: {
      rol: ['administrator', 'adviser', 'management', 'office'],
    },
  },
  {
    path: 'simulate-search-admin',
    component: SimulateSearchAdminComponent,
  },
  {
    path: 'list-build-admin',
    component: ListBuildAdminComponent,
    canActivate: [AuthGuardService],
    data: {
      rol: ['administrator', 'adviser', 'management', 'office'],
    },
  },
  {
    path: 'new-edit-build',
    component: NewEditBuildComponent,
    canActivate: [AuthGuardService],
    data: {
      rol: ['administrator', 'adviser', 'management', 'office'],
    },
  },
  {
    path: 'list-maker-admin',
    component: ListMakerAdminComponent,
    canActivate: [AuthGuardService],
    data: {
      rol: ['administrator', 'adviser', 'management', 'office'],
    },
  },
  {
    path: 'new-edit-maker',
    component: NewEditMakerComponent,
    canActivate: [AuthGuardService],
    data: {
      rol: ['administrator', 'adviser', 'management', 'office'],
    },
  },
  {
    path: 'detail-build-admin',
    component: DetailBuildAdminComponent,
    canActivate: [AuthGuardService],
    data: {
      rol: ['administrator', 'adviser', 'management', 'office', 'maker'],
    },
  },
  {
    path: 'list-salesprop-admin',
    component: ListSalespropAdminComponent,
    canActivate: [AuthGuardService],
    data: {
      rol: ['administrator', 'adviser', 'management', 'office'],
    },
  },
  {
    path: 'detail-salesprop-admin',
    component: DetailSalespropAdminComponent,
    canActivate: [AuthGuardService],
    data: {
      rol: ['administrator', 'adviser', 'management', 'office'],
    },
  },
  {
    path: 'list-sales-admin',
    component: ListSalesAdminComponent,
    canActivate: [AuthGuardService],
    data: {
      rol: ['administrator', 'adviser', 'management', 'office'],
    },
  },
  {
    path: 'list-office-admin',
    component: ListOfficeAdminComponent,
    canActivate: [AuthGuardService],
    data: {
      rol: ['administrator', 'management'],
    },
  },
  {
    path: 'new-edit-office',
    component: NewEditOfficeComponent,
    canActivate: [AuthGuardService],
    data: {
      rol: ['administrator', 'adviser', 'management', 'office'],
    },
  },
  {
    path: 'list-manager-admin',
    component: ListManagerAdminComponent,
    canActivate: [AuthGuardService],
    data: {
      rol: ['administrator', 'management', 'office'],
    },
  },
  {
    path: 'new-edit-manager',
    component: NewEditManagerComponent,
    canActivate: [AuthGuardService],
    data: {
      rol: ['administrator', 'management', 'office'],
    },
  },
  // sub
  {
    path: 'list-submanager-admin',
    component: ListSubmanagerAdminComponent,
    canActivate: [AuthGuardService],
    data: {
      rol: ['administrator', 'management', 'office'],
    },
  },
  {
    path: 'new-edit-submanager',
    component: NewEditSubmanagerAdminComponent,
    canActivate: [AuthGuardService],
    data: {
      rol: ['administrator', 'management', 'office'],
    },
  },
  { path: 'list-notification', component: ListNotificationComponent },
  {
    path: 'user-session',
    loadChildren:
      './components/user-session/user-session/user-session.module#UserSessionPageModule',
    /*  canActivate: [AuthGuardService],
    data: {
      rol: ['administrator', 'adviser', 'management', 'office'],
    }, */
  },
  {
    path: 'chat',
    loadChildren: './components/chat/chat.module#ChatPageModule',
  },
  {
    path: 'documents',
    component: DocumentsComponent,
    canActivate: [AuthGuardService],
    data: {
      rol: ['administrator', 'management', 'office'],
    },
  },
  {
    path: 'list-prebuyer-admin',
    component: ListPreBuyerComponent,
    canActivate: [AuthGuardService],
    data: {
      rol: ['administrator', 'management', 'office'],
    },
  },
  {
    path: 'new-edit-prebuyer',
    component: PreBuyerComponent,
    /* canActivate: [AuthGuardService],
    data: {
      rol: ['administrator', 'management', 'office']
    } */
  },
  {
    path: 'list-prebuild-admin',
    component: ListPreBuildComponent,
    canActivate: [AuthGuardService],
    data: {
      rol: ['administrator', 'management', 'office'],
    },
  },
  {
    path: 'new-edit-prebuild',
    component: NewEditPreBuildComponent,
    /* canActivate: [AuthGuardService],
    data: {
      rol: ['administrator', 'management', 'office']
    } */
  },
  {
    path: 'detail-prebuild-admin',
    component: DetailPreBuildComponent,
    /* canActivate: [AuthGuardService],
    data: {
      rol: ['administrator', 'management', 'office']
    } */
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
