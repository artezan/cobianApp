import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PostsPage } from './posts.page';
import { DetailPostComponent } from './detail-post/detail-post.component';
import {
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule,
} from '@angular/material';
import { NewPostComponent } from './new-post/new-post.component';

const routes: Routes = [
  {
    path: '',
    component: PostsPage,
  },
  {
    path: 'detail',
    component: DetailPostComponent,
  },
  {
    path: 'new-edit',
    component: NewPostComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,

    RouterModule.forChild(routes),
  ],
  declarations: [PostsPage, DetailPostComponent, NewPostComponent],
})
export class PostsPageModule {}
