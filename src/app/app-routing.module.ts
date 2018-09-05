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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
