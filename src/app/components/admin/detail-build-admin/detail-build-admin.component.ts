import { Component, OnInit } from '@angular/core';
import { IBuild } from '../../../models/build.model';
import { BuildService } from '../../../services/build.service';
import { ActivatedRoute } from '@angular/router';
import { UserSessionService } from '../../../services/user-session.service';
import {
  ToastController,
  Platform,
  AlertController,
  LoadingController,
} from '@ionic/angular';
import { FormatDatesFront, FormatHoursFront } from '../../../_config/_helpers';
import { END_POINT } from '../../../_config/api.end-points';
import { IUserSession } from '../../../models/userSession.model';
import { INotification } from '../../../models/notification.model';
import { OnesignalService } from '../../../services/onesignal.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-detail-build-admin',
  templateUrl: './detail-build-admin.component.html',
  styleUrls: ['./detail-build-admin.component.scss'],
})
export class DetailBuildAdminComponent implements OnInit {
  percent = 1;
  isLoad = false;
  arrPropLikes: string[] = [];
  arrSBP: string[] = [];
  build: IBuild;
  isDesktop = true;
  isList = false;
  formData: FormData;
  imgName = '';
  imgToUpload: {
    numPhase: number;
    srcPrev: string;
    srcBlob: Blob;
    name: string;
    notes?: string;
  }[] = [];
  numItem;
  // notas por img
  notes: string[] = [];
  user: IUserSession;
  Test;
  Test2 = 'a';
  numOfCurrentFase: number;
  isCordova: boolean;
  constructor(
    private route: ActivatedRoute,
    private buildService: BuildService,
    private userSessionService: UserSessionService,
    public toastController: ToastController,
    private platform: Platform,
    private alertController: AlertController,
    private oneSignalService: OnesignalService,
    private camera: Camera,
    private storage: Storage,
    private loadingController: LoadingController,
  ) {
    this.isCordova = platform.is('cordova');
    this.user = userSessionService.userSession.value;
    this.route.queryParams.subscribe(params => {
      if (params.id) {
        this.getGoalById(params.id);
      }
    });
    // si regresa de  crash
    this.storage.keys().then(async keys => {
      const keyBuildImg = keys.some(key => key === 'build-img');
      if (keyBuildImg) {
        const imgb64 = await this.storage.get('build-img');
        this.Test2 = userSessionService.saveURI;
        /* this.platform.resume.subscribe((event: any) => {
          // this.Test2 = event.pendingResult.result;
          this.Test2 = event;
          this.Test = event.pendingResult.pluginServiceName;
        }); */
        this.getGoalById(imgb64.idBuild);
        /*  this.render(imgb64.base64Image); */
        storage.remove('build-img');
      }
    });
  }

  ngOnInit() {}
  checkAdminRol(userType: string): boolean {
    if (userType === 'maker') {
      return false;
    } else {
      return true;
    }
  }
  getGoalById(id: string) {
    this.isLoad = false;
    this.buildService.getBuildById(id).subscribe(build => {
      let i = 0;
      for (const tl of build.timeLine) {
        if (tl.isComplete && tl.isComplete === true) {
          if (i < build.timeLine.length - 1) {
            i++;
          }
        } else {
          break;
        }
      }
      this.numOfCurrentFase = i;
      this.build = build;
      console.log(build);
      console.log(i);
      console.log(build.timeLine[this.numOfCurrentFase]);
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
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
    });
    toast.present();
  }
  changeGoal(e) {
    if (this.build.timeLine[this.numOfCurrentFase].imagesData.length > 0) {
      this.build.timeLine[this.numOfCurrentFase].imagesData.forEach(img => {
        this.completePhase(img.url);
      });
      this.build.timeLine[this.numOfCurrentFase].imagesData = <any>[];
    }
    this.buildService.putBuild(this.build).subscribe(() => {
      let m;
      this.getPercent(this.build.timeLine);
      if (this.percent === 100) {
        this.presentToast('Se ha completado una Obra');
        m = 'Se ha completado una Obra';
      } else {
        this.presentToast('Se ha modificado una Fase');
        m = 'Se ha modificado una Fase';
      }
      this.notification(
        m,
        `Actualizacion de ${this.build.name}`,
        'amarillo',
        'build',
        undefined,
        this.build.maker.map(maker => maker._id),
      );
    });
    let i = 0;
    for (const tl of this.build.timeLine) {
      if (tl.isComplete && tl.isComplete === true) {
        if (i < this.build.timeLine.length - 1) {
          i++;
        }
      } else {
        break;
      }
    }
    this.numOfCurrentFase = i;
  }
  changeGrid(value) {
    this.isList = !this.isList;
  }
  formatDates(year, month, day): string {
    const date = new Date(year, month, day);
    return FormatDatesFront(date);
  }
  formatDates2(date: Date): string {
    return FormatDatesFront(date);
  }
  formatHours(hours, minutes) {
    return FormatHoursFront(hours, minutes);
  }
  link(i) {
    this.numItem = i;
    const input = document.getElementById('imagen1').click();
  }
  // subir foto
  fileChangeEvent(fileInput) {
    const imgToUpload = <File>fileInput.target.files[0];
    /*  if (imgToUpload.size > 200000) {
      this.presentAlertImg(
        'La imagen excede el límite de tamaño',
        'Imagen no válida',
      );
    } else {
      // img name
      this.imgName = imgToUpload.name.slice(0, imgToUpload.name.indexOf('.'));
      // preview
      const reader = new FileReader();
      reader.onload = r => {
        this.render(reader.result);
      };
      reader.readAsDataURL(imgToUpload);
    } */
    // img name
    this.imgName = imgToUpload.name.slice(0, imgToUpload.name.indexOf('.'));
    // preview
    const reader = new FileReader();
    reader.onload = r => {
      this.render(reader.result);
    };
    reader.readAsDataURL(imgToUpload);
  }
  private saveForRecovery(): Promise<{}> {
    return new Promise(resolve => {
      this.storage
        .set('build-img', { idBuild: this.build._id })
        .then((recover: any) => {
          resolve();
        });
    });
  }
  // ionic camera
  cameraIonic() {
    const options: CameraOptions = {
      quality: 100,
      targetWidth: 600,
      targetHeight: 400,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
    };
    this.saveForRecovery().then(() => {
      this.camera.getPicture(options).then(
        imageData => {
          const base64Image = 'data:image/jpeg;base64,' + imageData;
          //  por si crash
          /*  this.storage.set('build-img', {
            idBuild: this.build._id,
            base64Image: base64Image,
          }); */
          this.Test = base64Image;
          this.Test2 = 'algo1';
          this.render(base64Image);
          this.imgName = String(
            Math.random()
              .toString(36)
              .substring(2, 15) +
              Math.random()
                .toString(36)
                .substring(2, 15),
          );
        },
        err => {
          this.Test2 = err.toString();
        },
      );
    });
  }
  render(src) {
    const MAX_HEIGHT = 400;
    const image = new Image();
    image.onload = r => {
      const canvas = document.createElement('canvas');
      if (image.height > MAX_HEIGHT && this.isCordova === false) {
        image.width *= MAX_HEIGHT / image.height;
        image.height = MAX_HEIGHT;
      }
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0, image.width, image.height);
      this.Test2 = 'Render';
      canvas.toBlob(
        c => {
          console.log(c);
          if (c.size > 200000) {
            this.presentAlertImg(
              'La imagen excede el límite de tamaño',
              'Imagen no válida',
            );
          } else {
            this.imgToUpload.push({
              numPhase: this.numItem,
              srcPrev: src,
              name: this.imgName,
              srcBlob: c,
            });
          }
          // tipo, calidad
        },
        'image/jpeg',
        0.75,
      );
    };
    image.src = src;
  }
  /**
   * Subir imagen Confirmado
   * @param imgToUp imagen subir
   * @param index index del prev
   * @param notes notas
   */
  async uploadImg(
    imgToUp: {
      numPhase: number;
      srcPrev: string;
      srcBlob: Blob;
      name: string;
    },
    index,
    notes: string,
  ) {
    if (this.isCordova) {
      // Cordova
      const load = await this.presentLoadingWithOptions('Subiendo Foto...');
      load.present();
      this.buildService.getBuildById(this.build._id).subscribe(build => {
        build.timeLine[this.numOfCurrentFase].imagesData.push({
          date: new Date(),
          notes: notes,
          url: `http://31.220.52.51:3004/${this.imgName}.jpg`,
        });
        this.buildService.putBuild(build).subscribe(c => {
          this.Test2 = 'put';
          const file = new File([imgToUp.srcBlob], imgToUp.name + '.jpg', {
            type: imgToUp.srcBlob.type,
            lastModified: new Date().getTime(),
          });
          // construir form
          const formData = new FormData();
          formData.append('imagen1', file);
          // subir al server
          // espera respuesta
          this.buildService.uploadImg(formData).subscribe();
          this.build.timeLine[this.numOfCurrentFase].imagesData.push({
            date: new Date(),
            notes: notes,
            url: `http://31.220.52.51:3004/${this.imgName}.jpg`,
          });
          this.Test2 = this.imgName;

          // noti
          if (this.user.type === 'maker') {
            this.notification(
              'Nueva Foto',
              `El constructor ${
                this.user.name
              } ha subido una foto de la construcción ${this.build.name}`,
              'amarillo',
              'build',
              ['office'],
              this.build.maker.map(m => m._id),
            );
          } else {
            this.notification(
              'Nueva Foto',
              `Se ha subido una foto de la construcción ${this.build.name}`,
              'amarillo',
              'build',
              undefined,
              this.build.maker.map(m => m._id),
            );
          }
          // elimina del  arr prev
          this.imgToUpload.splice(index, 1);
          load.dismiss();
        });
      });
    } else {
      // subir no cordova
      const load = await this.presentLoadingWithOptions('Subiendo Foto...');
      load.present();
      // construir archivo
      const file = new File([imgToUp.srcBlob], imgToUp.name + '.jpg', {
        type: imgToUp.srcBlob.type,
        lastModified: new Date().getTime(),
      });
      // construir form
      const formData = new FormData();
      formData.append('imagen1', file);
      // subir al server
      // espera respuesta
      const arrStr = await this.buildService.uploadImg(formData).toPromise();
      if (arrStr.length > 0) {
        this.putBuild(imgToUp, notes, index);
        load.dismiss();
        this.presentToast('Imagen Subida');
      }
    }
  }
  private putBuild(
    imgToUp: { numPhase: number; srcPrev: string; srcBlob: Blob; name: string },
    notes: string,
    index: any,
  ) {
    this.build.timeLine[imgToUp.numPhase].imagesData.push({
      date: new Date(),
      notes: notes,
      url: END_POINT.IP + imgToUp.name + '.jpg',
    });
    console.log('Imagen to up', imgToUp);
    this.Test2 = END_POINT.IP + imgToUp.name + '.jpg';
    // put al build
    this.buildService.putBuild(this.build).subscribe(res => {
      if (res) {
        // elimina del  arr prev
        this.imgToUpload.splice(index, 1);
      }
      // noti
      if (this.user.type === 'maker') {
        this.notification(
          'Nueva Foto',
          `El constructor ${
            this.user.name
          } ha subido una foto de la construcción ${this.build.name}`,
          'amarillo',
          'build',
          ['office'],
          this.build.maker.map(m => m._id),
        );
      } else {
        this.notification(
          'Nueva Foto',
          `Se ha subido una foto de la construcción ${this.build.name}`,
          'amarillo',
          'build',
          undefined,
          this.build.maker.map(m => m._id),
        );
      }
    });
  }

  discartImg(index: number) {
    this.imgToUpload.splice(index, 1);
  }
  deletedImg(imgURL: string, phase, index) {
    const imgName = imgURL.slice(imgURL.lastIndexOf('/') + 1, imgURL.length);
    this.buildService.deletedImg(imgName).subscribe(() => {
      this.build.timeLine[phase].imagesData.splice(index, 1);
      this.buildService.putBuild(this.build).subscribe(() => {
        this.presentToast('Imagen Borrada');
      });
    });
  }
  completePhase(imgURL: string) {
    const imgName = imgURL.slice(imgURL.lastIndexOf('/') + 1, imgURL.length);
    this.buildService.deletedImg(imgName).subscribe(() => {});
  }
  async presentAlertConfirm(url: string, phase, index) {
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
        this.deletedImg(url, phase, index);
      }
    });
  }
  async presentAlertImg(message, header) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'Ok',
          role: 'ok',
          handler: () => {
            /* this.deleted(buyer);
            this.getBuyerAll(); */
          },
        },
      ],
    });

    await alert.present();
  }
  async presentLoadingWithOptions(message) {
    const loading = await this.loadingController.create({
      message: message,
      translucent: true,
    });
    return await loading;
  }
  private notification(
    title,
    message,
    status,
    type,
    tags,
    receiversId: string[],
  ) {
    // notificacion
    const notification: INotification = {
      title: title,
      message: message,
      tags: tags,
      receiversId: receiversId,
      senderId: this.userSessionService.userSession.value.id,
      status: status,
      type: type,
    };
    // onesignal
    this.oneSignalService
      .postOneSignalByTag(notification.title, message, tags, receiversId)
      .subscribe(() => {
        // guardar noti
        this.oneSignalService.newNotification(notification).subscribe();
      });
  }
}
