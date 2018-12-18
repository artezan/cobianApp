import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { UserSessionService } from '../../../services/user-session.service';
import { IUserSession } from '../../../models/userSession.model';
import { IPost } from '../../../models/post.model';
import { FormatDatesFront } from '../../../_config/_helpers';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.scss'],
})
export class DetailPostComponent implements OnInit {
  user: IUserSession;
  isLoad = false;
  post: IPost = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private userSession: UserSessionService,
    public alertController: AlertController,
  ) {
    this.user = userSession.userSession.value;
    this.route.queryParams.subscribe(async params => {
      if (params['id']) {
        this.getPost(params['id']);
      }
      this.isLoad = true;
    });
  }

  ngOnInit() {
    const tool = document.getElementById('tool');
    tool.classList.add('card-azul');
  }
  backOne() {
    this.router
      .navigateByUrl('/RefrshComponent', { skipLocationChange: true })
      .then(() => this.router.navigate(['posts']));
  }
  async getPost(id) {
    this.post = await this.postService.getPostById(id).toPromise();
  }
  formatDates(date: Date): string {
    return FormatDatesFront(date);
  }
  deleteCard(id) {
    this.postService.deltedPostById(id).subscribe(() => {
      this.router.navigate(['posts']);
    });
  }
  async presentAlertConfirm(c) {
    const alert = await this.alertController.create({
      header: 'Eliminar Nota',
      message: `¿Desea eliminar nota ?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Sí',
          role: 'ok',
          handler: () => {
            /* this.deleted(buyer);
            this.getBuyerAll(); */
          },
        },
      ],
    });

    await alert.present();
    // IMPORTANTE ASYNC !!!!!
    await alert.onWillDismiss().then(res => {
      if (res.role === 'ok') {
        this.deleteCard(c);
      }
    });
  }
}
