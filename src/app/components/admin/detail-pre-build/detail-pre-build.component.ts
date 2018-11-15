import { Component, OnInit } from '@angular/core';
import { PreBuildService } from '../../../services/pre-build.service';
import { ActivatedRoute } from '@angular/router';
import { UserSessionService } from '../../../services/user-session.service';
import { IUserSession } from '../../../models/userSession.model';
import { IPreBuild } from '../../../models/preBuild';
import { INotification } from '../../../models/notification.model';
import { OnesignalService } from '../../../services/onesignal.service';
import {
  ToastController,
  AlertController,
  LoadingController
} from '@ionic/angular';
import { FormatDatesFront } from '../../../_config/_helpers';
import { BuildService } from '../../../services/build.service';
import { END_POINT } from '../../../_config/api.end-points';
interface TimeLine {
  dayToStart?: number;
  monthToStart?: number;
  yearToStart?: number;
  dayToEnd?: number;
  monthToEnd?: number;
  yearToEnd?: number;
  notes?: string;
  namePhase?: string;
  isComplete?: boolean;
  imgUrls?: string[];
  _id?: any;
}
@Component({
  selector: 'app-detail-pre-build',
  templateUrl: './detail-pre-build.component.html',
  styleUrls: ['./detail-pre-build.component.scss']
})
export class DetailPreBuildComponent implements OnInit {
  user: IUserSession;
  isDesktop = true;
  isLoad: boolean;
  preBuild: IPreBuild;
  percent: number;
  isList: boolean;
  imgName = '';
  imgToUpload: {
    srcPrev: string;
    srcBlob: Blob;
    name: string;
  }[] = [];

  constructor(
    private preBuildService: PreBuildService,
    private route: ActivatedRoute,
    private userSession: UserSessionService,
    private oneSignalService: OnesignalService,
    public toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private buildService: BuildService
  ) {
    this.user = userSession.userSession.value;
    this.route.queryParams.subscribe(params => {
      if (params.id) {
        this.getPreBuild(params.id);
      }
    });
  }

  ngOnInit() {}
  getPreBuild(id: string) {
    this.isLoad = false;
    this.preBuildService.getBuildById(id).subscribe(build => {
      this.preBuild = build;
      this.getPercent(build.timeLine);
      this.isLoad = true;
    });
  }
  getPercent(timeLine) {
    let numOfComplete = 0;
    timeLine.forEach(tl => {
      if (tl.isComplete) {
        numOfComplete++;
      }
    });
    this.percent = (numOfComplete * 100) / timeLine.length;
  }
  checkAdminRol(userType: string): boolean {
    if (userType === 'preBuyer') {
      return false;
    } else {
      return true;
    }
  }
  changeStatus(e: boolean) {
    this.preBuildService.putBuild(this.preBuild).subscribe(() => {
      this.getPercent(this.preBuild.timeLine);
      if (e) {
        // borrar img
        if (this.preBuild.imgUrls && this.preBuild.imgUrls.length) {
          this.preBuild.imgUrls.forEach(img => {
            this.deletedImg(img);
          });
          this.preBuild.imgUrls = [];
          this.preBuildService.putBuild(this.preBuild).subscribe();
        }
        if (this.percent === 100) {
          this.notification(
            'Obra Terminada',
            `Se ha completado la obra: "${this.preBuild.name}"`,
            'azul',
            'celebrate',
            undefined,
            this.preBuild.preBuyer.map(a => a._id)
          );
        } else {
          this.notification(
            'Fase Concluida',
            `Se ha completado una fase de la obra: "${this.preBuild.name}"`,
            'rojo',
            'celebrate',
            undefined,
            this.preBuild.preBuyer.map(a => a._id)
          );
        }
      }
      this.presentToast(
        this.percent === 100 ? 'Obra Terminada' : 'Se ha modificado una fase'
      );
    });
  }
  private notification(
    title,
    message,
    status,
    type,
    tags,
    receiversId: string[]
  ) {
    // notificacion
    const notification: INotification = {
      title: title,
      message: message,
      tags: tags,
      receiversId: receiversId,
      senderId: this.userSession.userSession.value.id,
      status: status,
      type: type
    };
    // onesignal
    this.oneSignalService
      .postOneSignalByTag(notification.title, message, tags, receiversId)
      .subscribe(c => {
        // guardar noti
        this.oneSignalService.newNotification(notification).subscribe();
      });
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
  formatDates(year, month, day): string {
    const date = new Date(year, month, day);
    return FormatDatesFront(date);
  }
  formatDates2(date: Date): string {
    return FormatDatesFront(date);
  }
  changeGrid(value) {
    this.isList = !this.isList;
  }
  getCurrentPhaseName() {
    const currentPhase = this.preBuild.timeLine.find(
      tl => tl.isComplete === false
    );
    if (currentPhase) {
      return currentPhase.namePhase;
    } else {
      return 'Completada';
    }
  }
  getCurrentPhaseData(): TimeLine {
    const currentPhase = this.preBuild.timeLine.find(
      tl => tl.isComplete === false
    );
    if (currentPhase) {
      return currentPhase;
    } else {
      return undefined;
    }
  }
  // subir foto
  fileChangeEvent(fileInput) {
    const imgToUpload = <File>fileInput.target.files[0];
    // img name
    this.imgName = imgToUpload.name.slice(0, imgToUpload.name.indexOf('.'));
    // preview
    const reader = new FileReader();
    reader.onload = r => {
      this.render(reader.result);
    };
    reader.readAsDataURL(imgToUpload);
  }
  // render
  render(src) {
    const MAX_HEIGHT = 400;
    const image = new Image();
    image.onload = r => {
      const canvas = document.createElement('canvas');
      if (image.height > MAX_HEIGHT) {
        image.width *= MAX_HEIGHT / image.height;
        image.height = MAX_HEIGHT;
      }
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0, image.width, image.height);
      canvas.toBlob(
        c => {
          if (c.size > 200000) {
            this.presentAlertImg(
              'La imagen excede el límite de tamaño',
              'Imagen no válida'
            );
          } else {
            this.imgToUpload.push({
              srcPrev: src,
              name: this.imgName,
              srcBlob: c
            });
          }
          // tipo, calidad
        },
        'image/jpeg',
        0.75
      );
    };
    image.src = src;
  }
  // alerts
  async presentAlertImg(message, header) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'Ok',
          role: 'ok',
          handler: () => {}
        }
      ]
    });

    await alert.present();
  }
  async presentLoadingWithOptions(message) {
    const loading = await this.loadingController.create({
      message: message,
      translucent: true
    });
    return await loading;
  }
  // /alerts

  link() {
    const input = document.getElementById('imagen1').click();
  }
  /**
   * Subir imagen Confirmado
   * @param imgToUp imagen subir
   * @param index index del prev
   * @param notes notas
   */
  async uploadImg(imgToUp: { srcPrev: string; srcBlob: Blob; name: string }) {
    // subir no cordova
    const load = await this.presentLoadingWithOptions('Subiendo Foto...');
    load.present();
    // construir archivo
    const file = new File([imgToUp.srcBlob], imgToUp.name + '.jpg', {
      type: imgToUp.srcBlob.type,
      lastModified: new Date().getTime()
    });
    // construir form
    const formData = new FormData();
    formData.append('imagen1', file);
    // subir al server
    // espera respuesta
    const arrStr = await this.buildService.uploadImg(formData).toPromise();
    if (arrStr.length > 0) {
      this.notification(
        'Nueva Foto',
        `Se ha subido una foto de la preventa ${this.preBuild.name}`,
        'amarillo',
        'build',
        undefined,
        this.preBuild.preBuyer.map(m => m._id)
      );
      this.putBuild(imgToUp);
      load.dismiss();
      this.presentToast('Imagen Subida');
    }
  }
  putBuild(imgToUp: { srcPrev: string; srcBlob: Blob; name: string }): any {
    if (this.preBuild.imgUrls && this.preBuild.imgUrls.length) {
      this.preBuild.imgUrls.push(END_POINT.IP + imgToUp.name + '.jpg');
    } else {
      const arr = [END_POINT.IP + imgToUp.name + '.jpg'];
      this.preBuild.imgUrls = arr;
    }
    this.preBuildService.putBuild(this.preBuild).subscribe(() => {
      const index = this.imgToUpload.findIndex(
        img => img.name === imgToUp.name
      );
      this.imgToUpload.splice(index, 1);
    });
  }

  discartImg(index: number) {
    this.imgToUpload.splice(index, 1);
  }
  deletedImg(imgURL: string) {
    const imgName = imgURL.slice(imgURL.lastIndexOf('/') + 1, imgURL.length);
    this.buildService.deletedImg(imgName).subscribe(() => {
      const index = this.preBuild.imgUrls.findIndex(img => img === imgURL);
      this.preBuild.imgUrls.splice(index, 1);

      this.preBuildService.putBuild(this.preBuild).subscribe(() => {
        this.presentToast('Imagen Borrada');
      });
    });
  }
  async presentAlertConfirm(url: string) {
    const alert = await this.alertController.create({
      header: 'Eliminar Imagen',
      message: `¿Desea eliminar imagen?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {
            console.log('Confirm Cancel: blah');
          }
        },
        {
          text: 'Sí',
          role: 'ok',
          handler: () => {
            /* this.deleted(buyer);
            this.getBuyerAll(); */
          }
        }
      ]
    });

    await alert.present();
    // IMPORTANTE ASYNC !!!!!
    await alert.onWillDismiss().then(res => {
      if (res.role === 'ok') {
        this.deletedImg(url);
      }
    });
  }
}
