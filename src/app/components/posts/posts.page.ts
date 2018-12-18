import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { UserSessionService } from '../../services/user-session.service';
import { IUserSession } from '../../models/userSession.model';
import { ToastController } from '@ionic/angular';
import { IPost } from '../../models/post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {
  isLoad: boolean;
  user: IUserSession;
  posts: IPost[] = [];

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private userSession: UserSessionService,
    public toastController: ToastController,
  ) {
    this.user = userSession.userSession.value;
  }

  ngOnInit() {
    this.isLoad = false;
    this.route.queryParams.subscribe(params => {
      if (params['res']) {
        this.presentToast(params['res']);
      }
    });
    if (this.user.type === 'administrator') {
      this.getPostAll();
    } else {
      this.searchPost();
    }
  }
  getPostAll() {
    this.postService.getAll().subscribe(posts => {
      this.posts = posts;
      this.isLoad = true;
      console.log('posts', posts);
    });
  }
  searchPost() {
    let tag;
    if (this.user.subType) {
      tag = this.user.subType;
    } else {
      tag = this.user.type;
    }
    this.postService.searchPost(this.user.id, tag).subscribe(post => {
      this.posts = post;
      this.isLoad = true;
    });
  }
  newPost() {
    this.router.navigate(['posts/new-edit']);
  }
  editPost(id) {
    const data: NavigationExtras = {
      queryParams: { id },
    };
    this.router.navigate(['posts/new-edit'], data);
  }
  seePost(id) {
    const data: NavigationExtras = {
      queryParams: { id },
    };
    this.router.navigate(['posts/detail'], data);
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }
}
