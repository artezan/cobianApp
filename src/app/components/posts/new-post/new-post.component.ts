import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { IPost } from '../../../models/post.model';
import { PostService } from '../../../services/post.service';
import { UserSessionService } from '../../../services/user-session.service';
import { IUserSession } from '../../../models/userSession.model';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent implements OnInit {
  post: IPost = {};
  isAdviser: boolean;
  isManagement: boolean;
  isSubManagement: boolean;
  isAdministrator: boolean;
  isOffice: boolean;
  user: IUserSession;

  isNew = true;
  isLoad = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private userSession: UserSessionService,
  ) {
    this.user = userSession.userSession.value;
    this.route.queryParams.subscribe(async params => {
      if (params['id']) {
        this.isNew = false;
        this.post = await postService.getPostById(params['id']).toPromise();
        this.setCheck(this.post);
      } else {
        this.isNew = true;
      }
      this.isLoad = true;
    });
  }

  ngOnInit() {}
  backOne() {
    this.router
      .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
      .then(() => this.router.navigate(['posts']));
  }
  newPost() {
    this.post.uids = [this.user.id];
    this.getShows();
    this.postService.newPost(this.post).subscribe(post => {
      console.log(post);
      const toast: NavigationExtras = {
        queryParams: { res: 'Nueva Nota Agregada' },
      };
      this.router
        .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
        .then(() => this.router.navigate(['posts'], toast));
    });
  }
  editPost() {
    this.getShows();
    this.postService.putPost(this.post).subscribe(() => {
      const toast: NavigationExtras = {
        queryParams: { res: 'Nota Editada' },
      };
      this.router
        .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
        .then(() => this.router.navigate(['posts'], toast));
    });
  }
  private getShows() {
    this.post.tags = [];
    if (this.isAdviser) {
      this.post.tags.push('adviser');
    }
    if (this.isManagement) {
      this.post.tags.push('management');
    }
    if (this.isSubManagement) {
      this.post.tags.push('subManagement');
    }
    if (this.isAdministrator) {
      this.post.tags.push('administrator');
    }
    if (this.isOffice) {
      this.post.tags.push('office');
    }
  }
  private setCheck(post: IPost) {
    if (post.tags.some(t => t === 'adviser')) {
      this.isAdviser = true;
    }
    if (post.tags.some(t => t === 'management')) {
      this.isManagement = true;
    }
    if (post.tags.some(t => t === 'subManagement')) {
      this.isSubManagement = true;
    }
    if (post.tags.some(t => t === 'administrator')) {
      this.isAdministrator = true;
    }
    if (post.tags.some(t => t === 'office')) {
      this.isOffice = true;
    }
  }
}
