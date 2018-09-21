import { Component, OnInit } from '@angular/core';
import { IBuild } from '../../../models/build.model';
import { BuildService } from '../../../services/build.service';
import { ActivatedRoute } from '@angular/router';
import { UserSessionService } from '../../../services/user-session.service';
import { ToastController, Platform, AlertController } from '@ionic/angular';
import { FormatDatesFront, FormatHoursFront } from '../../../_config/_helpers';
import { END_POINT } from '../../../_config/api.end-points';
import { IUserSession } from '../../../models/userSession.model';

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
  constructor(
    private route: ActivatedRoute,
    private buildService: BuildService,
    private userSessionService: UserSessionService,
    public toastController: ToastController,
    private platform: Platform,
    private alertController: AlertController,
  ) {
    this.user = userSessionService.userSession.value;
    this.route.queryParams.subscribe(params => {
      if (params.id) {
        this.getGoalById(params.id);
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
      this.build = build;
      console.log(build);
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
  changeGoal() {
    this.buildService.putBuild(this.build).subscribe(() => {
      this.getPercent(this.build.timeLine);
      if (this.percent === 100) {
        this.presentToast('Se ha completado una Obra');
      } else {
        this.presentToast('Se ha modificado una Fase');
      }
    });
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
      canvas.toBlob(c => {
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
      });
    };
    image.src = src;
  }
  /**
   * Subir imagen Confirmado
   * @param imgToUp imagen subir
   * @param index index del prev
   * @param notes notas
   */
  uploadImg(
    imgToUp: {
      numPhase: number;
      srcPrev: string;
      srcBlob: Blob;
      name: string;
    },
    index,
    notes: string,
  ) {
    // subir
    // construir archivo
    const file = new File([imgToUp.srcBlob], imgToUp.name + '.png', {
      type: imgToUp.srcBlob.type,
      lastModified: Date.now(),
    });
    // construir form
    const formData = new FormData();
    formData.append('imagen1', file);
    // subir al server
    this.buildService.uploadImg(formData).subscribe(arrStr => {
      // espera respuesta
      if (arrStr) {
        // elimina del  arr prev
        this.imgToUpload.splice(index, 1);
        this.build.timeLine[imgToUp.numPhase].imagesData.push({
          date: new Date(),
          notes: notes,
          url: END_POINT.IP + imgToUp.name + '.png',
        });
        // put al build
        this.buildService.putBuild(this.build).subscribe(() => {
          this.presentToast('Imagen Subida');
        });
      }
    });
  }
  discartImg(index: number) {
    this.imgToUpload.splice(index, 1);
  }
  deletedImg(imgURL: string, phase, index) {
    console.log(imgURL);
    const imgName = imgURL.slice(imgURL.lastIndexOf('/') + 1, imgURL.length);
    console.log(imgName);
    this.buildService.deletedImg(imgName).subscribe(() => {
      this.build.timeLine[phase].imagesData.splice(index, 1);
      this.buildService.putBuild(this.build).subscribe(() => {
        this.presentToast('Imagen Borrada');
      });
    });
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
}
