import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UserSessionPage } from './user-session.page';
import { AppMaterialModule } from '../../../material.module';

const routes: Routes = [
  {
    path: '',
    component: UserSessionPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AppMaterialModule,
  ],
  declarations: [UserSessionPage],
})
export class UserSessionPageModule {}
