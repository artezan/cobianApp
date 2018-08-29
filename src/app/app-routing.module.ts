import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ListPropBuyerComponent } from './components/list-prop-buyer/list-prop-buyer.component';
import { CalendarBuyerComponent } from './components/calendar-buyer/calendar-buyer.component';

const routes: Routes = [
  // Rutas
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'list-prop-buyer', component: ListPropBuyerComponent },
  { path: 'calendar-buyer', component: CalendarBuyerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
